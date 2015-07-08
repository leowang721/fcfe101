define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data.hasAuth = true;
        rel.data.percent = "22";
        rel.data.todayCost = "222";
        rel.data.totalCost = "2222";
        return rel;
    };
});