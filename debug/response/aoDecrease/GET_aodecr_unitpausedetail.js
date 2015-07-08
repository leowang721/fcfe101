
/**
 * 效果突降 单元暂停推广
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = new Requester.debug.returnAoWord(param), listData = [], i;
    
        for (i = param.startindex; i <= param.endindex; i++) {
            listData.push({
                        planid : i,
                        planname : '单元暂停推广<button>这个长计划' + i + '啊啊啊啊啊啊啊啊啊',
                        unitid : i,
                        unitname : '单元暂停推广<button>这个长单元' + i + '啊啊啊啊啊啊啊啊啊',
                        beginvalue : i * 1000,
                        endvalue : (i - 1) * 1000,
                        decr : 1000
                    });
        }
    
        rel.data.listData = listData;
        return rel;
    };
});