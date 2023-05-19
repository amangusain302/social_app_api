const express = require('express');
const { createUser, userRegistration } = require('../controllers/userController');
const validateRegistration = require('../middlewares/validateRegistration.js');
const router = express.Router();

router.post('/register', validateRegistration, userRegistration);

module.exports = router;