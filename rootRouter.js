const express = require("express");
const router = express.Router();
const userRoute = require('./src/routers/userRoute');
const postRoute = require('./src/routers/postRoute');
const followRoute = require('./src/routers/followRoute');
const commentRoute = require('./src/routers/commentRoute');

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/follow', followRoute);
router.use('/comment', commentRoute);
module.exports = router