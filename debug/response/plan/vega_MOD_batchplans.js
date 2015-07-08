
/**
 * 批量修改计划预算的模拟接口
 * @author wuhuiyao@baidu.com
 * @date 2013-5-20
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.status = 200;
        rel.data = {};
    
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});