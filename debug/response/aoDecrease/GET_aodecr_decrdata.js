
/**
 * 获取效果突降折线图数据
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), listData = [], starttime = baidu.date
                .parse(param.starttime);
    
        for (var i = 0; i < 9; i++) {
            listData.push({
                        // time代表日期，value代表该日突降指标值
                        time : baidu.date.format(starttime, 'yyyy-MM-dd'),
                        value : 2000 * Math.random()
                    });
    
            starttime.setDate(starttime.getDate() + 1);
        }
    
        rel.data.listData = listData;
    
        return rel;
    };
});