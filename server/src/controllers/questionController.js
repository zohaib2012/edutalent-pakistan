const Question = require('../models/Question');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 50, phase, subject, difficulty } = req.query;
    const filter = {};
    if (phase) filter.phaseId = phase;
    if (subject) filter.subjectId = subject;
    if (difficulty) filter.difficulty = difficulty;
    const questions = await Question.find(filter).populate('subjectId phaseId').skip((page - 1) * limit).limit(parseInt(limit)).sort({ createdAt: -1 });
    const total = await Question.countDocuments(filter);
    res.json({ questions, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.create = async (req, res) => {
  try { const question = await Question.create(req.body); res.status(201).json(question); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getById = async (req, res) => {
  try { const question = await Question.findById(req.params.id); if (!question) return res.status(404).json({ message: 'Not found' }); res.json(question); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.update = async (req, res) => {
  try { const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(question); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.delete = async (req, res) => {
  try { await Question.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.bulkImport = async (req, res) => {
  try { res.json({ message: 'Bulk import would go here' }); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getByPhase = async (req, res) => {
  try { const questions = await Question.find({ phaseId: req.params.phaseId }); res.json(questions); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getBySubject = async (req, res) => {
  try { const questions = await Question.find({ subjectId: req.params.subjectId }); res.json(questions); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getCount = async (req, res) => {
  try {
    const counts = await Question.aggregate([{ $group: { _id: { phase: '$phaseId', subject: '$subjectId' }, count: { $sum: 1 } } }]);
    res.json(counts);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
