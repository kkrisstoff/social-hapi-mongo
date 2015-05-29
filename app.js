var Hapi = require('hapi');

var config = require('./config');
var path = require('path');

var server = new Hapi.Server({
    connections: {
        routes: {
            //todo: add static files
            files: {
                relativeTo: path.join(__dirname, './public')
            }
        }
    }
});
var port =  process.env.PORT ||config.get('port');

server.connection({ port: port });

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

var routes = require('./routes')();
server.route(routes);


server.start(function () {
    console.log('server running at: ' + server.info.uri);
});