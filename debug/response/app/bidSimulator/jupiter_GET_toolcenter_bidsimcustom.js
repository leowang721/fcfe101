/**
 * @file 模拟器-曲线规则和表格
 * @author Guangyao Tang(tangguangyao@baidu.com)
 */

define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');

    module.exports = function (path, params) {
        var ret = tpl.success();
        
        // 方便状态之间的切换
        // var ret = tpl.fail(300);
        
        ret.data = {
            customBid: random.float(0, 10, 2),
            clk: 11,
            pay: 2222,
            show: 333
        };
        
        return ret;
    };
});