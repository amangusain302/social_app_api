const express = require('express');
const authorization = require('../middlewares/authorization');
const { createPost, getAllPost, getSinglePost, postLike, changePostStatus } = require('../controllers/postController');
const singleUpload = require('../middlewares/multer');
const router = express.Router();

router.post('/create', authorization, singleUpload, createPost);
router.get('/all', authorization, getAllPost);
router.get('/single', authorization, getSinglePost);
router.get('/like', authorization, postLike);
router.get('/update/status', authorization, changePostStatus);
// router.get('/', authorization, getAllUsers);

module.exports = router;