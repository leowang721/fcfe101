
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            budgetPercent: Math.random(),//提价同行百分比
            budgetRaised: Math.random(),//同行提价额
            pricedPercent: Math.random(),//价格升高关键词百分比
            increasedPercent: Math.random()//增加购词量的同行百分比
        };
        
        return rel;
    };
});