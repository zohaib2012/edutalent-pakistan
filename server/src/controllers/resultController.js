const TestResult = require('../models/TestResult');
const Student = require('../models/Student');

exports.getMyResult = async (req, res) => {
  try {
    const result = await TestResult.findOne({ studentId: req.studentId }).populate('sessionId');
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json(result);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMeritList = async (req, res) => {
  try {
    const results = await TestResult.find({ phaseId: req.params.phaseId }).sort({ obtainedMarks: -1, totalTimeTaken: 1 }).populate('studentId', 'fullName city province').limit(50);
    const meritList = results.map((r, i) => ({ rank: i + 1, studentName: r.studentId?.fullName, rollNumber: r.rollNumber, score: r.obtainedMarks, percentage: r.percentage, awardCategory: r.awardCategory }));
    res.json(meritList);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getOverallMerit = async (req, res) => {
  try { const results = await TestResult.find().sort({ obtainedMarks: -1 }).populate('studentId', 'fullName').limit(20); res.json(results); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getAnalytics = async (req, res) => {
  try {
    const results = await TestResult.find({ phaseId: req.params.phaseId });
    const avg = results.length ? results.reduce((s, r) => s + r.percentage, 0) / results.length : 0;
    const max = results.length ? Math.max(...results.map(r => r.percentage)) : 0;
    res.json({ averageScore: Math.round(avg), highestScore: max, totalResults: results.length });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.generateResults = async (req, res) => { res.json({ message: 'Results generated' }); };
exports.getAll = async (req, res) => {
  try { const results = await TestResult.find().populate('studentId', 'fullName').sort({ createdAt: -1 }); res.json(results); } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.update = async (req, res) => {
  try { const result = await TestResult.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(result); } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.getByStudentId = async (req, res) => {
  try { const result = await TestResult.findOne({ studentId: req.params.studentId }); res.json(result); } catch (error) { res.status(500).json({ message: error.message }); }
};
