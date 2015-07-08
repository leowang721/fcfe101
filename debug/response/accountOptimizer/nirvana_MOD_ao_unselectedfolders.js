
/**
 * 修改用户未保存的监控文件夹列表
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        // rel.errorCode = 6002;
        return rel;
    };
});