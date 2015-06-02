var User = require('../models/user').User;
var async = require('async');

exports.get = function (req, reply) {
    reply.view('login',
        {
            title: 'Login'
        }
    );
};

exports.post = function (request, reply) {
    var payload = request.payload,
        username = payload.username,
        password = payload.password;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}).exec(callback);
        },
        function(user, callback) {
            if (!user) {
                reply(403, 'User isn\'t exist');
            } else {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    reply(403, 'Invalid Password');
                }
            }
        }
    ],
        function(err, user) {
            if (err){
                console.error(err);
                return reply.redirect('/login');
            }

            //reply.session.user = user._id;
            console.log(request.auth);
            request.auth.session.set(user.getPublicFields());
            return reply.redirect('/home');
        }
    );
//    reply.view('login',
//        {
//            title: 'Login'
//        }
//    );
};
