
/**
 * 获取用户突降日期及类型
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), time = new Date(), data = {
            begindate : baidu.date.format(new Date(time.valueOf() - 24 * 60 * 60
                            * 1000), 'yyyy-MM-dd'),
            enddate : baidu.date.format(time, 'yyyy-MM-dd'),
            type : 1
            // 0表示节假日，1表示工作日
        };
    
        rel.data = data;
    
        return rel;
    };
});