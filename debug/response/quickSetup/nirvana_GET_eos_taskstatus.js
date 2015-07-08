
/**
 * 获取任务进行状态
 * 
 * 0：没开始 1: 开始生成方案 2：成功 3：开始入库 4：成功 5：部分成功 6：推广方案生成失败 7：推广方案入库失败
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var kslfData = storage.get('kslfData');
    if (kslfData === undefined) {
        kslfData = 0;
        storage.set('kslfData', 0);
    }
    
    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            taskstate : kslfData, // 取值0-7
            tasktype : kslfData % 2 == 0 ? "useracct" : 'planinfo' // 取值”useracct”或”planinfo”，分别代表快速新建账户和快速新建计划
        };
        return rel;
    };
});