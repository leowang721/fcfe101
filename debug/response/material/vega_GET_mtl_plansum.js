/**
 * 获取计划层级物料汇总数据
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var materialData = {
        useracct: require('../../materialData/account').data,
        planinfo: require('../../materialData/plan').data,
        unitinfo: require('../../materialData/unit').data,
        wordinfo: require('../../materialData/keyword').data,
        ideainfo: require('../../materialData/idea').data,
        creativeIdeaInfo: require('../../materialData/creative').data
    };

    module.exports = function (path, param) {
        var rel = tpl.success();
        var maxNum = Math.floor(Math.random() * 100);
        rel.data = {
            sum: {}
        };
        for (var i = 0, len = param.fields.length; i < len; i++) {
            rel.data.sum[param.fields[i]] = param.fields[i] == 'clkrate'
                ? Math.random()
                : Math.floor(Math.random() * 1000000);
        }
        rel._timeout = 1000;
        return rel;
    };
});