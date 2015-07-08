
/**
 * 获取用户未保存的监控文件夹列表
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [1, 2, 3];
        return rel;
    };
});