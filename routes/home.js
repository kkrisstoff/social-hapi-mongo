
exports.get = function (request, reply) {
    var user = request.auth.credentials,
        name = user.username,
        userId = user.id;
    if (request.auth.isAuthenticated) {
        return reply.view('home',
            {
                page: 'home',
                title: 'Home',
                user: name,
                id: userId
            }
        );
    } else {
        return reply.redirect('/login');
    }
};