const { catchAsyncError } = require('../middlewares/catchAsyncError');
const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');
const mongoose = require("mongoose");
const ErrorHandler = require('../utils/errorHandler');

exports.newComment = catchAsyncError(async(req, res, next) => {
    const { post, user, comment } = req.body
    const newComment = await new commentModel(req.body).save();
    console.log(newComment._id);
    await postModel.findByIdAndUpdate({ _id: post }, {
        $push: { comments: newComment._id }
    })
    res.status(201).json({
        success: true,
        message: "New comment added",
        comment: newComment.comment
    })
})

exports.newReply = catchAsyncError(async(req, res, next) => {
    const { commentId, replyText } = req.body;
    const reply = {
        user: req.user._id,
        replyed: replyText
    }
    const comment = await commentModel.findOneAndUpdate({ _id: commentId }, {
        $push: { reply }
    });
    res.status(202).json({
        success: true,
        message: "You replyed on this Comment"
    })

})

exports.getPostComments = catchAsyncError(async(req, res, next) => {
    const postId = req.query.postId;
    const allComments = await commentModel.find({ post: postId })
    console.log(allComments)
    if (allComments.length <= 0) {
        return next(new ErrorHandler("There is no comment in this post", 404))
    }
    res.status(200).json({
        success: true,
        data: allComments
    })
})

exports.getReply = catchAsyncError(async(req, res, next) => {
    const commentId = req.query.commentId;
    const allReply = await commentModel.findOne({ _id: commentId }).select("reply")
    if (allReply.length <= 0) {
        return next(new ErrorHandler("There is no reply in this comment", 404))
    }
    res.status(200).json({
        success: true,
        data: allReply.reply
    })
})