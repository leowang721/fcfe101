
/**
 * 启动bianque，计算摘要信息
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            hasadvice : kslftestdata
            // 当command为“query”时，0代表没有优化建议，1代表有优化建议，2表示在计算中；当command为“start”时，该字段为0，没有意义
        };
    
        rel.data = data;
    
        return rel;
    };
});