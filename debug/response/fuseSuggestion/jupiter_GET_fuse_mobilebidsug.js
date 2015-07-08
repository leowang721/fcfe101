
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.errorCode = 0;
        var yAxis = "[0, 1, 6, 11, 23, 48, 84, 137, 232, "
                  +  "592, 808, 886, 958, 1032, 1098, 1161," 
                  +  "1197, 1235, 1269, 1301, 1406, 1468," 
                  +  "1508, 1533, 1554, 1566, 1568, 1573,"
                  +  "1575, 1575, 1576, 1577, 1577, 1577, 1577, 1577]";
    
        var xAxis = "[0.0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9," 
                  + "1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9," 
                  +  "2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5," 
                  +  "7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0]";
    
        var mIndex = parseInt(Math.random() * 10);
        var pIndex = parseInt(Math.random() * 10) + 15;
        var returnData = {
            1005: {
                data: {
                    planid: param.planid,
                    planname: '减肥开飞机',
                    mPriceFactor: 3,
                    recmmPriceFactor: 7.0,
                    click: 1468, 
                    predictClick: 1575,
                    dotNum: 36,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    reason: parseInt(Math.random() * 10) % 2
                },
                hasProblem: 1
            }
        };
        rel.data = returnData[1005];
        return rel;
    };
});