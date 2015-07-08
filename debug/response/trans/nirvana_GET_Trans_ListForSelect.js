
/**
 * 通过所属网站查找转化名称（转化跟踪工具-->转化数据）
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
            name : "转化名称B/<button>" + param.siteid,
            trans_id : "2"
        } ];
        return rel;
    };
});