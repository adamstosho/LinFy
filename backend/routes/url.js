import express from 'express';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import Url from '../models/Url.js';
import validator from 'validator';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// JWT auth middleware (reuse from auth.js)
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET || 'dev_secret');
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// API key auth middleware
async function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(401).json({ error: 'Missing API key' });
  const user = await User.findOne({ 'apiKeys.key': apiKey });
  if (!user) return res.status(401).json({ error: 'Invalid API key' });
  req.userId = user._id;
  next();
}

// Combined auth middleware (JWT or API key)
function requireUser(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return requireAuth(req, res, next);
  } else if (req.headers['x-api-key']) {
    return requireApiKey(req, res, next);
  } else {
    return res.status(401).json({ error: 'Authentication required' });
  }
}

const router = express.Router();
router.post('/shorten', requireUser, async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl || !validator.isURL(originalUrl)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format. Please provide a valid URL.'
      });
    }

    // Check if URL already exists for this user
    const existingUrl = await Url.findOne({ originalUrl, user: req.userId });
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        data: existingUrl,
        message: 'URL already exists'
      });
    }

    // Generate unique code
    const urlCode = nanoid(8);
    const baseUrl = process.env.BASE_URL || 'https://linfy.onrender.com';
    const shortUrl = `${baseUrl}/api/${urlCode}`;

    // Generate QR code
    const qrCode = await QRCode.toDataURL(shortUrl, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Create new URL entry
    const newUrl = new Url({
      originalUrl,
      shortUrl,
      urlCode,
      qrCode,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      user: req.userId
    });

    await newUrl.save();

    res.status(200).json({
      success: true,
      data: newUrl,
      message: 'URL shortened successfully'
    });

  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


router.get('/history', requireUser, async (req, res) => {
  try {
    const urls = await Url.find({ user: req.userId }, 'originalUrl shortUrl createdAt clicks qrCode').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: urls
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


router.get('/metrics', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUrls = await Url.countDocuments();
    const totalClicksAgg = await Url.aggregate([
      { $group: { _id: null, total: { $sum: "$clicks" } } }
    ]);
    const totalClicks = totalClicksAgg[0]?.total || 0;
    res.json({
      totalUsers,
      totalUrls,
      totalClicks
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics', details: error.message });
  }
});

router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });
    
    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'URL not found'
      });
    }

    // Update click count and last accessed
    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);

  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

router.get('/stats/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });
    
    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'URL not found'
      });
    }

    res.status(200).json({
      success: true,
      data: url
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;