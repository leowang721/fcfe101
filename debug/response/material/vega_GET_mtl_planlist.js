/**
 * 获取计划层级物料数据
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
        // var maxNum = Math.floor(Math.random() * 100);
        var maxNum = 100;
        rel.data.listData = [];
        var pid = 0;
        if (param.condition && param.condition.planid) {
            pid = param.condition.planid * 1000;
        }
        var count = maxNum > param.pageSize ? param.pageSize : maxNum;
        for (var j = 0; j < count; j++) {
            var toPush = {};
            for (var i = 0, len = param.fields.length; i < len; i++) {
                toPush[param.fields[i]] = materialData.planinfo[param.fields[i]](j + 1 + pid);
            }
            rel.data.listData.push(toPush);
        }
        rel.data.totalCount = maxNum;
        rel._timeout = 1000;
        return rel;
    };
});