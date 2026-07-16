const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  phaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  questionText: { type: String, required: true },
  questionImageUrl: { type: String },
  options: [{
    label: { type: String, required: true },
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  marks: { type: Number, default: 1 },
  timeLimit: { type: Number, default: 25 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

questionSchema.index({ phaseId: 1, subjectId: 1 });
questionSchema.index({ phaseId: 1, difficulty: 1 });

module.exports = mongoose.model('Question', questionSchema);
