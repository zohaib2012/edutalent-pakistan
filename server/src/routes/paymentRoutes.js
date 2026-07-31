const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const { challanUpload } = require('../middleware/upload');
const paymentController = require('../controllers/paymentController');

router.post('/upload', auth, challanUpload.single('challanImage'), paymentController.upload);
router.get('/pending', adminAuth, paymentController.getPending);
router.get('/all', adminAuth, paymentController.getAllPayments);
router.patch('/verify/:studentId', adminAuth, paymentController.verify);
router.patch('/reject/:studentId', adminAuth, paymentController.reject);
router.get('/stats', adminAuth, paymentController.getStats);

module.exports = router;
