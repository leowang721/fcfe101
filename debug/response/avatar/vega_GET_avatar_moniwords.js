
/**
 * 获取监控文件夹中的关键词列表
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');
    var materialData = require('../../materialData/keyword').data;

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data.listData = [];
        var pageNo = param.pageNo;
        for (var j = 0; j < 102; j++) {
            rel.data.listData[j] = {};
            for (var i = 0, len = param.fields.length; i < len; i++) {
                var field = param.fields[i];
                rel.data.listData[j][field] = materialData[field](j);
            }
        }
        return rel;
    };
});
