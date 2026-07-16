const Student = require('../models/Student');

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Challan image is required' });
    const student = await Student.findById(req.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.challan.isPaid = true;
    student.challan.paidChallanImageUrl = req.file.path;
    student.status = 'payment_pending';
    await student.save();
    res.json({ message: 'Challan uploaded successfully', status: student.status });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.verify = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.challan.paymentVerified = true;
    student.challan.paymentVerifiedAt = new Date();
    student.challan.paymentVerifiedBy = req.adminId;
    student.status = 'payment_verified';
    await student.save();
    res.json({ message: 'Payment verified', student: { id: student._id, name: student.fullName, status: student.status } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.reject = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.challan.paymentVerified = false;
    student.challan.rejectionReason = req.body.reason || 'Payment rejected by admin';
    student.status = 'payment_pending';
    await student.save();
    res.json({ message: 'Payment rejected', reason: student.challan.rejectionReason });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getPending = async (req, res) => {
  try {
    const students = await Student.find({ 'challan.isPaid': true, 'challan.paymentVerified': false }).populate('phaseId').sort({ 'challan.generatedAt': -1 });
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getStats = async (req, res) => {
  try {
    const total = await Student.countDocuments({ 'challan.challanNumber': { $ne: null } });
    const verified = await Student.countDocuments({ 'challan.paymentVerified': true });
    const pending = await Student.countDocuments({ 'challan.isPaid': true, 'challan.paymentVerified': false });
    res.json({ total, verified, pending });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
