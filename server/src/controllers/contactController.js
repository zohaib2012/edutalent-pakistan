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

exports.getMyReplies = async (req, res) => {
  try {
    const email = req.student?.email;
    const phone = req.student?.mobileNumber;
    if (!email && !phone) return res.json([]);
    const messages = await ContactMessage.find({
      replyMessage: { $exists: true, $ne: '' },
      $or: [{ email: email || 'NO_EMAIL_MATCH' }, { phone: phone || 'NO_PHONE_MATCH' }],
    })
      .sort({ repliedAt: -1 })
      .select('subject message replyMessage repliedAt createdAt');
    res.json(messages);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.reply = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { replyMessage: req.body.replyMessage, repliedAt: new Date(), repliedBy: req.adminId }, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.markRead = async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Marked as read' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
