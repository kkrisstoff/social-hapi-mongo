
exports.get = function (request, reply) {
    request.auth.session.clear();
    reply.redirect('/');
};
