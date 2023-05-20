const express = require("express");
const router = express.Router();
const userRoute = require('./src/routers/userRoute');
const postRoute = require('./src/routers/postRoute');

router.use('/user', userRoute);
router.use('/post', postRoute);
module.exports = router