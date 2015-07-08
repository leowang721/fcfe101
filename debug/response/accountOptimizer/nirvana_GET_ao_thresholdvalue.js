/**
 * 获取左侧首屏/首位展现概率阈值
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [40, 60];
        return rel;
    };
});