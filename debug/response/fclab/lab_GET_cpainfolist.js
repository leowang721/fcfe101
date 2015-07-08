
/**
 * 获取cpa计划列表
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            data: {
                total: 43,
                cpalist: []
            },
            status: 200,
            errorCode: null
        };
        // 构造 data.cpalist，返回
        for (var i = 0, len = 10; i < len; i++) {
            rel.data.cpalist.push({
                labid: i + 1,
                planname: '<span>09~!@#.,<>\';][[</spa,<>\';][[</s,<>\';][[</sn>[]',
                type: [1, 2, 4, 8, 16][(5 * Math.random() | 0)],
                cpa: [null, 21.23 * (i + 1) / 2][(2 * Math.random() | 0)],
                isab: (2 * Math.random() | 0),
                addtime: '2013-01-' + (i * 2) + ' 18:00',
                //planstatus: (4 * Math.random() | 0),
                planstatus: Math.random() > 0.5 ?
                    [0.9 + 5 * Math.random() | 0, 1] : [0],
                cpastatus: Math.random() > 0.5
                    ? [0.5 + 2 * Math.random() | 0] : [0],
                //cpastatus: [1, 2],
                // 最小cpa
                mincpa: 13.33 + i,
                riskcpa: 28.55 + i,
                // 建议cpa
                suggestcpa: 30.12 + i
            });
        }
        return rel;
    };
});