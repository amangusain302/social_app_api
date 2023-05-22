const express = require('express');
const authorization = require('../middlewares/authorization');
const { createPost, getAllPost, getSinglePost, postLike, changePostStatus, deleteOwnPost, editPost, getUserLikesPost } = require('../controllers/postController');
const singleUpload = require('../middlewares/multer');
const router = express.Router();

router.post('/create', authorization, singleUpload, createPost);
router.get('/all', authorization, getAllPost);
router.get('/single', authorization, getSinglePost);
router.post('/like', authorization, postLike);
router.patch('/update/status', authorization, changePostStatus);
router.delete('/delete', authorization, deleteOwnPost);
router.put('/update', authorization, editPost);
router.get('/get/likes', authorization, getUserLikesPost);
// router.get('/', authorization, getAllUsers);

module.exports = router;