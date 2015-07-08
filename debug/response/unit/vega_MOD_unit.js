
define(function (require, exports, module) {
    var util = require('../../lib/util');
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        /*
        rel.status = 300;
        rel.error = {};
        var uid;
        var dataGetter = {
            plan: require('../../materialData/plan').data,
            unit: require('../../materialData/unit').data
        };

        for (var i = 0, l = param.unitid.length; i < l; i++) {
            uid = param.unitid[i];
            param.code = 806;
            var f = util.extend({
                unitid: uid,
                pausestat: dataGetter.unit.pausestat(uid),
                unitstat: dataGetter.unit.unitstat(),
                code: 806
            }, param.items);

            rel.error[uid] = {};
            rel.error[uid].negative = f; 
        }
        rel.timeout = 1500;
        */
        rel.status = 200;
        var dataGetter = {
            unit: require('../../materialData/unit').data
        };
        rel.data = {};
        for (var i = 0, l = param.unitid.length; i < l; i++) {
            var uid = param.unitid[i];
            rel.data[uid] = {
                createtime: 1407945600000,
                isdel: "false",
                lowbidcnt: 0,
                mPriceFactor: 2,
                matchPriceStatus: 1,
                unitMPriceFactor: rand.number(0, 10),
                pausestat: dataGetter.unit.pausestat(uid),
                planid: 18784780,
                planname: "20140814智斌回归计划",
                unitbid: 10,
                unitid: uid,
                unitname: "20140814智斌回归单元",
                unitstat: rand.number(0, 2),
                userid: 630152
            };
        }
        return rel;
    };
});