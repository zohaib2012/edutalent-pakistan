const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const contactController = require('../controllers/contactController');

router.post('/', contactController.create);
router.get('/', adminAuth, contactController.getAll);
router.get('/my-replies', auth, contactController.getMyReplies);
router.put('/:id/reply', adminAuth, contactController.reply);
router.patch('/:id/read', adminAuth, contactController.markRead);

module.exports = router;
