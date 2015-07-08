
/**
 * 获取小流量列表
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            data: [],
            sum: {
                abs: 12 // 小流量报告总数
            },
            status: 200,
            errorCode: null
        };
        // 生成data数据
        for (var i = 1; i <= 5; i++) {
            rel.data.push({
                planname: (40 * Math.random() | 0)
                    + '名字小流量-小流量<span>~@34&&%[' + i,
                type: [1, 2, 4, 16][(4 * Math.random() | 0)],
                time: '2013-01-18 至 2013-01-28',
                trans: 130,
                pay: 712.21,
                avgtrans: 4.11,
                transrate: '42.12%',
    
                otrans: 130,
                opay: 712.21,
                oavgtrans: 4.11,
                otransrate: '42.12%'
            });
        }
        // rel.data = [];
        return rel;
    };
});