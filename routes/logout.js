
exports.get = function (request, reply) {
    var payload = request.payload;

    request.auth.session.clear();
    reply().redirect('/');
};
