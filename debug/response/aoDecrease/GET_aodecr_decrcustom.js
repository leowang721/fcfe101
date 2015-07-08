
/**
 * 获取突降指标和突降阈值(未设置则默认为点击和20%)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            type : 'pv', // shows clks pv 分别代表展现、点击、浏览
            value : 20
            // 阈值。取值(0,100]，整数
        };
    
        rel.data = data;
    
        return rel;
    };
});