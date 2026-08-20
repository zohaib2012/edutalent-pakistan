const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema(
  {
    phaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phase',
      required: true,
    },
    subjects: [
      {
        name: {
          type: String,
          trim: true,
        },
        topics: {
          type: String,
          trim: true,
        },
        totalMCQs: {
          type: Number,
          default: 0,
        },
        weightage: {
          type: Number,
          default: 0,
        },
      },
    ],
    description: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    pdfUrl: {
      type: String,
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

module.exports = mongoose.model('Syllabus', syllabusSchema);
