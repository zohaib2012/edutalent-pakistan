const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const rollNoSlipController = require('../controllers/rollNoSlipController');

router.get('/my-slip', auth, rollNoSlipController.getMySlip);
router.get('/download', auth, rollNoSlipController.download);
router.post('/generate/:studentId', adminAuth, rollNoSlipController.generate);
router.post('/generate-bulk', adminAuth, rollNoSlipController.generateBulk);
router.get('/all', adminAuth, rollNoSlipController.getAll);

module.exports = router;
