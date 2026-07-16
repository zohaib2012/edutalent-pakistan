const ContactMessage = require('../models/ContactMessage');

exports.create = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.reply = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { replyMessage: req.body.replyMessage, repliedAt: new Date(), repliedBy: req.adminId }, { new: true });
    res.json(message);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.markRead = async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Marked as read' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
