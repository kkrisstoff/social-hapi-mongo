
exports.get = function (req, reply) {
    reply.view('login',
        {
            title: 'Login'
        }
    );
};

exports.post = function (request, reply) {
    var payload = request.payload,
        name = payload.name,
        pass = payload.password;


    reply.view('login',
        {
            title: 'Login'
        }
    );
};
