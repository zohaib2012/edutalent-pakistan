const Announcement = require('../models/Announcement');

exports.getAll = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true }).sort({ createdAt: -1 }).populate('createdBy', 'fullName');
    res.json(announcements);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getFeatured = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true, isFeatured: true }).sort({ createdAt: -1 }).limit(3);
    res.json(announcements);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getBySlug = async (req, res) => {
  try {
    const announcement = await Announcement.findOne({ slug: req.params.slug, isActive: true });
    if (!announcement) return res.status(404).json({ message: 'Not found' });
    res.json(announcement);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const announcement = await Announcement.create({ ...req.body, slug, createdBy: req.adminId });
    res.status(201).json(announcement);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.update = async (req, res) => {
  try { const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(announcement); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.delete = async (req, res) => {
  try { await Announcement.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (error) { res.status(500).json({ message: error.message }); }
};
