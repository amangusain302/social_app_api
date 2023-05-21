const { catchAsyncError } = require("../middlewares/catchAsyncError");
const UserModel = require("../models/userModel");
const bycrpt = require('bcrypt');
const genJWTtoken = require("../utils/genJWTtoken");
const ErrorHandler = require("../utils/errorHandler");
const { buildCheckFunction } = require("express-validator");


exports.userRegistration = catchAsyncError(async(req, res, next) => {
    var { name, email_id, password, user_name, gender, mobile } = req.body

    const lastUser = await UserModel.findOne({}, {}, { sort: { user_id: -1 } });
    const user_id = lastUser ? lastUser.user_id + 1 : 1;

    password = await bycrpt.hash(password, 10)
    console.log(password);

    var newUser = await new UserModel({ user_id, name, email_id, password, user_name, gender, mobile }).save().catch(err => {
        if (err.code === 11000) {
            next(new ErrorHandler("email or user_name already used", 400))
        }
    })

    const accessToken = await genJWTtoken(newUser);
    newUser._doc['jwtToken'] = accessToken;
    delete user._doc.password;

    res.status(201).json({
        success: true,
        message: "Account created successfully",
        newUser
    })
})

exports.logIn = catchAsyncError(async(req, res, next) => {
    var { email_id, password } = req.body;
    const user = await UserModel.findOne({ email_id: email_id })
    if (!user) {
        next(new ErrorHandler("Invalid Credentials"), 400);
    }
    const comparePass = await bycrpt.compare(password, user.password);
    if (!comparePass) {
        next(new ErrorHandler("Invalid Credentials"), 400);
    }
    const accessToken = await genJWTtoken(user);
    user._doc['jwtToken'] = accessToken;
    delete user._doc.password;

    res.status(200).json({
        success: true,
        message: "User login successfully",
        user
    })
})

exports.getAllUsers = catchAsyncError(async(req, res, next) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json({
        success: true,
        allUsers: users
    })
})

exports.getProfile = catchAsyncError(async(req, res, next) => {
    const userId = req.query.userId || req.user._id;
    const profile = await UserModel.findOne({ _id: userId }).select("-password");
    console.log(toString(profile._id))
    if (userId === req.user._id) {
        profile._doc.myProfile = true;
    } else {
        profile._doc.myProfile = false;
    }
    res.status(200).json({
        success: true,
        profile
    })
})

exports.changeUserStatus = catchAsyncError(async(req, res, next) => {
    const user = await UserModel.findOne({ _id: req.user._id });
    var status = (user.profile_status === "public") ? "private" : "public";
    const updateStatus = await UserModel.findOneAndUpdate({ _id: req.user._id }, {
        $set: { profile_status: status }
    })
    res.status(202).json({
        success: true,
        message: `Your profile is ${status} now`
    })
})