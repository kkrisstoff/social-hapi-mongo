var fs = require('fs');
var path = require('path');
var im = require('imagemagick');
var mongoose = require('../../lib/mongoose');
var utils = require('../../lib/utils');
var Image = require('../../models/image');

var imageHandler = require("../../filehendler");

exports.post = function (request, reply) {
    var currentUser = request.auth.credentials.username,
        data = request.payload,
        caption = data.imgName,
        imagePath = data.fileUpload.path;

    /*var imagesRootPath = path.resolve(__dirname + "../../../resources/images"),
        hashedImageName = utils.hashedImageName(imageName),
        newPath = imagesRootPath + "/" + hashedImageName,
        thumbPath = imagesRootPath + "/thumbs/" + hashedImageName;*/


    imageHandler.uploadImage(imagePath, function (err, data) {
        if (err){
            console.log('Read File Error: ' + err);
            throw err;
        }
        console.log(data);
        var imageData = {
                img_id: data.public_id,
                user: currentUser,
                img_name: caption || "untitled image",
                path: data.url,
                secure_path: data.secure_url,
                thumbPath: data.url
            },
            image = new mongoose.models.Image(imageData);
        image.save(function (err) {
            if (!err) {
                reply.redirect('/images/' + image._id);
            } else {
                reply(err)
            }
        });
    });
    //save file in system via fs
    /*fs.readFile(imagePath, function (err, data) {
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
    });*/
};
