const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const faqController = require('../controllers/faqController');

router.get('/', faqController.getAll);
router.get('/category/:category', faqController.getByCategory);
router.post('/', adminAuth, faqController.create);
router.put('/:id', adminAuth, faqController.update);
router.delete('/:id', adminAuth, faqController.delete);

module.exports = router;
