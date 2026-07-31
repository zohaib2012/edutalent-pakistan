const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const phaseController = require('../controllers/phaseController');

router.get('/subjects', adminAuth, phaseController.getAllSubjects);
router.get('/', adminAuth, phaseController.getAll);
router.get('/:id', adminAuth, phaseController.getById);
router.get('/:id/subjects', adminAuth, phaseController.getSubjects);
router.post('/', adminAuth, phaseController.create);
router.put('/:id', adminAuth, phaseController.update);
router.delete('/:id', adminAuth, phaseController.remove);

module.exports = router;
