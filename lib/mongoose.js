/**
 *
 *
 */
var mongoose = require('mongoose'),
    config = require('./../config');

mongoose.connect(config.get('db:path'));

if (config.get('NODE_ENV') === 'development') {
    mongoose.set('debug', true);
}

var db = mongoose.connection;
db.on('error', function (err) {
    if (err) return console.log.error(err);
    console.log('connected');
});

db.once('open', function (callback) {
    console.log("DB is opened");
    if (callback && typeof callback == "function"){
        callback.apply(this, arguments);
    }
});

console.log("DB initialized");
module.exports = mongoose;
