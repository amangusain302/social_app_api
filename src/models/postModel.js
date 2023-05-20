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
    }]
})

const Post = new mongoose.model("post", Schema);

module.exports = Post;