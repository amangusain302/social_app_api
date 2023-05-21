const express = require('express');
const authorization = require('../middlewares/authorization');
const { addFollower, unFollow } = require('../controllers/followController');
const router = express.Router();

router.post('/add', authorization, addFollower);
router.post('/remove', authorization, unFollow);
// router.post('/login', logIn);
// router.get('/', authorization, getAllUsers);

module.exports = router;