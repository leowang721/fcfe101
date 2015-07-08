
/**
 * 修改突降指标和突降阈值 errorCode取值范围 6003或6004 6003：效果突降阈值参数错误 6004：效果突降类型参数错误
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        // 这里格式需要进一步确认
        // rel.errorCode = 6003;
        kslftestdata = kslftestdata == 0 ? 1 : 0;
        return rel;
    };
});