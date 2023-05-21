const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "post field are required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user field are required"]
    },
    comment: {
        type: String,
        required: [true, "comment can't be empty"]
    },
    reply: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "user field are required"]
        },
        replyed: {
            type: String,
            required: [true, "replyed can't be empty"]
        }
    }]
}, { timestamps: true });

const commentModel = new mongoose.model('comments', schema);

module.exports = commentModel;