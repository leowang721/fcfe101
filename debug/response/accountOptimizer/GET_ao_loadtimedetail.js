
/**
 * 连通速度较慢详情
 * 
 * @param {Object}
 *            param
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
    
        for (i = param.startindex; i < param.endindex; i++) {
            listData.push({
                planid : i,
                planname : '<button>这个长计划' + i + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                unitid : i,
                unitname : '<button>这个长单元' + i + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                slowurl : 'http://www.www.chingllaldfja.com.com.com/adfc/aljfa/actxdskfkdsflskjfldsfsf;lskf;sf'
                        + i,
                loadtime : i,
                isdecr : i % 2,
                beginvalue : i * 1000,
                endvalue : (i - 1) * 1000,
                decr : 1000,
                valuetype : ['shows', 'clks', 'pv'][i % 3]
            });
        }
    
        data.listData = listData;
    
        rel.data = data;
    
        return rel;
    };
});