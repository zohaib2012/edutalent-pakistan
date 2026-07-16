const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  gradeRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  description: { type: String, required: true },
  awardStructure: {
    laptop: { position: { type: Number, default: 1 }, quantity: { type: Number, default: 1 } },
    chromebook: { positions: { type: [Number], default: [2, 3, 4, 5] }, quantity: { type: Number, default: 4 } },
    shields: { positions: { type: [Number], default: [6, 7, 8, 9, 10] }, quantity: { type: Number, default: 5 } },
    certificates: { topPositions: { type: Number, default: 20 }, quantity: { type: Number, default: 20 } },
  },
  fee: { type: Number, required: true, default: 0 },
  syllabus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Phase', phaseSchema);
