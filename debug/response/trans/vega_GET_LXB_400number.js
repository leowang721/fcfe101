/**
 * @file 获取用户的离线宝电话
 * @author wangyi(wangyi25@baidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = '4001234567';
        return rel;
    };
});