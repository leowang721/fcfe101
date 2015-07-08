
/******************新版突降急救包*******************************/

/**
 * 模拟突降急救包升级版获取突降阈值的数据接口
 * @author wuhuiyao (wuhuiyao@baidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            type: 'clks',
            value : Math.ceil(Math.random() * 99 + 1)// 阈值。取值(0,100]，整数
        };
    
        rel.data = data;
    
        // rel.timeout = 1500;
        return rel;
    };
});