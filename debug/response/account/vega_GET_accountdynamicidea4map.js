/**
 * @file 动态创意获取账户级别新开关
 * @author Yijun Deng (dengyijun@baidu.com)
 */

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            hasStatus: 1, // 为0表示开启，1表示未开启
            lastUpdateTime: '2014-12-13 15:00:00', // yyyy-MM-dd hh:mm:ss
            isDisabled: 0 // 为1表示置灰，0表示不置灰
        };
        return rel;
    };
});