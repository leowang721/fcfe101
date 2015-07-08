
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        // rel.timeout = 3000;
        // return rel;
    
        var toAddSize = Math.ceil(Math.random() * 30);
        var toDelSize = Math.ceil(Math.random() * 30);
        rel.data = {
            currcount: Math.ceil(Math.random() * 40),
            maxcount: 50,
            recmaddwords: [],
            recmdelwords: []
        };
        for (var i = 0; i < toAddSize; i++) {
            rel.data.recmaddwords.push({
                winfoid: 1000 + i,
                showword: '添加的词儿' + i + '需要很长很长很长很长很长很长很长很长',
                planid: i,
                planname: '添加计划' + i + '需要很长很长很长很长很长很长很长很长',
                unitid: i,
                unitname: '添加单元' + i + '需要很长很长很长很长很长很长很长很长',
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
    
        for (var i = 0; i < toDelSize; i++) {
            rel.data.recmdelwords.push({
                winfoid: 1000 + i,
                showword: '删除的词儿' + i + '需要很长很长很长很长很长很长很长很长',
                planid: i,
                planname: '删除计划' + i + '需要很长很长很长很长很长很长很长很长',
                unitid: i,
                unitname: '删除单元' + i + '需要很长很长很长很长很长很长很长很长',
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
    
        return rel;
    };
});