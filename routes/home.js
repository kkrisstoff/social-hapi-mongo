
exports.get = function (request, reply) {
    var user = request.auth;
    console.log(user);
    if (request.auth.isAuthenticated) {
        return reply.view('home',
            {
                title: 'Home'
            }
        );
    } else {
        return reply.redirect('/login');
    }
};