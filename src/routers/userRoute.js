const express = require('express');
const { createUser, userRegistration, logIn, getAllUsers } = require('../controllers/userController');
const validateRegistration = require('../middlewares/validateRegistration.js');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.post('/register', validateRegistration, userRegistration);
router.post('/login', logIn);
router.get('/', authorization, getAllUsers);

module.exports = router;