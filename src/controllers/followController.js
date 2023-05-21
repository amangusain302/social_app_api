const { catchAsyncError } = require("../middlewares/catchAsyncError");
const followModel = require("../models/followModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.addFollower = catchAsyncError(async(req, res, next) => {
    const { follower, following } = req.body;
    const follow = await followModel.findOne({ follower, following });
    if (follow) {
        return next(new ErrorHandler("You already following this User", 400))
    }
    const addFollow = await new followModel(req.body).save();
    const updateFollowingCount = await User.findOneAndUpdate({ _id: follower }, {
        $inc: { following: 1 }
    })
    const updateFollowerCount = await User.findOneAndUpdate({ _id: following }, {
        $inc: { follower: 1 }
    })
    res.status(201).json({
        success: true,
        message: 'You followed this user'
    })
})

exports.unFollow = catchAsyncError(async(req, res, next) => {
    const { follower, following } = req.body;
    const addFollow = await followModel.findOneAndDelete({ follower, following });
    const updateFollowingCount = await User.findOneAndUpdate({ _id: follower }, {
        $inc: { following: -1 }
    })
    const updateFollowerCount = await User.findOneAndUpdate({ _id: following }, {
        $inc: { follower: -1 }
    })
    res.status(201).json({
        success: true,
        message: 'You Unfollow this user'
    })
})