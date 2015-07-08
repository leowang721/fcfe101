/**
 * @file 动态创意汇总信息
 * @author Feixiang Yuan(yuanfeixiang@baidu.com)
 * @date 2014-09-25
 */
 define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            sum: {}
        };
        for (var i in param.fields) {
            var f = param.fields[i];
            var value;
            switch (f) {
                case 'clks': 
                    value = random.int(0, 1000000);
                    break;
                default: 
                    value = random.float(0, 1);
                    break;
            }
            rel.data.sum[f] = value;
        }
        return rel;
    };
 });