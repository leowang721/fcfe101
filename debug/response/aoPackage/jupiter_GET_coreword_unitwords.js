

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var currsize = Math.ceil(Math.random() * 30);
        rel.data = {
            currcount: currsize,
            maxcount: 50,
            keywords: []
        };
        for (var i = 0; i < currsize; i++) {
            rel.data.keywords.push({
                winfoid: 1000 + i,
                showword: '单元的词儿' + i + '需要很长很长很长很长很长很长很长很长',
                planid: i,
                planname: '单元计划' + i + '需要很长很长很长很长很长很长很长很长',
                unitid: i,
                unitname: '单元单元' + i + '需要很长很长很长很长很长很长很长很长',
                showqscore: i % 10,
                blockreason: 1,
                pageexp: 1,
                confidence: 1,
                deviceprefer: 1,
                
                recentpay: Math.floor(Math.random() * 1000),
                recentopt: '不知道',
                peers: Math.floor(Math.random() * 1000)
    
            });
        }
        rel.timeout = 3000;
        return rel;
    };
});