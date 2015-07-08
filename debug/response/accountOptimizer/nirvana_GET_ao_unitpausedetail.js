
/**
 * 单元暂停推广
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            status: 200,
            data: {
                signature : 'IU！%RUHA',
                aostatus : 0,
                totalnum : 120,
                returnnum :  param.endindex - param.startindex,
                timestamp : 127831067988222,
                listData : []
            }
        }, listData = [], i;

        for (i = param.startindex; i <= param.endindex; i++) {
            listData.push({
                planid : i,
                planname : '单元暂停推广<button>这个长计划' + i + '啊啊啊啊啊啊啊啊啊',
                unitid : i,
                unitname : '单元暂停推广<button>这个长单元' + i + '啊啊啊啊啊啊啊啊啊',
                paysum : 145.33,
                clks : 34552,
                isdecr : i % 2,
                beginvalue : i * 1000,
                endvalue : (i - 1) * 1000,
                decr : 1000,
                valuetype : ['shows', 'clks', 'pv'][i % 3]
            });
        }

        rel.data.listData = listData;

        return rel;
    };
});