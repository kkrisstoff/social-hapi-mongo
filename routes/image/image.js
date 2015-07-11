var Image = require('../../models/image').Image;

exports.get = function (request, reply) {
    var user = request.auth.credentials,
        userName = user.username,
        imgId = request.params.id;

    console.log(imgId);
    if (request.auth.isAuthenticated) {
        Image.findOne({_id: imgId}, {}).exec(function(err, item) {
            "use strict";
            if (err) throw err;//callback(err, null);

            return reply.view('image',
                {
                    title: 'Images',
                    user: userName,
                    image: item
                }
            );
        });


    } else {
        return reply.redirect('/login');
    }
};
