const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Post = require("../models/postModel");
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

    const post = await new Post({...(req.body), files: public_url }).save();


    res.status(201).json({
        success: true,
        post
    })
})