const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

exports.getDashboardStats = async (req, res) => {
  const Student = require('../models/Student');
  try {
    const totalStudents = await Student.countDocuments();
    res.json({ totalStudents, message: 'Dashboard stats' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createAdmin = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin with this email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ fullName, email, password: hashedPassword, role: role || 'admin' });
    res.status(201).json({ message: 'Admin created', admin: { id: admin._id, fullName: admin.fullName, email: admin.email, role: admin.role } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getLogs = async (req, res) => {
  res.json({ logs: [] });
};
