
/**
 * 左侧首位展现概率详情
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            signature : 'IU！%RUHA', // 签名，用于记录一组condition状态
            aostatus : 0, // 请求状态，0-处理正常，1-请求格式错误，2-系统内部错误，3-任务队列已满，请重试，4-需要更详细的请求数据，不只是签名
            totalnum : 120, // 结果的总条数
            returnnum : 10, // 本次返回的条数
            timestamp : 127831067988222, // 任务完成的时间戳
            listData : []
        }, listData = [], i;
        for (i = 0; i < data.returnnum; i++) {
            listData.push({
                        planid : param.startindex + i + 100,
                        planname : '左侧首位计划' + (param.startindex + i + 100)
                                + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                        unitid : param.startindex + i + 101,
                        unitname : '左侧首位单元' + (param.startindex + i + 101)
                                + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                        winfoid : param.startindex + i,
                        showword : '左侧首位关键字' + (param.startindex + i)
                                + '就看见了进我空间看我就快乐健康',
                        showqstat : 11,
                        showqscore : param.startindex%10,
                        clks : 34550 + i,
                        paysum : 145.33 + i,
                        ideacount : i,
                        bid : (i % 2 === 1) ? null : 1.5,
                        unitbid : 0.5,
                        lefttop : 31,
                        leftscreen : null,
                        matchPriceEnableStatus: 0,
                        lefthistory : [{
                                    date : 20110530,
                                    value : 20
                                }, {
                                    date : 20110630,
                                    value : 30
                                }, {
                                    date : 20110730,
                                    value : 40
                                }, {
                                    date : 20110830,
                                    value : 50
                                }]
                    });
        }
    
        data.listData = listData;
    
        rel.data = data;
    
        return rel;
    };
});