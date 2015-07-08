
/**
 * 创意待激活
 * 
 * @param level
 * @param param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            signature : 'IU！%RUHA', // 签名，用于记录一组condition状态
            aostatus : 0, // 请求状态，0-处理正常，1-请求格式错误，2-系统内部错误，3-任务队列已满，请重试，4-需要更详细的请求数据，不只是签名
            totalnum : 1400, // 结果的总条数
            returnnum : 5, // 本次返回的条数
            timestamp : 127831067988222, // 任务完成的时间戳
            listData : []
        }, listData = [], i;
        for (i = 0; i < data.returnnum; i++) {
            listData.push({
                        planid : param.startindex + i + 100,
                        planname : '创意待激活计划' + (param.startindex + i + 100)
                                + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                        unitid : param.startindex + i + 101,
                        unitname : '创意待激活单元' + (param.startindex + i + 101)
                                + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                        ideaid : param.startindex + i + 100,
                        idea : 'idea' + (param.startindex + i + 100),
                        title : 'title' + (param.startindex + i + 100),
                        desc1 : 'desc1' + (param.startindex + i + 100),
                        desc2 : 'desc2' + (param.startindex + i + 100),
                        url : 'url' + (param.startindex + i + 100),
                        showurl : 'showurl' + (param.startindex + i + 100),
                        ideastat : i % 5 == 3 ? 5 : i % 5,
                        shadow_ideaid : param.startindex + i + 200,
                        shadow_title : 'shadow_title'
                                + (param.startindex + i + 200),
                        shadow_desc1 : 'shadow_desc1'
                                + (param.startindex + i + 200),
                        shadow_desc2 : 'shadow_desc2'
                                + (param.startindex + i + 200),
                        shadow_url : 'shadow_url' + (param.startindex + i + 200),
                        shadow_showurl : 'shadow_showurl'
                                + (param.startindex + i + 200),
                        shadow_ideastat : (i + 1) % 5 == 3 ? 5 : (i + 1) % 5,
    
                        clks : 34550 + i,
                        paysum : 145.33 + i
                    });
        }
    
        data.listData = listData;
    
        rel.data = data;
    
        return rel;
    };
});