define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            data: {},
            status: 200,
            errorCode: null
        };
        // 计划总数
        rel.data.total = 26;
        rel.data.cpahistorylist = [];
        rel.data.cpalist = [];
        // 生成cpahistorylist
        for (var i = 0; i < 26; i++) {
            rel.data.cpahistorylist.push({
                planname: String.fromCharCode(i + 65)
                    + ' 计划名称cpaname<span>!@#$%$^*(,./\'sa',
                opttime: '2013-01-18 18:00:' + ( 10 + i),
                optname: Math.random() > 0.5 ? '诸葛亮' : '刘备',
                opttypeid: Math.random() > 0.5 ? 82 : 86,
                oldvalue: 333,
                newvalue: null
            });
            rel.data.cpalist.push({
                planname: (0 | i * Math.random())
                    + '计划名称cpaname<span>!@#$%$^*(,./\'sa',
                addtime: '2013-01-18 18:00',
                deltime: '2013-01-18 18:00'
            });
        }
    };
    };
});