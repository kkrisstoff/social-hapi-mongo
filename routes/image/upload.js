var fs = require('fs');

exports.post = function (request, reply) {
    var data = request.payload,
        caption = data.name,
        imageName = data.fileUpload.filename,
        imagePath = data.fileUpload.path;
    console.log(fileName, filePath);

    fs.readFile(imagePath, function (err, data) {
        if(!imageName){
            console.error("There was an error. Image name is absent");
            return reply.redirect("/");
        } else {

            var newPath = __dirname + "../../public/images/fullsize/" + imageName;
            var thumbPath = __dirname + "../../public/images/thumbs/" + imageName;

            // write file to uploads/fullsize folder
//            fs.writeFile(newPath, data, function (err) {
//                if (err){
//                    console.log('Error: ' + err);
//                    throw err;
//                }
//
//                /// write file to uploads/thumbs folder
//               /* im.resize({
//                    srcPath: newPath,
//                    dstPath: thumbPath,
//                    width:   200
//                }, function(err, stdout, stderr){
//                    if (err) throw err;
//                    console.log('resized image to fit within 200x200px');
//                });*/
//
//                reply.redirect("/uploads/fullsize/" + imageName);
//
//            });
        }
    });

    reply.redirect('/');
};
