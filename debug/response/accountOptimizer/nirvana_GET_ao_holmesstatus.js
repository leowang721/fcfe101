define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = { // 0 : 正常，4 : 未开通holmes，5 : 未设置转化路径，6 : 代码检查有误
            holmesstatus : 0, // +prompt('4为未开通，6为代码检查有误', 0), // 0/4/6
            transtarget : 5
            // 0/5
        };
    
        return rel;
    };
});