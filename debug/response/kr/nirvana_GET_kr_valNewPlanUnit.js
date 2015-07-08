
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.errorCode = 502;
        rel.data = {
            logid : 123, // 日志标识
            data : {}
        };
    
        return rel;
    
    };
});