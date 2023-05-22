const express = require('express');
const { createUser, userRegistration, logIn, getAllUsers, getProfile, changeUserStatus, editProfile, blockUser, unblockUser } = require('../controllers/userController');
const {validateRegistration, profileUpdateValidation} = require('../middlewares/validateRegistration.js');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.post('/register', validateRegistration, userRegistration);
router.post('/login', logIn);
router.get('/', authorization, getAllUsers);
router.get('/profile', authorization, getProfile);
router.patch('/update/status', authorization, changeUserStatus);
router.put('/update/profile', authorization, profileUpdateValidation, editProfile);
router.patch('/block', authorization, blockUser);
router.patch('/unblock', authorization, unblockUser);

module.exports = router;