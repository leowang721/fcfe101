
/**
 * 修改高消费、高点击、高展现词阈值
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