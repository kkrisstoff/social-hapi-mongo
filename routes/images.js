var Image = require('../models/image').Image;
exports.get = function (request, reply) {
    var user = request.auth.credentials,
        userName = user.username;

    if (request.auth.isAuthenticated) {
        Image.find({user: userName}, {}).exec(function(err, items) {
            "use strict";
            if (err) throw err;//callback(err, null);

            return reply.view('images',
                {
                    page: 'images',
                    title: 'Images',
                    user: userName,
                    images: items
                }
            );
        });


    } else {
        return reply.redirect('/login');
    }
};
