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
                winfoid : param.startindex + i,
                showword : '2星<button>关键字' + (param.startindex + i)
                        + '就看见了进我空间看我就快乐健康',
                unitid : param.startindex + i + 101,
                unitname : '<button>单元2星' + (param.startindex + i + 101)
                        + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                showqstat : 11,
                planid : param.startindex + i + 100,
                planname : '<button>计划2星' + (param.startindex + i + 100)
                        + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                beginvalue : i * 1000000000,
                endvalue : (i - 1) * 1000,
                decr : 1000,
                valuetype : ['shows', 'clks', 'pv'][i % 3],
                beginshowq : 13,// 期初质量度星级
                endshowq : 12
                    // 期末质量度星级
                });
        }
    
        data.listData = listData;
    
        rel.data = data;
    
        return rel;
    
    };
});