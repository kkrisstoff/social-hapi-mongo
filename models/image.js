var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    user: {
        type: String
    },
    path: {
        type: String
    },
    thumbPath: {
        type: String,
        required: true
    },
    added: {
        type: Date,
        default: Date.now
    }
});

schema.methods.getPublicFields = function() {
    return {
        path: this.path,
        thumbPath: this.thumbPath
    };
};

exports.User = mongoose.model('Image', schema);