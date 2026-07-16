const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const awardController = require('../controllers/awardController');

router.get('/', awardController.getAll);
router.get('/phase/:phaseId', awardController.getByPhase);
router.get('/winners', awardController.getWinners);
router.post('/assign', adminAuth, awardController.assign);
router.patch('/:id/deliver', adminAuth, awardController.markDelivered);
router.get('/my-award', auth, awardController.getMyAward);

module.exports = router;
