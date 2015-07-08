
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = [];
        for (var i = 0; i < 37; i ++) {
            var temp = Math.random();
            if (temp < 0.2) {
                rel.data.push({
                    id: i,
                    acp: Math.round(10000*Math.random())/10000//平均ACP与北京的比较值
                });
            }
            else if (temp > 0.8){
                rel.data.push({
                    id: i,
                    epvRate: Math.round(10000*Math.random())/10000//行业流量占比
                });
            } else {
                rel.data.push({
                    id: i,
                    epvRate: Math.round(10000*Math.random())/10000,//行业流量占比
                    acp: Math.round(10000*Math.random())/10000//平均ACP与北京的比较值
                });
            }
        }
    
        return rel;
    };
});