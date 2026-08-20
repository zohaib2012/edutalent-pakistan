const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const awardWinnerController = require('../controllers/awardWinnerController');

router.get('/', awardWinnerController.getPublic);
router.get('/admin/all', adminAuth, awardWinnerController.getAdminAll);
router.post('/', adminAuth, awardWinnerController.create);
router.put('/:id', adminAuth, awardWinnerController.update);
router.delete('/:id', adminAuth, awardWinnerController.remove);

module.exports = router;
