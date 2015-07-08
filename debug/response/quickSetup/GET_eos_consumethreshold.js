
/**
 * 第一阶段第二步提交，用以获取用户日消费设定的最低阈值
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            threshold : 500
        };
    
        rel.status = 200;
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});