var Image = require('../../models/image').Image;

var imageHandler = require("../../filehendler");
exports.delete = function (request, reply) {
    var user = request.auth.credentials,
        userName = user.username,
        imgId = request.params.id;

    Image.findById(imgId, function(err, image) {
        if(!err && image) {
            console.log(image);
            imageHandler.removeImage(image.img_id, function (err) {
                if (err) return reply({message: err});
                image.remove();
                return reply({message: "Image deleted successfully"});
            });
        } else if(!err) {
            // Couldn't find the object.
            reply({message: "Image not found"});
        } else {
            console.log(err);
            reply({message: err});
        }
    });

//    if (request.auth.isAuthenticated) {
//        reply.redirect('/home');
//    } else {
//        return reply.redirect('/login');
//    }
};
