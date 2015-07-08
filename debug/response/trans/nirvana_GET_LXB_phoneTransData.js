//获取电话转化数据
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var len = 100,data = [];
        for (var i = 0; i < len; i++) {
            data[i] = {
                'planid': 100 + i,
                'planname': "计划离线宝的" + i,
                'unitid': 200 + i,
                'unitname': "单元县里报的" + i,
                'callcnt': 500 + i, //呼叫次数
                'connectcnt': 300 + i, //接通次数
                'missedcnt': 100 + i, //漏接次数
                'avgcalltime': "00:01:02" //平均通话时长
            }
        }
        rel.data = data;
        return rel;
    };
});