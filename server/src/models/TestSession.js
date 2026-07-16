const mongoose = require('mongoose');

const testSessionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
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
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'terminated', 'disqualified'],
      default: 'pending',
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
        },
        selectedOption: {
          type: String,
        },
        isCorrect: {
          type: Boolean,
        },
        timeTaken: {
          type: Number,
        },
        answeredAt: {
          type: Date,
        },
      },
    ],
    antiCheatLogs: [
      {
        type: {
          type: String,
        },
        timestamp: {
          type: Date,
        },
        details: {
          type: String,
        },
      },
    ],
    disqualificationReason: {
      type: String,
    },
    totalQuestions: {
      type: Number,
      default: 100,
    },
    attemptedQuestions: {
      type: Number,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    wrongAnswers: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    totalTimeTaken: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TestSession', testSessionSchema);
