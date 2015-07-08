
/**
 * 推左次数或排名下降详情
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = new Requester.debug.returnAoWord(param), listData = [];
        for (var i = param.startindex; i <= param.endindex; i++) {
            listData.push({
                        winfoid : i,
                        showword : '测试啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊' + i,
                        planid : i,
                        planname : '单元暂停推广<button>这个长计划' + i + '啊啊啊啊啊啊啊啊啊',
                        unitid : i,
                        unitname : '单元暂停推广<button>这个长单元' + i + '啊啊啊啊啊啊啊啊啊',
                        rankingdecr : Math.round(Math.random() * 10) + '.'
                                + Math.round(Math.random() * 10),
                        beginvalue : i * 1000,
                        endvalue : (i - 1) * 1000,
                        decr : 1000,
                        showqstat : [21, 20, 30][Math.round(Math.random() * 100)
                                % 3],
                        beginshowrate : Math.round(Math.random() * 100),
                        endshowrate : Math.round(Math.random() * 100),
                        bid : i + 1
                    });
        };
        rel.data.listData = listData;
    
        return rel;
    };
});