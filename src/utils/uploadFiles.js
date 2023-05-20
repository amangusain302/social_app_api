const cloudinary = require('cloudinary');

const uploadFile = async(fileUri, file) => {
    console.log(file)
    return new Promise(async(resolve, reject) => {
        cloudinary.v2.uploader.upload(fileUri.content, {
                resource_type: file.mimetype.split("/")[0],
            }).then(cloud => {
                console.log(cloud)
                resolve(cloud);
            })
            .catch(err => {
                reject(err.message)
            })
    })
};

module.exports = uploadFile;