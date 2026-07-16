const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null,
    },
    recipientType: {
      type: String,
      enum: ['student', 'all', 'phase_specific'],
    },
    phaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phase',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['challan', 'slip', 'result', 'award', 'announcement', 'reminder'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    sentVia: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
