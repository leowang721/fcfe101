
/**
 * 获取大筛子阀值
 * 
 * @author linzhifneg@baidu.com GET/avatar/wfthreshold
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {
            listData : [{
                        thdtype : 1,
                        highthreshold : 250,
                        lowthreshold : 250
                    },// 展现
                    {
                        thdtype : 2,
                        highthreshold : 120,
                        lowthreshold : 120
                    },// 点击
                    {
                        thdtype : 3,
                        highthreshold : 30,
                        lowthreshold : 30
                    },// 消费
                    {
                        thdtype : 4,
                        highthreshold : 320,
                        lowthreshold : 320
                    },// 平均点击价格
                    {
                        thdtype : 5,
                        highthreshold : 0.99,
                        lowthreshold : 0.01
                    },// 点击率
                    {
                        thdtype : 6,
                        highthreshold : 0.95,
                        lowthreshold : 0.05
                    },// 左侧展现概率
                    {
                        thdtype : 7,
                        highthreshold : 10000,
                        lowthreshold : 100
                    } // 操作
            ]
        }
    
        return rel;
    };
});