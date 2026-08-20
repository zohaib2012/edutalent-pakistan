const mongoose = require('mongoose');

const awardWinnerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    fatherName: { type: String, trim: true },
    city: { type: String, trim: true },
    province: { type: String, trim: true },
    school: { type: String, trim: true },
    grade: { type: String, trim: true },
    position: { type: Number, default: 0 },
    phaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase' },
    phaseName: { type: String, trim: true },
    awardType: { type: String, enum: ['laptop', 'chromebook', 'shield', 'certificate', 'participation'], default: 'certificate' },
    awardTitle: { type: String, trim: true },
    photoUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AwardWinner', awardWinnerSchema);
