
exports.get = function (req, reply) {
    reply.view('index',
        {
            title: 'Home'
        }
    );
};