import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import crypto from 'crypto';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = '7d';

// Helper: generate API key
function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password required' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// Get current user profile
router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email
  });
});

// Update user profile (name/email)
router.put('/me', requireAuth, async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) return res.status(400).json({ error: 'Name or email required' });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (name) user.name = name;
  if (email) user.email = email;
  await user.save();
  res.json({ message: 'Profile updated', user: { _id: user._id, name: user.name, email: user.email } });
});

// Change password
router.put('/me/password', requireAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Old and new password required' });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(401).json({ error: 'Old password is incorrect' });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password updated' });
});

// JWT auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// List API keys
router.get('/api-keys', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ apiKeys: user.apiKeys.map(k => ({ keyId: k._id, createdAt: k.createdAt, lastUsed: k.lastUsed })) });
});

// Generate API key (max 5)
router.post('/api-keys', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.apiKeys.length >= 5) return res.status(400).json({ error: 'Maximum 5 API keys allowed' });
  const key = generateApiKey();
  user.apiKeys.push({ key });
  await user.save();
  res.status(201).json({ apiKey: key });
});

// Revoke API key
router.delete('/api-keys/:keyId', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const before = user.apiKeys.length;
  user.apiKeys = user.apiKeys.filter(k => k._id.toString() !== req.params.keyId);
  if (user.apiKeys.length === before) return res.status(404).json({ error: 'API key not found' });
  await user.save();
  res.json({ message: 'API key revoked' });
});

export default router; 