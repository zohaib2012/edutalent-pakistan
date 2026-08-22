const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const { docUpload } = require('../middleware/upload');
const meritDocumentController = require('../controllers/meritDocumentController');

router.get('/', meritDocumentController.getPublic);
router.get('/admin/all', adminAuth, meritDocumentController.getAdminAll);
router.post('/', adminAuth, docUpload.single('file'), meritDocumentController.upload);
router.delete('/:id', adminAuth, meritDocumentController.remove);

module.exports = router;
