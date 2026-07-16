const Notification = require('../models/Notification');

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ $or: [{ recipientId: req.studentId }, { recipientType: 'all' }] }).sort({ createdAt: -1 }).limit(20);
    res.json(notifications);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.markRead = async (req, res) => {
  try { await Notification.findByIdAndUpdate(req.params.id, { isRead: true, readAt: new Date() }); res.json({ message: 'Marked read' }); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.markAllRead = async (req, res) => {
  try { await Notification.updateMany({ $or: [{ recipientId: req.studentId }, { recipientType: 'all' }], isRead: false }, { isRead: true, readAt: new Date() }); res.json({ message: 'All marked read' }); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.send = async (req, res) => {
  try { const notification = await Notification.create(req.body); res.status(201).json(notification); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.broadcast = async (req, res) => {
  try { const notification = await Notification.create({ ...req.body, recipientType: 'all' }); res.status(201).json(notification); } catch (error) { res.status(500).json({ message: error.message }); }
};
