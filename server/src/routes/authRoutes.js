const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

router.post('/student/login', authController.studentLogin);
router.post('/student/forgot-password', authController.studentForgotPassword);
router.post('/student/reset-password', authController.studentResetPassword);
router.post('/admin/login', authController.adminLogin);
router.get('/me', auth, authController.getMe);

module.exports = router;
