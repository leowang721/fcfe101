
/**
 * 关键词待激活
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var listData = [];
        for (var i = param.startindex; i <= param.endindex; i++) {
            listData.push({
                        planid : i,
                        planname : '关键词待激活<button>这个长计划' + i + '啊啊啊啊啊啊啊啊啊',
                        unitid : i,
                        unitname : '关键词待激活<button>这个长单元' + i + '啊啊啊啊啊啊啊啊啊',
                        winfoid : i,
                        showword : '测试' + i,
                        paysum : 145.33,
                        clks : 34552,
                        bid : (i % 2 === 1) ? null : 1.5,
                        unitbid : 0.5,
                        matchPriceEnableStatus: 0
                    });
        }
    
        rel.data.listData = listData;
        rel.data.aostatus = 0;
        return rel;
    };
});