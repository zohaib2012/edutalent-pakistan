const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const testController = require('../controllers/testController');

router.get('/instructions', auth, testController.getInstructions);
router.post('/start', auth, testController.startTest);
router.get('/question/:questionIndex', auth, testController.getQuestion);
router.post('/answer', auth, testController.submitAnswer);
router.post('/flag-cheat', auth, testController.flagCheat);
router.post('/submit', auth, testController.submitTest);
router.get('/session', auth, testController.getSession);
router.get('/time-remaining', auth, testController.getTimeRemaining);

module.exports = router;
