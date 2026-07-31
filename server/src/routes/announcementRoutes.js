const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const announcementController = require('../controllers/announcementController');

router.get('/', announcementController.getAll);
router.get('/featured', announcementController.getFeatured);
router.get('/admin/all', adminAuth, announcementController.getAllAdmin);
router.get('/:slug', announcementController.getBySlug);
router.post('/', adminAuth, announcementController.create);
router.put('/:id', adminAuth, announcementController.update);
router.delete('/:id', adminAuth, announcementController.delete);

module.exports = router;
