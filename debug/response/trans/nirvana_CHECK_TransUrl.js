
/**
 * 检查转化跟踪URL（转化跟踪工具-->全面检查-->转化跟踪URL）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = {
            "data" : "cachekey"
        };
        
        return rel;
    };
});