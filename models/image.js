var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    user: {
        type: String
    },
    img_id: {
        type: String
    },
    img_name: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    secure_path: {
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

exports.Image = mongoose.model('Image', schema);