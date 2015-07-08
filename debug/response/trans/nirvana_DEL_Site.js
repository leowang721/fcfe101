/**
 * 删除指定网站（转化跟踪工具-->网站列表-->删除）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = 1;
        return rel;
    };
});