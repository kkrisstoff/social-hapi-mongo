var mongoose = require('../lib/mongoose');
var async= require('async');
var User = require('../models/user');

exports.get = function (req, reply) {
    reply.view('signup',
        {
            title: 'Sign Up'
        }
    );
};

exports.post = function (request, reply) {
    var payload = request.payload,
        name = payload.username,
        pass = payload.password,
        mail = payload.mail;

    var userData = {
            username: name, password: pass, mail: mail
        };

    var user = new mongoose.models.User(userData);
    user.save(function (err) {
        if (!err) {
            reply(user).created('/events/' + user._id);    // HTTP 201
        } else {
            reply(err)
        }
    });

//    reply.view('login',
//        {
//            title: 'Login'
//        }
//    );

};