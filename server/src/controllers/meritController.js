const MeritEntry = require('../models/MeritEntry');
const Phase = require('../models/Phase');

exports.getPublic = async (req, res) => {
  try {
    const entries = await MeritEntry.find({ isActive: true })
      .populate({ path: 'phaseId', select: 'name slug' })
      .sort({ position: 1 });
    res.json({ success: true, data: entries });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getAdminAll = async (req, res) => {
  try {
    const entries = await MeritEntry.find()
      .populate({ path: 'phaseId', select: 'name slug' })
      .sort({ phaseId: 1, position: 1 });
    res.json({ success: true, data: entries });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const { phaseId, position, registrationNumber, studentName, fatherName, city, score, totalMarks, percentage } = req.body;
    if (!phaseId || !studentName) {
      return res.status(400).json({ success: false, message: 'Phase and student name are required' });
    }
    const entry = await MeritEntry.create({
      phaseId,
      position: Number(position) || 1,
      registrationNumber: registrationNumber || '',
      studentName: studentName.trim(),
      fatherName: fatherName || '',
      city: city || '',
      score: Number(score) || 0,
      totalMarks: Number(totalMarks) || 100,
      percentage: percentage !== undefined && percentage !== '' ? Number(percentage) : undefined,
    });
    const populated = await MeritEntry.findById(entry._id).populate({ path: 'phaseId', select: 'name slug' });
    res.status(201).json({ success: true, data: populated });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const { phaseId, position, registrationNumber, studentName, fatherName, city, score, totalMarks, percentage, isActive } = req.body;
    const updates = {};
    if (phaseId) updates.phaseId = phaseId;
    if (position !== undefined) updates.position = Number(position);
    if (registrationNumber !== undefined) updates.registrationNumber = registrationNumber;
    if (studentName !== undefined) updates.studentName = studentName;
    if (fatherName !== undefined) updates.fatherName = fatherName;
    if (city !== undefined) updates.city = city;
    if (score !== undefined) updates.score = Number(score);
    if (totalMarks !== undefined) updates.totalMarks = Number(totalMarks);
    if (percentage !== undefined && percentage !== '') updates.percentage = Number(percentage);
    if (isActive !== undefined) updates.isActive = isActive;

    const entry = await MeritEntry.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate({ path: 'phaseId', select: 'name slug' });
    if (!entry) return res.status(404).json({ success: false, message: 'Merit entry not found' });
    res.json({ success: true, data: entry });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.remove = async (req, res) => {
  try {
    const entry = await MeritEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ success: false, message: 'Merit entry not found' });
    res.json({ success: true, message: 'Merit entry deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
