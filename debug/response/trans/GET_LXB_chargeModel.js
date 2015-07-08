//获取收费模式 ： 当前暂时没用
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = 1;
        return rel;
    };
});