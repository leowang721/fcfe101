
/**
 * 添加转化（转化跟踪工具-->新增转化）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = 1;
        rel = {
             status : 400,
            data : '',
            errorCode : {
                code : 1537
            }
         };
        return rel;
    };
});