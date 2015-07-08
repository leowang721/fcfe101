
/**
 * 判断是否是效果检验状态
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            biztype : "0" // 1表示是效果检验状态，0表示正常状态
        };
        // rel.timeout = 500;
        return rel;
    };
});