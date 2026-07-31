const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  category: { type: String, enum: ['general', 'test', 'email', 'phases', 'other'], default: 'general' },
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
