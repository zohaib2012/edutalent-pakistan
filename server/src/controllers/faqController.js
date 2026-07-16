const FAQ = require('../models/FAQ');

exports.getAll = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    res.json(faqs);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getByCategory = async (req, res) => {
  try {
    const faqs = await FAQ.find({ category: req.params.category, isActive: true }).sort({ order: 1 });
    res.json(faqs);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.create = async (req, res) => {
  try { const faq = await FAQ.create(req.body); res.status(201).json(faq); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.update = async (req, res) => {
  try { const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(faq); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.delete = async (req, res) => {
  try { await FAQ.findByIdAndDelete(req.params.id); res.json({ message: 'FAQ deleted' }); } catch (error) { res.status(500).json({ message: error.message }); }
};
