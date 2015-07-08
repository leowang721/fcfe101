
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), table = [{
            "date" : "1345433137508",// 时间
            "value" : 0.90
                // 数值
            }, {
            "date" : "1345519553981",// 时间
            "value" : 0.30
                // 数值
            }, {
            "date" : "13456060233531",// 时间
            "value" : 0.60
                // 数值
            }, {
            "date" : "1345692440772",// 时间
            "value" : 0.40
                // 数值
            }, {
            "date" : "1345778872448",// 时间
            "value" : 0.30
                // 数值
            }, {
            "date" : "1345865290782",// 时间
            "value" : 0.10
                // 数值
            }, {
            "date" : "1345951712085",// 时间
            "value" : 0.30
                // 数值
            }];
        /*
         * var date = new Date();
         * 
         * for(i=0;i<180;i++){ var day = date.getDate(); table[i] ={ date :
         * date.setDate(day + 1), value:10 } }
         */
    
        rel.data = [{
                    trend : 0.89234,
                    rate : 0.3000,
                    table : table
                }, {
                    trend : 111111111111,
                    rate : 0.312300,
                    table : table
                }, {
                    trend : 111111111111,
                    rate : -0.3000,
                    table : table
                }]
        return rel;
    };
});