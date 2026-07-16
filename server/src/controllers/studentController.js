const Student = require('../models/Student');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, phase, province, status, search } = req.query;
    const filter = {};
    if (phase) filter.phaseId = phase;
    if (province) filter.province = province;
    if (status) filter.status = status;
    if (search) filter.$or = [{ fullName: { $regex: search, $options: 'i' } }, { registrationNumber: { $regex: search, $options: 'i' } }, { cnicOrBform: { $regex: search, $options: 'i' } }];

    const students = await Student.find(filter).populate('phaseId').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    const total = await Student.countDocuments(filter);

    res.json({ students, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.studentId, req.body, { new: true, runValidators: true });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const students = await Student.find({
      $or: [{ fullName: { $regex: q, $options: 'i' } }, { registrationNumber: { $regex: q, $options: 'i' } }, { cnicOrBform: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }]
    }).limit(10).select('fullName registrationNumber phaseId status');
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getByPhase = async (req, res) => {
  try {
    const students = await Student.find({ phaseId: req.params.phaseId }).populate('phaseId');
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getByStatus = async (req, res) => {
  try {
    const students = await Student.find({ status: req.params.status }).populate('phaseId');
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
