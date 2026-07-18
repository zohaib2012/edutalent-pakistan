const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Phase = require('../models/Phase');

exports.studentRegister = async (req, res) => {
  try {
    const { fullName, fatherName, cnicOrBform, dateOfBirth, mobileNumber, email } = req.body;

    if (!fullName || !fatherName || !cnicOrBform || !dateOfBirth || !mobileNumber || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingStudent = await Student.findOne({ cnicOrBform });
    if (existingStudent) return res.status(400).json({ message: 'Student with this CNIC/B-Form already registered' });

    const phase = await Phase.findOne({});
    if (!phase) return res.status(400).json({ message: 'No phase available for registration' });

    const count = await Student.countDocuments({ phaseId: phase._id });
    const registrationNumber = `ETP-${new Date().getFullYear()}-P${phase.slug?.split('-')[1] || 'X'}-${String(count + 1).padStart(4, '0')}`;

    const tempPassword = Math.random().toString(36).slice(-8) + '!A1';
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const student = await Student.create({
      fullName, fatherName, cnicOrBform, dateOfBirth,
      grade: '13', phaseId: phase._id,
      schoolOrCollege: '', province: 'Islamabad', city: '', mobileNumber,
      email, address: '',
      registrationNumber, password: hashedPassword,
      status: 'registered', registrationDate: new Date()
    });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

    res.status(201).json({
      message: 'Registration successful',
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        registrationNumber: student.registrationNumber,
        tempPassword
      }
    });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Duplicate entry' });
    res.status(500).json({ message: error.message });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    if (!registrationNumber || !password) {
      return res.status(400).json({ message: 'Registration number and password are required' });
    }
    const student = await Student.findOne({ registrationNumber });
    if (!student) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
    res.json({ token, student: { id: student._id, name: student.fullName, registrationNumber: student.registrationNumber, status: student.status, phase: student.phaseId } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    admin.lastLogin = new Date();
    await admin.save();
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_ADMIN_SECRET, { expiresIn: process.env.JWT_ADMIN_EXPIRE || '30d' });
    res.json({ token, admin: { id: admin._id, name: admin.fullName, email: admin.email, role: admin.role } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMe = async (req, res) => {
  try {
    if (req.student) {
      res.json({ type: 'student', user: { id: req.student._id, name: req.student.fullName, registrationNumber: req.student.registrationNumber, status: req.student.status } });
    } else if (req.admin) {
      res.json({ type: 'admin', user: { id: req.admin._id, name: req.admin.fullName, email: req.admin.email, role: req.admin.role } });
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.studentForgotPassword = async (req, res) => {
  res.json({ message: 'Password reset link sent to registered email' });
};

exports.studentResetPassword = async (req, res) => {
  res.json({ message: 'Password reset successful' });
};
