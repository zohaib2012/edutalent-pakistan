const Student = require('../models/Student');

exports.getAll = async (req, res) => {
  try { const winners = await Student.find({ 'award.type': { $ne: null } }).select('fullName phaseId award registrationNumber photoUrl').populate('phaseId'); res.json(winners); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getByPhase = async (req, res) => {
  try { const winners = await Student.find({ phaseId: req.params.phaseId, 'award.type': { $ne: null } }).select('fullName phaseId award'); res.json(winners); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getWinners = async (req, res) => {
  try { const winners = await Student.find({ 'award.type': { $ne: null } }).select('fullName city province award certificate').sort({ 'award.issuedAt': -1 }).limit(20); res.json(winners); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.assign = async (req, res) => { res.json({ message: 'Awards assigned' }); };
exports.markDelivered = async (req, res) => { res.json({ message: 'Award marked delivered' }); };
exports.getMyAward = async (req, res) => {
  try { const student = await Student.findById(req.studentId); res.json(student.award); } catch (error) { res.status(500).json({ message: error.message }); }
};
