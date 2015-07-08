
/**
 * 关键词跳出率较高详情
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel =  {
            status: 200,
            data: {
                signature : 'IU！%RUHA',
                aostatus : 0,
                totalnum : 120,
                returnnum :  param.endindex - param.startindex,
                timestamp : 127831067988222,
                listData : []
            }
        };
        var listData = [];
        for (var i = param.startindex; i <= param.endindex; i++) {
            listData.push({
                        planid : i,
                        planname : '关键词跳出率<button>这个长计划' + i + '啊啊啊啊啊啊啊啊啊',
                        unitid : i,
                        unitname : '关键词跳出率<button>这个长单元' + i + '啊啊啊啊啊啊啊啊啊',
                        winfoid : i,
                        showword : '测试' + i,
                        bouncerate : '30%',
                        matchPriceEnableStatus: 0
                    });
        }
    
        rel.data.listData = listData;
        rel.data.aostatus = 0;
        return rel;
    };
});