define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(),
            temp = 0;
        rel.data = {
            date: param.date
        }
        // 周预算设置情况，value为最后一 次设置的周预算额度，-1表示取消周预算设置
        switch(Math.ceil(Math.random(1)*10) % 3 + ''){
            case '0':
                rel.data['weekBudgetStat'] = -1;
                rel.data['budgetStat'] = Math.ceil(Math.random(1)*10);
                rel.data['regionStat'] = Math.ceil(Math.random(1)*10);
                break;
            case '1':
                rel.data['weekBudgetStat'] = Math.ceil(Math.random(1)*10);
                rel.data['regionStat'] = -1;
                break;
            case '2':
                rel.data['weekBudgetStat'] = Math.ceil(Math.random(1)*10)
                rel.data['budgetStat'] = -1;
                break;
        }
        temp = Math.ceil(Math.random(1)*10);
        if (temp > 4){
            rel.data['newPlanCnt'] = temp;
        }
        temp = Math.ceil(Math.random(1)*10);
        if (temp > 4){
            rel.data['delPlanCnt'] = temp;
        }
        temp = Math.ceil(Math.random(1)*10);
        if (temp > 4){
            rel.data['startPlanCnt'] = temp;
        }
        temp = Math.ceil(Math.random(1)*10);
        if (temp > 4){
            rel.data['stopPlanCnt'] = temp;
        }
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});