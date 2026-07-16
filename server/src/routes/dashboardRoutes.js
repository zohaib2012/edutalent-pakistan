const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const dashboardController = require('../controllers/dashboardController');

router.get('/stats', adminAuth, dashboardController.getStats);
router.get('/registration-stats', adminAuth, dashboardController.getRegistrationStats);
router.get('/payment-stats', adminAuth, dashboardController.getPaymentStats);
router.get('/test-stats', adminAuth, dashboardController.getTestStats);
router.get('/phase-stats', adminAuth, dashboardController.getPhaseStats);
router.get('/recent-activity', adminAuth, dashboardController.getRecentActivity);

module.exports = router;
