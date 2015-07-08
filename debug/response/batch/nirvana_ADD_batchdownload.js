define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = [200, 400, 403][Math.round(Math.random() * 100) % 3];
        rel.errorCode = {
            code : 1261
        };
        return rel;
    
    };
});