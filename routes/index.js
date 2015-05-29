module.exports = function () {

     return [
         {
             method: 'GET',
             path: '/',
             handler: require('./home').get
         },
         {
             method: 'GET',
             path: '/login',
             config: {
                 handler: require('./login').get
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
