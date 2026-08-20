const Question = require('../models/Question');
const Subject = require('../models/Subject');
const mongoose = require('mongoose');

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
  try {
    const { subject, phaseId } = req.body;

    if (!req.body.subjectId && subject && typeof subject === 'string' && subject.trim()) {
      const name = subject.trim();
      let sub = await Subject.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (!sub) {
        sub = await Subject.create({
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          phases: phaseId ? [phaseId] : [],
          isActive: true,
        });
      } else if (phaseId && !sub.phases.some(p => p.toString() === phaseId.toString())) {
        sub.phases.push(phaseId);
        await sub.save();
      }
      req.body.subjectId = sub._id;
    }

    if (req.file) {
      req.body.questionImageUrl = req.file.path;
    }
    if (typeof req.body.options === 'string') {
      try {
        req.body.options = JSON.parse(req.body.options);
      } catch {
        return res.status(400).json({ message: 'Invalid options format' });
      }
    }

    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getById = async (req, res) => {
  try { const question = await Question.findById(req.params.id); if (!question) return res.status(404).json({ message: 'Not found' }); res.json(question); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.update = async (req, res) => {
  try {
    if (req.file) {
      req.body.questionImageUrl = req.file.path;
    }
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(question);
  } catch (error) { res.status(500).json({ message: error.message }); }
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
