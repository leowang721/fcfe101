define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.data = 'i am the longest word ';
        return {"status":200,"data":'',"errorCode":null};
    
    };
});