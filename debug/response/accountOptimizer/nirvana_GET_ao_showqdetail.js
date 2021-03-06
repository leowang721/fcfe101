
/**
 * 账户优化子项详情，关键词质量度过低无法获取稳定的左侧展现资格
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
                planname : '<button>长计划' + (param.startindex + i + 100)
                        + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                unitid : param.startindex + i + 101,
                unitname : '<button>这个长单元' + (param.startindex + i + 101)
                        + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                winfoid : param.startindex + i,
                showword : '啊a啊啊啊啊啊啊啊啊啊啊啊啊<button>关键字' + (param.startindex + i)
                        + '就看见了进我空间看我就快乐健康',
                showqstat : 11,
                showqscore : i%10,
                clks : 34550 + i,
                paysum : 145.33 + i,
                ideacount : i,
                isdecr : i % 2,
                beginvalue : i * 1000000000,
                endvalue : (i - 1) * 1000,
                decr : 1000,
                valuetype : ['shows', 'clks', 'pv'][i % 3],
                beginshowq : 13,// 期初质量度星级
                endshowq : 11
                    // 期末质量度星级
                });
        }
    
        data.listData = listData;
        // data.listData = null;
    
        rel.data = data;
    
        return rel;
    };
});