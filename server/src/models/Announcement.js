const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    targetPhase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phase',
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
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

module.exports = mongoose.model('Announcement', announcementSchema);
