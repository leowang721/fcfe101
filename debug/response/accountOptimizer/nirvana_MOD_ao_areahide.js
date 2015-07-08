
/**
 * 修改主动提示区域的展开及永久收起状态
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        // rel.errorCode = 6000;
        return rel;
    };
});