const Student = require('../models/Student');

const generatePassword = () => Math.random().toString(36).slice(-6) + '!A';

exports.generate = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    if (!student.challan.paymentVerified) return res.status(400).json({ message: 'Payment not verified yet' });

    const rollNumber = `ETP-${new Date().getFullYear()}-P${student.phaseId?.toString()?.slice(-1) || 'X'}-${String(student.registrationNumber?.slice(-4) || '0000')}`;
    const slipPassword = generatePassword();
    const testDate = new Date();
    testDate.setDate(testDate.getDate() + 7);

    student.rollNoSlip = {
      rollNumber, testDate, testTime: '10:00 AM - 12:00 PM',
      slipPdfUrl: '', username: student.registrationNumber, passwordGiven: slipPassword, issuedAt: new Date()
    };
    student.status = 'slip_issued';
    await student.save();

    res.json({
      message: 'Slip generated', rollNumber, testDate: student.rollNoSlip.testDate,
      testTime: student.rollNoSlip.testTime, username: student.rollNoSlip.username, passwordGiven: slipPassword
    });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.generateBulk = async (req, res) => {
  try {
    const { phaseId } = req.body;
    const filter = { 'challan.paymentVerified': true, 'rollNoSlip.rollNumber': { $exists: false } };
    if (phaseId) filter.phaseId = phaseId;
    const students = await Student.find(filter);
    let count = 0;
    for (const student of students) {
      const rollNumber = `ETP-${new Date().getFullYear()}-P${phaseId?.toString()?.slice(-1) || 'X'}-${String(count + 1).padStart(4, '0')}`;
      student.rollNoSlip = { rollNumber, testDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), testTime: '10:00 AM - 12:00 PM', username: student.registrationNumber, passwordGiven: generatePassword(), issuedAt: new Date() };
      student.status = 'slip_issued';
      await student.save();
      count++;
    }
    res.json({ message: `${count} slips generated` });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMySlip = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student || !student.rollNoSlip.rollNumber) return res.status(404).json({ message: 'Slip not found' });
    res.json(student.rollNoSlip);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.search = async (req, res) => {
  try {
    const { registrationNumber, cnic } = req.query;
    if (!registrationNumber && !cnic) {
      return res.status(400).json({ message: 'Provide registration number or CNIC/B-Form' });
    }
    const filter = {};
    if (registrationNumber) filter.registrationNumber = registrationNumber.trim();
    if (cnic) filter.cnicOrBform = cnic.trim();
    const student = await Student.findOne(filter).populate('phaseId');
    if (!student || !student.rollNoSlip?.rollNumber) {
      return res.status(404).json({ message: 'No roll number slip found. Please verify your registration number and CNIC/B-Form.' });
    }
    res.json({
      fullName: student.fullName,
      fatherName: student.fatherName,
      registrationNumber: student.registrationNumber,
      cnicOrBform: student.cnicOrBform,
      phase: student.phaseId ? student.phaseId.name : null,
      grade: student.grade,
      rollNumber: student.rollNoSlip.rollNumber,
      username: student.rollNoSlip.username,
      passwordGiven: student.rollNoSlip.passwordGiven,
    });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.download = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId).populate('phaseId');
    if (!student || !student.rollNoSlip.rollNumber) return res.status(404).json({ message: 'Slip not found' });
    res.json({ student: student.toObject(), slip: student.rollNoSlip });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const students = await Student.find({ status: { $in: ['payment_verified', 'slip_issued', 'test_issued'] } })
      .select('fullName registrationNumber rollNoSlip phaseId status test')
      .populate('phaseId')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
