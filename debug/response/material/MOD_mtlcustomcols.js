/**
 * 修改用户自定义列
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var customList = require('../../materialData/fields');

    module.exports = function (path, param) {
        customList[param.dimlevel].colstype = param.colstype;
        customList[param.dimlevel].customcols = [];
        for (var i = 0, len = param.customcols.length; i < len; i++) {
            customList[param.dimlevel].customcols[i] = param.customcols[i];
        }
        var rel = tpl.success();
        return rel;
    };
});