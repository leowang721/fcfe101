
/**
 * 检查监控文件夹中的关键词总数量是否已经超限
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            currentCount : 18,
            maxCount : 100
        };
        return rel;
    };
});