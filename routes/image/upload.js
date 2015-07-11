var fs = require('fs');
var path = require('path');
var im = require('imagemagick');
var mongoose = require('../../lib/mongoose');
var utils = require('../../lib/utils');
var Image = require('../../models/image');

exports.post = function (request, reply) {
    var currentUser = request.auth.credentials.username,
        data = request.payload,
        caption = data.name,
        imageName = data.fileUpload.filename,
        imagePath = data.fileUpload.path;

    var imagesRootPath = path.resolve(__dirname + "../../../resources/images"),
        hashedImageName = utils.hashedImageName(imageName),
        newPath = imagesRootPath + "/" + hashedImageName,
        thumbPath = imagesRootPath + "/thumbs/" + hashedImageName;

    console.log(hashedImageName);


    fs.readFile(imagePath, function (err, data) {
        if (err){
            console.log('Read File Error: ' + err);
            throw err;
        }

        // write file to uploads/fullsize folder
        fs.writeFile(newPath, data, function (err) {
            if (err){
                console.log('Write File Error: ' + err);
                throw err;
            }
            // write file to uploads/thumbs folder
            console.log(newPath);
            im.resize({
                srcPath: newPath,
                dstPath: thumbPath,
                width:   200
            }, function(err, stdout, stderr){
                if (err) throw err;
                console.log('resized image to fit within 200x200px');
            });
            //reply.redirect('/');
        });
    });

    var imageData = {
            user: currentUser,
            path: "/resources/images/" + hashedImageName,
            thumbPath: "/resources/images/thumbs/" + hashedImageName
        },
        image = new mongoose.models.Image(imageData);
    image.save(function (err) {
        if (!err) {
            //reply(image).created('/images/' + image._id);    // HTTP 201
            reply.redirect('/images/' + image._id);    // HTTP 201
        } else {
            reply(err)
        }
    });
};
