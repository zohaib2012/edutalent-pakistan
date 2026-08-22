const MeritDocument = require('../models/MeritDocument');
const Phase = require('../models/Phase');

exports.getPublic = async (req, res) => {
  try {
    const docs = await MeritDocument.find({ isActive: true })
      .populate({ path: 'phaseId', select: 'name' })
      .sort({ phaseId: 1, createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getAdminAll = async (req, res) => {
  try {
    const docs = await MeritDocument.find()
      .populate({ path: 'phaseId', select: 'name' })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.upload = async (req, res) => {
  try {
    const { phaseId, title } = req.body;
    if (!req.file) return res.status(400).json({ success: false, message: 'Please select a PDF or image file' });
    if (!phaseId) return res.status(400).json({ success: false, message: 'Phase is required' });
    const doc = await MeritDocument.create({
      phaseId,
      title: title || 'Merit List',
      fileUrl: req.file.path,
      fileType: req.file.mimetype || 'image',
    });
    const populated = await MeritDocument.findById(doc._id).populate({ path: 'phaseId', select: 'name' });
    res.status(201).json({ success: true, data: populated });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.remove = async (req, res) => {
  try {
    const doc = await MeritDocument.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.json({ success: true, message: 'Document deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
