/**
 * @file 获取动态创意片段
 * @author Feixiang Yuan(yuanfeixiang@baidu.com)
 * @date 2014-09-25
 */
define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');
    var dynamicIdeaInfo = require('../../materialData/dynamicIdea').data;

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data.listData = [];

        var pid = 0;
        if (param.condition && param.condition.unitid) {
            pid = param.condition.unitid * 1000;
        } else if (param.condition && param.condition.planid) {
            pid = param.condition.planid * 1000;
        }

        for (var j = 0; j < param.pageSize; j++) {
            var toPush = {};
            for (var i in param.fields) {
                var f = param.fields[i];
                toPush[f] =
                    dynamicIdeaInfo[f](j + 1 + pid);
            }
            rel.data.listData.push(toPush);
        }
        rel.data.totalCount = random.int(param.pageSize, 300);
        return rel;
    };
});