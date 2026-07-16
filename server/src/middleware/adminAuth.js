const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No admin token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid admin token' });
    }
    req.admin = admin;
    req.adminId = admin._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Admin authentication failed' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
};

module.exports = { adminAuth, authorize };
