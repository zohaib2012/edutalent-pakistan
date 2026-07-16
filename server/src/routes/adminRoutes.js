const express = require('express');
const router = express.Router();
const { adminAuth, authorize } = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');

router.get('/dashboard-stats', adminAuth, adminController.getDashboardStats);
router.post('/create', adminAuth, authorize('super_admin'), adminController.createAdmin);
router.get('/logs', adminAuth, adminController.getLogs);

module.exports = router;
