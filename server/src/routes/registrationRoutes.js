const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.create);
router.get('/check-cnic/:cnic', registrationController.checkCNIC);
router.get('/:id', auth, registrationController.getById);
router.put('/:id', auth, registrationController.update);

module.exports = router;
