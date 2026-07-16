const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Phase = require('../models/Phase');

exports.create = async (req, res) => {
  try {
    const { fullName, fatherName, cnicOrBform, dateOfBirth, grade, schoolOrCollege, province, city, mobileNumber, email, address, photoUrl } = req.body;

    const existingStudent = await Student.findOne({ cnicOrBform });
    if (existingStudent) return res.status(400).json({ message: 'Student with this CNIC/B-Form already registered' });

    let gradeNum = parseInt(grade);
    if (isNaN(gradeNum)) gradeNum = 13;

    let phaseGrade = { min: 1, max: 5 };
    if (gradeNum >= 6 && gradeNum <= 8) phaseGrade = { min: 6, max: 8 };
    else if (gradeNum >= 9 && gradeNum <= 10) phaseGrade = { min: 9, max: 10 };
    else if (gradeNum >= 11) phaseGrade = { min: 11, max: 16 };

    const phase = await Phase.findOne({ 'gradeRange.min': phaseGrade.min, 'gradeRange.max': phaseGrade.max });
    if (!phase) return res.status(400).json({ message: 'Invalid grade - no matching phase found' });

    const count = await Student.countDocuments({ phaseId: phase._id });
    const registrationNumber = `ETP-${new Date().getFullYear()}-P${phase.slug?.split('-')[1] || 'X'}-${String(count + 1).padStart(4, '0')}`;

    const tempPassword = Math.random().toString(36).slice(-8) + '!A1';
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const challanNumber = `ETP-CH-${Date.now().toString().slice(-8)}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    const student = await Student.create({
      fullName, fatherName, cnicOrBform, dateOfBirth, grade: String(grade),
      phaseId: phase._id, schoolOrCollege, province, city, mobileNumber, email, address,
      photoUrl: photoUrl || '', registrationNumber, password: hashedPassword,
      status: 'challan_issued', registrationDate: new Date(),
      challan: {
        challanNumber, generatedAt: new Date(), dueDate, amount: phase.fee || 500,
        isPaid: false, paymentVerified: false
      }
    });

    res.status(201).json({
      message: 'Registration successful',
      student: {
        registrationNumber: student.registrationNumber,
        challanNumber: student.challan.challanNumber,
        amount: student.challan.amount,
        dueDate: student.challan.dueDate,
        tempPassword,
        phase: phase.name
      }
    });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Duplicate entry' });
    res.status(500).json({ message: error.message });
  }
};

exports.checkCNIC = async (req, res) => {
  try {
    const student = await Student.findOne({ cnicOrBform: req.params.cnic });
    res.json({ exists: !!student });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
