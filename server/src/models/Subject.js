const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  icon: { type: String },
  phases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
  topics: [{ type: String }],
  totalMCQs: { type: Number, default: 0 },
  timePerMCQ: { type: Number, default: 25 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
