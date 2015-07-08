
/**
 * 通过所属网站查找转化名称，只取完全匹配模式的转化名称（转化跟踪工具-->全面检查）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = [ {
            name : "转化名称A/<button>" + param.siteid,
            trans_id : "1"
        }, {
            name : "转化名称B/<button>3MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM3MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM3MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM3MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM3MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM" + param.siteid,
            trans_id : "2"
        }, {
            name : "转化名称A/<button>" + param.siteid,
            trans_id : "3"
        }, {
            name : "转化名称A/<button>" + param.siteid,
            trans_id : "4"
        }];
        
        return rel;
    };
});