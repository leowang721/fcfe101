define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');

    var storage = require('lib/storage');
    var kslfData = storage.get('kslfData');
    if (kslfData === undefined) {
        kslfData = 0;
        storage.set('kslfData', 0);
    }

    var planData = require('../../materialData/plan').data;
    var unitData = require('../../materialData/unit').data;
    
    module.exports = function (path, param) {
        if (param.mtlTreeNode.mtlLevel == 'useracct') { // 计划列表
            var tmp = [];
            var count = kslfData == 4 ? 1 : 10;
            for (var i = 1; i < count; i++) {
                tmp[tmp.length] = {
                    mtlId: planData.planid(i),
                    mtlName: planData.planname(i),
                    mtlStat: planData.planstat(i),
                    subIdeaCount: -1,
                    subMtlCount: random.int(0, 2)
                }
            }
            var rel = tpl.success();
            tmp.sort(function (x, y) {
                if (param.sortField === 'mtlId') {
                    return x.mtlId - y.mtlId;
                }
                return x.mtlName.localeCompare(y.mtlName);
            });
            rel.data = tmp;
            // 模拟数据请求延迟
            rel.timeout = 1000;
            return rel;
        } else { // 单元列表
            var tmp = [], planid = param.mtlTreeNode.mtlId;
    
            for (var j = 1, len = planid % 5; j < len; j++) {
                tmp.push({
                    mtlId: unitData.unitid((planid) * 1000 + j),
                    mtlName: '计划' + planid + '_' + unitData.unitname(j),
                    mtlStat: unitData.unitstat(j),
                    subMtlCount: random.int(0, 2),
                    subIdeaCount: random.int(0, 2)
                        // 账户树升级新增字段 by mayue@baidu.com
                    });
            }
            var rel = tpl.success();
            rel.data = tmp;
            // 模拟数据请求延迟
            rel.timeout = 1000;
            return rel;
        }
    
    };
});
