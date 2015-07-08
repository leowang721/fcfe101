define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');
    var moment = require('moment');

    var wordSet = ['捡肥皂', '打折词', '真漂亮', '不错我', '好便宜', '高富帅', '白富美'];
    module.exports = function (path, param) {
        var rel = tpl.success();
        var now = new moment();
        rel.data = {
            winfoid: param.winfoid,
            device: param.device,
            date: param.date,
            hour: param.hour
        };

        rel.data.wordDetail = {
            winfoid: random.int(100000, 999999),
            showword: '重点词' +　random.words(3, wordSet),
            unitid: random.int(100000, 999999),
            unitname: '单元名' + random.words(3, wordSet),
            planid: random.int(100000, 999999),
            bid: random.float(1.00, 999.00, 2),
            unitbid: random.float(0.01, 9999.00, 2),
            clks: random.int(1, 999999),
            mPriceFactor: random.float(0.01, 9.99, 2),
            matchPriceStatus: random.int(0,1),
            avgprice: random.float(0, 9999, 2),
            matchPriceFactor: {
                accurate: random.float(0.01, 10.00, 2),
                phrase: random.float(0.01, 10.00, 2),
                widespread: random.float(0.01, 10.00, 2)

            }
        };
        var rankDetail = [];
        rel.data.rankDetail = rankDetail;
        var count = param.device == 1 ? random.int(5, 8) : random.int(2, 4);
        for (var i = 0; i < count; i++ ) {
            rankDetail[i] = {
                rank: i + 1,
                shows: random.int(1, 999999),
                showrate: random.float(0, 0.99, 6),
                clks: random.int(1, 999999),
                clkrate: random.float(0, 0.99, 6)
            };
        }
        return rel;
    };
});