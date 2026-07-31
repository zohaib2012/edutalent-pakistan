const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const settingController = require('../controllers/settingController');

router.get('/', adminAuth, settingController.getAll);
router.put('/', adminAuth, settingController.update);
router.put('/phases', adminAuth, settingController.updatePhaseFees);

module.exports = router;
