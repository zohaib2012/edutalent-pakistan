const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.create);
router.post('/create-account', registrationController.createAccount);
router.post('/submit-application', auth, registrationController.submitApplication);
router.get('/application-form', auth, registrationController.getApplicationForm);
router.get('/check-cnic/:cnic', registrationController.checkCNIC);
router.get('/:id', auth, registrationController.getById);
router.put('/:id', auth, registrationController.update);

module.exports = router;
