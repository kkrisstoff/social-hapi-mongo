// These are the public assets. Goal is to serve css, js, partials, images, or bower packages.
exports.register = function(server, options, next){

    server.route([
        {
            //server.route({ method: 'GET', path: '/favicon.ico', handler: { file: 'favicon.ico' }, config: { cache: { expiresIn: 86400000 } } });
            method: 'GET',
            path: '/favicon.ico',
            handler: {
                file: 'favicon.ico'
            },
            config: {
                //cache: { expiresIn: 86400000 },
                id: 'favicon'
            }
        },
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
            path: '/js/{path*}',
            handler: {
                directory: { path: './public/js' }
            },
            config: {
                id: 'js'
            }
        },
        {
            method: 'GET',
            path: '/vendor/{path*}',
            handler: {
                directory: { path: './public/vendor' }
            },
            config: {
                id: 'vendor'
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'assets'
};