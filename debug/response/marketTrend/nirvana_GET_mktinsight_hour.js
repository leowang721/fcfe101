
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            weekPV: [],
            weekShow: [],
            workPV: [],//工作日流量
            workCPTPeer: [],//工作日竞争
            workCPTPeerMin: [],//工作日同行业竞争，前三个就是检索量大同行竞争小的三个时段
            workMyHour: [],
            weekendPV: [],
            weekendCPTPeer: [],
            weekendCPTPeerMin: [],
            weekendMyHour: []
        };
        for (var i = 0; i < 24; i ++) {
            rel.data.workPV.push({
               time: i,
               rate: Math.random()
            });
            rel.data.workCPTPeerMin.push({
               time: i,
               rate: Math.random()
            });
            rel.data.workCPTPeer.push({
               time: i,
               rate: Math.random()
            });
            rel.data.workMyHour.push({
               time: i,
               rate: (Math.random() > 0.4) ? 1 : 0
            });
            rel.data.weekendPV.push({
               time: i,
               rate: Math.random()
            });
            rel.data.weekendCPTPeerMin.push({
               time: i,
               rate: Math.random()
            });
            rel.data.weekendCPTPeer.push({
               time: i,
               rate: Math.random()
            });
            rel.data.weekendMyHour.push({
               time: i,
               rate: (Math.random() > 0.4) ? 1 : 0
            });
        }
        var beginDate = new Date();
        var tempDate = beginDate.getDate();
        for(var j = 0; j < 7; j ++) {
            beginDate.setDate(tempDate - (7 - j));
            if (Math.random() < 0.8){
                rel.data.weekPV.push({
                   date: beginDate.getTime(),
                   value: Math.round(1000*Math.random())
                });
            }
            if (Math.random() < 0.8){
                rel.data.weekShow.push({
                   date: beginDate.getTime(),
                   value: Math.round(1000*Math.random())
                });
            }
        }
        return rel;
    };
});