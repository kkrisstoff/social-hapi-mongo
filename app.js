var Hapi = require('hapi');

var config = require('./config');
var path = require('path');

var server = new Hapi.Server({
//    connections: {
//        routes: {
//            files: {
//                relativeTo: path.join(__dirname, './public')
//            }
//        }
//    }
});

// Setup the server with a host and port
server.connection({
    port: process.env.PORT || config.get('port')
});

//todo: add static files
//server.path(__dirname + './public');

server.views({
    engines: {
        html: require('handlebars')
        //ejs: require('ejs')
    },
    relativeTo: __dirname,
    path: './templates'
});

//DB connection
var mongoose = require('./lib/mongoose');

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    var str = request.method.toUpperCase() + ":  " + request.path + "\n"/* + JSON.stringify(request.query)*/;
    console.log(str);

    return reply.continue();
});

server.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        console.log('Failed loading plugin: "hapi-auth-cookie"');
    }
    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false
    });
});

var routes = require('./routes')();
server.route(routes);

/*
 Load all plugins and then start the server.
 First: community/npm plugins are loaded
 Second: project specific plugins are loaded
 */
server.register([
    {
        register: require('./assets/index.js')
    }
], function () {
    //Start the server
    server.start(function() {
        //Log to the console the host and port info
        console.log('Server started at: ' + server.info.uri);
    });
});