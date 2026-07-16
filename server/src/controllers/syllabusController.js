const Syllabus = require('../models/Syllabus');
const Phase = require('../models/Phase');
const Subject = require('../models/Subject');

exports.getAll = async (req, res) => {
  try { const syllabi = await Syllabus.find({ isActive: true }).populate({ path: 'phaseId', select: 'name slug' }); res.json(syllabi); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getByPhase = async (req, res) => {
  try {
    const syllabus = await Syllabus.findOne({ phaseId: req.params.phaseId, isActive: true }).populate({ path: 'subjects.subjectId', select: 'name topics' });
    if (!syllabus) return res.status(404).json({ message: 'Syllabus not found for this phase' });
    res.json(syllabus);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.download = async (req, res) => { res.json({ message: 'PDF download' }); };

exports.create = async (req, res) => {
  try { const syllabus = await Syllabus.create(req.body); res.status(201).json(syllabus); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.update = async (req, res) => {
  try { const syllabus = await Syllabus.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(syllabus); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.delete = async (req, res) => {
  try { await Syllabus.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (error) { res.status(500).json({ message: error.message }); }
};
