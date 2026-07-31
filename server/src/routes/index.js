const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/students', require('./studentRoutes'));
router.use('/registration', require('./registrationRoutes'));
router.use('/challan', require('./challanRoutes'));
router.use('/payments', require('./paymentRoutes'));
router.use('/slips', require('./rollNoSlipRoutes'));
router.use('/test', require('./testRoutes'));
router.use('/questions', require('./questionRoutes'));
router.use('/results', require('./resultRoutes'));
router.use('/awards', require('./awardRoutes'));
router.use('/certificates', require('./certificateRoutes'));
router.use('/admindashboard', require('./dashboardRoutes'));
router.use('/admin', require('./adminRoutes'));
router.use('/announcements', require('./announcementRoutes'));
router.use('/syllabus', require('./syllabusRoutes'));
router.use('/faqs', require('./faqRoutes'));
router.use('/contact', require('./contactRoutes'));
router.use('/notifications', require('./notificationRoutes'));
router.use('/settings', require('./settingRoutes'));
router.use('/phases', require('./phaseRoutes'));

module.exports = router;
