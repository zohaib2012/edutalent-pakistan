const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const questionController = require('../controllers/questionController');

router.get('/', adminAuth, questionController.getAll);
router.post('/', adminAuth, questionController.create);
router.get('/count', adminAuth, questionController.getCount);
router.get('/phase/:phaseId', adminAuth, questionController.getByPhase);
router.get('/subject/:subjectId', adminAuth, questionController.getBySubject);
router.post('/bulk-import', adminAuth, questionController.bulkImport);
router.get('/:id', adminAuth, questionController.getById);
router.put('/:id', adminAuth, questionController.update);
router.delete('/:id', adminAuth, questionController.delete);

module.exports = router;
