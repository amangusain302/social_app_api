const express = require('express');
const authorization = require('../middlewares/authorization');
const { createPost } = require('../controllers/postController');
const singleUpload = require('../middlewares/multer');
const router = express.Router();

router.post('/create', authorization, singleUpload, createPost);
// router.post('/login', logIn);
// router.get('/', authorization, getAllUsers);

module.exports = router;