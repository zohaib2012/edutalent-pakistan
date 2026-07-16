const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const resultController = require('../controllers/resultController');

router.get('/my-result', auth, resultController.getMyResult);
router.get('/merit-list/:phaseId', resultController.getMeritList);
router.get('/overall-merit', resultController.getOverallMerit);
router.get('/analytics/:phaseId', adminAuth, resultController.getAnalytics);
router.post('/generate/:phaseId', adminAuth, resultController.generateResults);
router.get('/', adminAuth, resultController.getAll);
router.put('/:id', adminAuth, resultController.update);
router.get('/:studentId', adminAuth, resultController.getByStudentId);

module.exports = router;
