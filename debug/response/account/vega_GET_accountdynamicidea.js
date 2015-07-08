/**
 * @file 动态创意获取账户级别老开关
 * @author Yijun Deng (dengyijun@baidu.com)
 */

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = 0; // 为1表示开启，0表示未开启
        return rel;
    };
});