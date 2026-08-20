const Syllabus = require('../models/Syllabus');
const Phase = require('../models/Phase');

exports.getAll = async (req, res) => {
  try {
    const syllabi = await Syllabus.find({ isActive: true })
      .populate({ path: 'phaseId', select: 'name slug gradeRange description' })
      .sort({ academicYear: -1 });
    res.json({ success: true, data: syllabi });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getAdminAll = async (req, res) => {
  try {
    const syllabi = await Syllabus.find()
      .populate({ path: 'phaseId', select: 'name slug gradeRange description' })
      .sort({ academicYear: -1 });
    res.json({ success: true, data: syllabi });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getByPhase = async (req, res) => {
  try {
    const syllabus = await Syllabus.findOne({ phaseId: req.params.phaseId, isActive: true })
      .populate({ path: 'phaseId', select: 'name slug gradeRange description' });
    if (!syllabus) return res.status(404).json({ success: false, message: 'Syllabus not found for this phase' });
    res.json({ success: true, data: syllabus });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.download = async (req, res) => { res.json({ message: 'PDF download' }); };

exports.create = async (req, res) => {
  try {
    const { phaseId, subjects, description, academicYear, isActive } = req.body;
    if (!phaseId) return res.status(400).json({ success: false, message: 'Phase is required' });

    const phase = await Phase.findById(phaseId);
    if (!phase) return res.status(400).json({ success: false, message: 'Invalid phase' });

    const existing = await Syllabus.findOne({ phaseId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Syllabus already exists for this phase. Please edit it instead.' });
    }

    const normalizedSubjects = Array.isArray(subjects)
      ? subjects
          .filter((s) => s && (s.name || s.topics))
          .map((s) => ({
            name: (s.name || '').trim(),
            topics: (s.topics || '').trim(),
            totalMCQs: Number(s.totalMCQs) || 0,
            weightage: Number(s.weightage) || 0,
          }))
      : [];

    const syllabus = await Syllabus.create({
      phaseId,
      subjects: normalizedSubjects,
      description: description || '',
      academicYear: academicYear || new Date().getFullYear().toString(),
      isActive: isActive !== undefined ? isActive : true,
    });
    res.status(201).json({ success: true, data: syllabus });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const { phaseId, subjects, description, academicYear, isActive } = req.body;
    const updates = {};
    if (phaseId) {
      const phase = await Phase.findById(phaseId);
      if (!phase) return res.status(400).json({ success: false, message: 'Invalid phase' });
      updates.phaseId = phaseId;
    }
    if (subjects !== undefined) {
      updates.subjects = Array.isArray(subjects)
        ? subjects
            .filter((s) => s && (s.name || s.topics))
            .map((s) => ({
              name: (s.name || '').trim(),
              topics: (s.topics || '').trim(),
              totalMCQs: Number(s.totalMCQs) || 0,
              weightage: Number(s.weightage) || 0,
            }))
        : [];
    }
    if (description !== undefined) updates.description = description;
    if (academicYear !== undefined) updates.academicYear = academicYear;
    if (isActive !== undefined) updates.isActive = isActive;

    const syllabus = await Syllabus.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate({ path: 'phaseId', select: 'name slug gradeRange description' });
    if (!syllabus) return res.status(404).json({ success: false, message: 'Syllabus not found' });
    res.json({ success: true, data: syllabus });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.delete = async (req, res) => {
  try {
    const syllabus = await Syllabus.findByIdAndDelete(req.params.id);
    if (!syllabus) return res.status(404).json({ success: false, message: 'Syllabus not found' });
    res.json({ success: true, message: 'Syllabus deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
