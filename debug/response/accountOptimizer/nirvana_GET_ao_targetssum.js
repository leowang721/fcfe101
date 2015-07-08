
/**
 * 获取指标的总计或平均值
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var targets = param.targets,
            len = targets.length,
            sumData = [],
            i;
    
        for (i = 0; i < len; i++) {
            sumData.push({
                target : targets[i],
                value : ['3000000', '-1', new Date().valueOf()][Math.ceil(Math.random() * 10) % 3],
                percentage : ['10%', '0%', '-1'][Math.ceil(Math.random() * 10) % 3]
            });
        }
    
        rel.data = { // 值不存在则为-1，第一项是当前值，第二项是对比值
            date : '2012-11-19',
            sumData : sumData
        };
        // 模拟数据请求延迟
        //rel.timeout = 1000;
        return rel;
    };
});