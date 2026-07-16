const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const challanController = require('../controllers/challanController');

router.post('/generate', auth, challanController.generate);
router.get('/:challanNumber', auth, challanController.getByNumber);
router.get('/download/:challanNumber', auth, challanController.download);

module.exports = router;
