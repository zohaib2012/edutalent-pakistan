const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const notificationController = require('../controllers/notificationController');

router.get('/my-notifications', auth, notificationController.getMyNotifications);
router.patch('/read/:id', auth, notificationController.markRead);
router.patch('/read-all', auth, notificationController.markAllRead);
router.post('/send', adminAuth, notificationController.send);
router.post('/broadcast', adminAuth, notificationController.broadcast);

module.exports = router;
