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
             method: 'POST',
             path: '/login',
             config: {
                 handler: require('./login').post
             }

         },
         {
             method: 'POST',
             path: '/register',
             handler: require('./register').post
         }
     ]
};
