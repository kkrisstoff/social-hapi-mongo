
exports.post = function (request, reply) {
    var payload = request.payload,
        name = payload.name,
        pass = payload.password,
        mail = payload.mail;


    reply.view('login',
        {
            title: 'Login'
        }
    );

};