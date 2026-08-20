const AwardWinner = require('../models/AwardWinner');
const Phase = require('../models/Phase');

exports.getPublic = async (req, res) => {
  try {
    const winners = await AwardWinner.find({ isActive: true })
      .populate({ path: 'phaseId', select: 'name' })
      .sort({ position: 1 });
    res.json({ success: true, data: winners });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getAdminAll = async (req, res) => {
  try {
    const winners = await AwardWinner.find()
      .populate({ path: 'phaseId', select: 'name' })
      .sort({ phaseId: 1, position: 1 });
    res.json({ success: true, data: winners });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const { fullName, fatherName, city, province, school, grade, position, phaseId, phaseName, awardType, awardTitle, photoUrl } = req.body;
    if (!fullName) return res.status(400).json({ success: false, message: 'Winner name is required' });
    const winner = await AwardWinner.create({
      fullName: fullName.trim(),
      fatherName: fatherName || '',
      city: city || '',
      province: province || '',
      school: school || '',
      grade: grade || '',
      position: Number(position) || 0,
      phaseId: phaseId || null,
      phaseName: phaseName || '',
      awardType: awardType || 'certificate',
      awardTitle: awardTitle || '',
      photoUrl: photoUrl || '',
    });
    const populated = await AwardWinner.findById(winner._id).populate({ path: 'phaseId', select: 'name' });
    res.status(201).json({ success: true, data: populated });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates._id;
    const winner = await AwardWinner.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate({ path: 'phaseId', select: 'name' });
    if (!winner) return res.status(404).json({ success: false, message: 'Winner not found' });
    res.json({ success: true, data: winner });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.remove = async (req, res) => {
  try {
    const winner = await AwardWinner.findByIdAndDelete(req.params.id);
    if (!winner) return res.status(404).json({ success: false, message: 'Winner not found' });
    res.json({ success: true, message: 'Winner deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
