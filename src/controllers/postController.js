const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Post = require("../models/postModel");
const ErrorHandler = require("../utils/errorHandler");
const getDataUri = require("../utils/getDataUri");
const uploadFile = require("../utils/uploadFiles");




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

    res.status(201).json({
        success: true,
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
    const post = await Post.findOne({ _id: req.query.PostId });
    var status = (post.post_status === "public") ? "private" : "public";
    const updateStatus = await Post.findOneAndUpdate({ _id: req.query.PostId, user: req.user._id }, {
        $set: { post_status: status }
    }, { new: true });
    console.log(updateStatus);
    if (updateStatus) {
        return next(new ErrorHandler("Sorry!!, You cannot change other's post status", 400))
    }
    res.status(202).json({
        success: true,
        message: `Your post is ${status} now`
    })
})