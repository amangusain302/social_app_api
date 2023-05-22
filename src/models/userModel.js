const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    user_id: {
        type: Number,
        required: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        require: true,
        unique: true
    },
    mobile: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    password: String,
    profile_status: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    follower: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    postCount : {
        type: Number,
        default: 0
    },
    blockUsers : {
        type : Array
    }
}, { timestamps: true });

const User = new mongoose.model('users', schema);

module.exports = User;