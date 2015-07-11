var path = require('path');

module.exports = function () {

     return [
         {
             method: 'GET',
             path: '/',
             config: {
                 handler: require('./home').get,
                 auth: 'session'
             }
         },
         {
             method: 'GET',
             path: '/home',
             config: {
                 handler: require('./home').get,
                 auth: 'session'
             }
         },
         {
             method: 'GET',
             path: '/images',
             config: {
                 handler: require('./images').get,
                 auth: 'session'
             }
         },
         {
             method: 'GET',
             path: '/images/{id}',
             config: {
                 handler: require('./image/image').get,
                 auth: 'session'
             }
         },
         {
             method: 'GET',
             path: '/login',
             config: {
                 handler: require('./login').get,
                 auth: {
                     mode: 'try',
                     strategy: 'session'
                 },
                 plugins: {
                     'hapi-auth-cookie': {
                         redirectTo: false
                     }
                 }
             }
         },
         {
             method: 'GET',
             path: '/signup',
             config: {
                 handler: require('./register').get
             }
         },

         {
             method: 'POST',
             path: '/login',
             config: {
                 handler: require('./login').post
             }
         },
         {
             method: 'GET',
             path: '/logout',
             config: {
                 handler: require('./logout').get
             }
         },
         {
             method: 'POST',
             path: '/register',
             config: {
                 handler: require('./register').post
             }
         },
         {
             method: 'POST',
             path: '/image/upload',
             config: {
                 payload: {
                     output: 'file',
                     maxBytes: 209715200,
                     parse: true,
                     allow: 'multipart/form-data'
                 },
                 handler: require('./image/upload').post,
                 auth: 'session'
             }
         }
     ]
};
