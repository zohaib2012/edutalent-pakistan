const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const studentController = require('../controllers/studentController');

router.get('/', adminAuth, studentController.getAll);
router.get('/profile', auth, studentController.getProfile);
router.put('/profile', auth, studentController.updateProfile);
router.get('/search', adminAuth, studentController.search);
router.get('/phase/:phaseId', adminAuth, studentController.getByPhase);
router.get('/status/:status', adminAuth, studentController.getByStatus);
router.patch('/:id/status', adminAuth, studentController.updateStatus);
router.delete('/:id', adminAuth, studentController.deleteStudent);
router.get('/:id', adminAuth, studentController.getById);

module.exports = router;
