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

        // 需要保证严格递增的顺序
        function createCurveData () {
            var arr = [];
            for (var i = 0, l = 20; i < 20; i++) {
                var x = 0.1 + i * 0.1;
                x = x.toFixed(2);
                var y = 10 + i * random.int(2, 9);
                arr.push({ x: x, y: y });
            }
            return arr;
        }

        ret.data = {
            curve: {
                clk: createCurveData(),
                pay: createCurveData(),
                show: createCurveData()
            },
            // 默认返回5-6个bid升序的列表，可以不需要用到BizList
            listData: [
                {
                    bid: 1.00,
                    clk: 100,
                    pay: 200,
                    show: 200
                },
                {
                    bid: 2.00,
                    clk: 200,
                    pay: 300,
                    show: 300
                },
                {
                    bid: 3.00,
                    clk: 300,
                    pay: 400,
                    show: 400
                },
                {
                    bid: 4.00,
                    clk: 400,
                    pay: 500,
                    show: 500
                },
                {
                    bid: 5.00,
                    clk: 500,
                    pay: 600,
                    show: 600
                }
            ],
            bid: 1.00
        };
        return ret;
    };
});