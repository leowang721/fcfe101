
/**
 * 获取监控文件夹数量
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            currentCount : 2,
            maxCount : 10
        };
        return rel;
    };
});