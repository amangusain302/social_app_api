const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const getDataUri = require("../utils/getDataUri");
const uploadFile = require("../utils/uploadFiles"); 
var ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');




exports.createPost = catchAsyncError(async(req, res, next) => {
    var files = req.files;
    var mycloud = []
    for (var i = 0; i < files.length; i++) {
        const file = files[i];
        var fileUri = await getDataUri(file);
        const cloudData = await uploadFile(fileUri, file);
        mycloud.push({ public_id: cloudData.public_id, url: cloudData.secure_url })
    }
    const public_url = mycloud;
    console.log(public_url);

    const post = await new Post({...(req.body), user: req.user._id, files: public_url }).save();

    const updatePostCount = await User.findOneAndUpdate({ _id : req.user._id}, {
        $inc : { postCount : 1}
    })

    res.status(201).json({
        success: true,
        message : "You posted Successfully",
        post
    })
})

exports.getAllPost = catchAsyncError(async(req, res, next) => {
    const allPost = await Post.find({}).populate("comments")
    res.status(200).json({
        success: true,
        data: allPost
    })
})

exports.getSinglePost = catchAsyncError(async(req, res, next) => {
    const post = await Post.findOne({ _id: req.query.id })
    res.status(200).json({
        success: true,
        post: post
    })
})

exports.postLike = catchAsyncError(async(req, res, next) => {
    const getPost = await Post.findOne({ _id: req.query.id });

    var like;

    if ((getPost.likes).includes(req.user._id)) {
        await Post.findOneAndUpdate({ _id: req.query.id }, {
            $pull: {
                likes: req.user._id
            },
            $inc: {
                likeCount: -1
            }
        });
        like = false;
    } else {
        await Post.findOneAndUpdate({ _id: req.query.id }, {
            $push: {
                likes: req.user._id
            },
            $inc: {
                likeCount: 1
            }
        })

        like = true;
    }

    res.status(202).json({
        success: true,
        message: like ? "You have liked this post" : "you have unliked this post"
    })

})

exports.changePostStatus = catchAsyncError(async(req, res, next) => {
    // console.log(req.query.postId)
    const post = await Post.findOne({ _id: req.query.postId });
    var status = (post.post_status === "public") ? "private" : "public";
    const updateStatus = await Post.findOneAndUpdate({ _id: req.query.postId, user: req.user._id }, {
        $set: { post_status: status }
    }, { new: true });
    console.log(updateStatus);
    if (!updateStatus) {
        return next(new ErrorHandler("Sorry!!, You cannot change other's post status", 400))
    }
    res.status(202).json({
        success: true,
        message: `Your post is ${status} now`
    })
})

exports.deleteOwnPost = catchAsyncError(async(req, res, next) => {
    const deletePost = await Post.findOneAndUpdate({ _id: req.query.postId, user: req.user._id }, {
        $set: { delete: true }
    }, { new: true });
    if (!deletePost) {
        return next(new ErrorHandler("Sorry!!, You cannot delete other's post", 400))
    }
    const updatePostCount = await User.findOneAndUpdate({ _id : req.user._id}, {
        $inc : { postCount : -1}
    })
    console.log(deletePost);
    res.status(202).json({
        success: true,
        message: `Your post is deleted now`
    })
})

exports.editPost = catchAsyncError(async(req, res, next) => {
    const _id = req.query.postId;
    const updatePost = await Post.findOneAndUpdate({_id, user : req.user._id}, {
        $set : req.body
    })
    if (!updatePost) {
        return next(new ErrorHandler("Sorry!!, You cannot update other's post", 400))
    }
    res.status(202).json({
        success: true,
        message: `Your post is Updated now`
    })
})

exports.getUserLikesPost = catchAsyncError(async(req, res, next) => {
    const _id = new ObjectId(req.query.postId);
    const user = new ObjectId(req.user._id);
    const postLikes = await Post.aggregate([
        {
            $match : {
              _id,
              user
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "likes",
                foreignField : "_id",
                as : "likes"
            }
        },
        {
            $project : {
                _id : 0,
                likes : 1
            }
        },
        {
            $project : {
                likes : {password : 0 }
            }
        }
    ])

    if (!postLikes) {
        return next(new ErrorHandler("Sorry!!, You cannot see other's post likes", 400))
    }
    res.status(200).json({
        success: true,
        users : postLikes
    })
})


