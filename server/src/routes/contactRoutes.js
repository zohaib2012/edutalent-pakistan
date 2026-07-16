const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const contactController = require('../controllers/contactController');

router.post('/', contactController.create);
router.get('/', adminAuth, contactController.getAll);
router.put('/:id/reply', adminAuth, contactController.reply);
router.patch('/:id/read', adminAuth, contactController.markRead);

module.exports = router;
