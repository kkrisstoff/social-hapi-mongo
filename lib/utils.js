//var _ = require("underscore");
var md5 = require('MD5');

exports.hashedImageName = function (str) {
    var time = new Date().getTime(),
        indexOfDot = str.lastIndexOf("."),
        imgName = str.slice(0, indexOfDot),
        fileExtension = str.slice(indexOfDot + 1);

    return time + "-" + md5(imgName) + "." + fileExtension;
};
