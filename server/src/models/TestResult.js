const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestSession',
      required: true,
    },
    phaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phase',
      required: true,
    },
    rollNumber: {
      type: String,
    },
    totalMarks: {
      type: Number,
    },
    obtainedMarks: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    subjectWiseBreakdown: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subject',
        },
        subjectName: {
          type: String,
        },
        totalQuestions: {
          type: Number,
        },
        correct: {
          type: Number,
        },
        wrong: {
          type: Number,
        },
        unattempted: {
          type: Number,
        },
      },
    ],
    phaseRank: {
      type: Number,
    },
    overallRank: {
      type: Number,
    },
    isMeritQualified: {
      type: Boolean,
      default: false,
    },
    awardCategory: {
      type: String,
      enum: ['laptop', 'chromebook', 'shield', 'certificate', 'participation'],
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TestResult', testResultSchema);
