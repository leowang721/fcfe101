define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            status: 200,
            data: {
                signature : 'IU！%RUHA',
                aostatus : 0,
                totalnum : 120,
                returnnum :  param.endindex - param.startindex,
                timestamp : 127831067988222,
                listData : []
            }
        };
        
        var recmdSchedule = {
            suggestcyccnt: 13,
            suggestcyc : '[[201,204],[308,318]]',
            plancyc : "[[101,102],[118,121],[114,118]]",
            potionalclk: [],//"[13, 34, 16, 88, 30, 90]",
            hotlevel: [],//"[53, 34, 76, 18, 60, 20]"
            searchcount: [],
            potentialclkrate: [],
            competehotlevel: []
        };
    
        for (var i = recmdSchedule.suggestcyccnt; i --;) {
            recmdSchedule.potionalclk[i] = parseInt(Math.random() * 100);
            recmdSchedule.hotlevel[i] = parseInt(Math.random() * 100);
            recmdSchedule.searchcount[i] = parseInt(Math.random() * 10000);
            recmdSchedule.potentialclkrate[i] = parseInt(Math.random() * 2)
                * parseInt(Math.random() * 400);
            recmdSchedule.competehotlevel[i] = parseInt(Math.random() * 2)
                * parseInt(Math.random() * 11);
        }
    
        recmdSchedule.potionalclk = '['
            + recmdSchedule.potionalclk.toString() + ']';
        recmdSchedule.hotlevel = '['
            + recmdSchedule.hotlevel.toString() + ']';
        recmdSchedule.searchcount = '['
            + recmdSchedule.searchcount.toString() + ']';
        recmdSchedule.potentialclkrate = '['
            + recmdSchedule.potentialclkrate.toString() + ']';
        recmdSchedule.competehotlevel = '['
            + recmdSchedule.competehotlevel.toString() + ']';
    
        rel.data.listData = [recmdSchedule];
    
        rel.timeout = 1500;
    //    rel.status = 400;
        return rel;
    
    };
});