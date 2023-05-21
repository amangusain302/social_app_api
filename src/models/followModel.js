const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    follower: {
        type: String,
        required: true
    },
    following: {
        type: String,
        required: true
    }
})

const followModel = new mongoose.model("follow", schema);

module.exports = followModel;