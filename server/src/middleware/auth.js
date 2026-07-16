const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);
    if (!student || !student.isActive) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.student = student;
    req.studentId = student._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth;
