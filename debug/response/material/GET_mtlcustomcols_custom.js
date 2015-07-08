    
/**
 * 获取用户自定义列
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var customList = require('../../materialData/fields');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            colstype : customList[param.dimlevel].colstype, // 0：默认，1：全部，2：自定义
            customcols : customList[param.dimlevel].customcols
        };
        return rel;
    };
});