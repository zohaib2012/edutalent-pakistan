const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const syllabusController = require('../controllers/syllabusController');

router.get('/', syllabusController.getAll);
router.get('/admin/all', adminAuth, syllabusController.getAdminAll);
router.get('/phase/:phaseId', syllabusController.getByPhase);
router.get('/download/:phaseId', syllabusController.download);
router.post('/', adminAuth, syllabusController.create);
router.put('/:id', adminAuth, syllabusController.update);
router.delete('/:id', adminAuth, syllabusController.delete);

module.exports = router;
