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
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subject',
        },
        topics: {
          type: [String],
        },
        totalMCQs: {
          type: Number,
        },
        weightage: {
          type: Number,
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
