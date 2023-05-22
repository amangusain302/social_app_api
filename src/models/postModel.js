const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    text: String,
    files: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    hashtag: Array,
    user_tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    likeCount: {
        type: Number,
        default: 0,
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    post_status: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    delete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Post = new mongoose.model("post", Schema);

module.exports = Post;