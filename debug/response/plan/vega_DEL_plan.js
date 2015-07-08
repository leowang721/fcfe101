/**
 * 删除计划
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        if (confirm("LONG_PROCESS_ERROR?")) {
            rel.status = 400;
            rel.errorCode = {
                code : 407
            }
        } else {
            rel.status = 200;
        }
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});