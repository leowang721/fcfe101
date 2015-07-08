
/**
 * 获取高消费、高点击、高展现词
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), len = 30;
    
        rel.data = {};
        rel.data.listData = [];
        for (var i = 0; i < len; i++) {
            rel.data.listData[i] = {
                planid : "102" + i,
                planname : "计划" + i,
                unitid : "201" + i,
                unitname : "单元" + i,
                winfoid : "456" + i,
                showword : "关键词" + i,
                value : 67 + i,
                rate : (0.1 + i / 100).toFixed(2) + "%"
            }
        }
        return rel;
    };
});