const express = require('express');
const authorization = require('../middlewares/authorization');
const { newComment, newReply, getPostComments, getReply } = require('../controllers/commentController');
const router = express.Router();

router.post('/new', authorization, newComment);
router.post('/reply/new', authorization, newReply);
router.get('/all', authorization, getPostComments);
router.get('/reply/all', authorization, getReply);
// router.post('/login', logIn);
// router.get('/', authorization, getAllUsers);

module.exports = router;