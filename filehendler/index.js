var cloudinary = require('../lib/cloudinary');

function uploadImage(imagePath, callback) {
    cloudinary.uploader.upload(imagePath, function(result) {
        if (result.error) return callback(result.error);
        callback(null, result);
    });
}
function removeImage(imageId, callback) {
    cloudinary.uploader.destroy(imageId, function(result) {
        if (result.error) return callback(result.error);
        callback(null, result);
    });
}

module.exports.uploadImage = uploadImage;
module.exports.removeImage = removeImage;