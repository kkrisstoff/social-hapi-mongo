var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'cloudhapi',
    api_key: '114595513843841',
    api_secret: '8s0WzgTJIBZdkwxIQRdiy5NgK14'
});

module.exports = cloudinary;