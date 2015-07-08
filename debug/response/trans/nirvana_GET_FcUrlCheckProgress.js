
/**
 * 搜索推广URL进度查询（转化跟踪工具-->全面检查-->推广访问URL）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(),
            tmp = ['processing', 'done'],
            num = round(Math.random()); // 0 or 1
        
        rel.data = 'done';
        
        return rel;
    };
});