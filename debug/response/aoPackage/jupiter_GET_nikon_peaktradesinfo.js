/*********** 行业旺季包新增接口 *****************/
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.data = {
            aostatus: 0,
            desc: {
                beforepeaknum: 3,
                inpeaknum: 2,
                afterpeaknum: 1
            }
        };
    
        var tradeList = [
            '西藏旅游abctest旅游啦啦啦啦啦史蒂芬斯拉夫<input />test',
            '广西旅游',
            '非洲5国游',
            '尼泊尔旅游尼泊尔旅游尼泊尔旅游尼泊尔旅游尼泊尔旅游',
            '云南旅游'
        ];
        var listData = [];
        rel.data.listData = listData;
        for (var i = 0; i < 5; i ++) {
            listData[i] = {
                tradeid: i + 100,
                tradename: tradeList[i],
                tradetype: 1 + i % 3
            };
        }
        // rel.timeout = 1000;
        return rel;
    };
});