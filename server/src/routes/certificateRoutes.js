const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const certificateController = require('../controllers/certificateController');

router.get('/my-certificate', auth, certificateController.getMyCertificate);
router.get('/download', auth, certificateController.download);
router.get('/verify/:certificateNumber', certificateController.verify);
router.post('/generate/:studentId', adminAuth, certificateController.generate);
router.post('/generate-bulk/:phaseId', adminAuth, certificateController.generateBulk);
router.get('/types', certificateController.getTypes);

module.exports = router;
