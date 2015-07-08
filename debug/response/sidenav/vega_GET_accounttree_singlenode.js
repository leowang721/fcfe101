define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');
    var moment = include('moment');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var mtlName = param.mtlTreeNode.mtlId + ' 更新于'
            + moment().format('mm:ss');
        if (param.mtlTreeNode.mtlLevel == 'planinfo') {
            mtlName = '计划_' + mtlName;
        } else {
            mtlName = '单元_' + mtlName;
        }
        rel.data = {
            mtlId: param.mtlTreeNode.mtlId,
            mtlName: mtlName,
            mtlStat: 0,
            subMtlCount: random.int(0, 2),
            subIdeaCount: random.int(0, 2)
            // 账户树升级新增字段 by mayue@baidu.com
        };
        return rel;
    
    };
});
