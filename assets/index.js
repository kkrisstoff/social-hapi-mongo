// These are the public assets. Goal is to serve css, js, partials, images, or bower packages.
exports.register = function(server, options, next){

    server.route([
        {
            method: 'GET',
            path: '/resources/images/{path*}',
            handler: {
                directory: { path: './resources/images' }
            },
            config: {
                id: 'image'
            }
        },
        {
            method: 'GET',
            path: '/resources/images/thumbs/{path*}',
            handler: {
                directory: { path: './resources/images/thumbs' }
            },
            config: {
                id: 'images'
            }
        },
        {
            method: 'GET',
            path: '/css/{path*}',
            handler: {
                directory: { path: './public/css' }
            },
            config: {
                id: 'css'
            }
        },
        {
            method: 'GET',
            path: '/vendor/{path*}',
            handler: {
                directory: { path: './public/vendor' }
            },
            config: {
                id: 'js'
            }
        },
        {
            method: 'GET',
            path: '/bower_components/{path*}',
            handler: {
                directory: { path: './public/bower_components' }
            },
            config: {
                id: 'bower'
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'assets'
};