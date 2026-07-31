const Phase = require('../models/Phase');
const Subject = require('../models/Subject');
const Student = require('../models/Student');

exports.getAll = async (req, res) => {
  try {
    const phases = await Phase.find().populate('syllabus', 'name').sort({ 'gradeRange.min': 1 });
    res.json({ success: true, data: phases });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const phase = await Phase.findById(req.params.id);
    if (!phase) return res.status(404).json({ success: false, message: 'Phase not found' });
    res.json({ success: true, data: phase });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const { name, slug, gradeRange, description, fee, awardStructure } = req.body;
    if (!name || !slug || !gradeRange) {
      return res.status(400).json({ success: false, message: 'name, slug and gradeRange are required' });
    }
    const phase = await Phase.create({
      name, slug, gradeRange: { min: Number(gradeRange.min), max: Number(gradeRange.max) },
      description: description || '', fee: Number(fee) || 0, awardStructure,
    });
    res.status(201).json({ success: true, data: phase });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'Phase slug already exists' });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, slug, gradeRange, description, fee, awardStructure, isActive } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (slug) updates.slug = slug;
    if (gradeRange) updates.gradeRange = { min: Number(gradeRange.min), max: Number(gradeRange.max) };
    if (description !== undefined) updates.description = description;
    if (fee !== undefined) updates.fee = Number(fee);
    if (awardStructure) updates.awardStructure = awardStructure;
    if (isActive !== undefined) updates.isActive = isActive;
    const phase = await Phase.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!phase) return res.status(404).json({ success: false, message: 'Phase not found' });
    res.json({ success: true, data: phase });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'Phase slug already exists' });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const students = await Student.countDocuments({ phaseId: req.params.id });
    if (students > 0) {
      return res.status(400).json({ success: false, message: `Cannot delete phase: ${students} student(s) are registered in this phase` });
    }
    await Phase.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Phase deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getSubjects = async (req, res) => {
  try {
    const phase = await Phase.findById(req.params.id).populate('syllabus');
    if (!phase) return res.status(404).json({ success: false, message: 'Phase not found' });
    res.json({ success: true, data: phase.syllabus || [] });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.json({ success: true, data: subjects });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
