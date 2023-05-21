const express = require('express');
const { createUser, userRegistration, logIn, getAllUsers, getProfile, changeUserStatus } = require('../controllers/userController');
const validateRegistration = require('../middlewares/validateRegistration.js');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.post('/register', validateRegistration, userRegistration);
router.post('/login', logIn);
router.get('/', authorization, getAllUsers);
router.get('/profile', authorization, getProfile);
router.get('/update/status', authorization, changeUserStatus);

module.exports = router;