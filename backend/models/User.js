import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
  key: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUsed: { type: Date }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  apiKeys: {
    type: [apiKeySchema],
    validate: [arr => arr.length <= 5, 'Maximum 5 API keys allowed per user'],
    default: []
  }
});

export default mongoose.model('User', userSchema); 