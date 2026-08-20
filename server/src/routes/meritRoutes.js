const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const meritController = require('../controllers/meritController');

router.get('/', meritController.getPublic);
router.get('/admin/all', adminAuth, meritController.getAdminAll);
router.post('/', adminAuth, meritController.create);
router.put('/:id', adminAuth, meritController.update);
router.delete('/:id', adminAuth, meritController.remove);

module.exports = router;
