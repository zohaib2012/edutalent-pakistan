const mongoose = require('mongoose');

const meritEntrySchema = new mongoose.Schema(
  {
    phaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phase',
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    registrationNumber: {
      type: String,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherName: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    totalMarks: {
      type: Number,
      default: 100,
    },
    percentage: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MeritEntry', meritEntrySchema);
