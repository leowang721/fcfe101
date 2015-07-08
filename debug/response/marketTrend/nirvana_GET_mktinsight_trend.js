
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var now = new Date();
        rel.data = {
            mainData: {
                oldPV: [],
                newPV: [],
                myShow: [],
                otherShow: []
            },
            hotData: []
        };
        //设置数据
        var historyBeginDate = new Date();
        historyBeginDate.setFullYear((historyBeginDate.getMonth() <= 5) ? (historyBeginDate.getFullYear() - 2) 
            : (historyBeginDate.getFullYear() - 1));
        historyBeginDate.setMonth(5);
        historyBeginDate.setDate(30);
        
        var newBeginDate = new Date();
        if (newBeginDate.getMonth() <= 5) {
            newBeginDate.setFullYear(newBeginDate.getFullYear() - 1);
        }
        newBeginDate.setMonth(5);
        newBeginDate.setDate(30);
        
        var tempHotArray = [];
        for (var i = 0; i < 365; i ++) {
            historyBeginDate.setDate(historyBeginDate.getDate() + 1);
            rel.data.mainData.oldPV.push({
                date: historyBeginDate.getTime(),
                value: Math.floor(Math.random()*1000)
            });
            if (Math.random() < 0.03) {
                tempHotArray.push(historyBeginDate.getTime());
            }
            
            newBeginDate.setDate(newBeginDate.getDate() + 1);
            if (newBeginDate.getTime() <= now.getTime()) {
                rel.data.mainData.newPV.push({
                    date: newBeginDate.getTime(),
                    value: Math.floor(Math.random()*1000)
                });
                rel.data.mainData.myShow.push({
                    date: newBeginDate.getTime(),
                    value: Math.floor(Math.random()*100)
                });
                rel.data.mainData.otherShow.push({
                    date: newBeginDate.getTime(),
                    value: Math.floor(Math.random()*100)
                });
            }
        }
        
        var hotArrayLen = tempHotArray.length;
        if (hotArrayLen%2) {
            tempHotArray.pop();
        }
        for (var j = 0; j < hotArrayLen - 1; (j = j + 2)) {
            rel.data.hotData.push({
                begin: tempHotArray[j],
                end: tempHotArray[j + 1]
            });
        }
        
        return rel;
    };
});