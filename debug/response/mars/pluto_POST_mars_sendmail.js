
/**
 * 修改循环报告参数
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return this.pluto_DEL_mars_reportinfo(level, param);
    };
});