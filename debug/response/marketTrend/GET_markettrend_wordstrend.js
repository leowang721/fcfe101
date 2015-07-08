
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = {
            topWords : [{
                        id : 1,
                        word : '关键词1',
                        value : 10009
                    }, {
                        id : 2,
                        word : '关键词2',
                        value : 2000
                    }, {
                        id : 3,
                        word : '关键词3',
                        value : 1000
                    }, {
                        id : 4,
                        word : '关键词4',
                        value : 10006
                    }, {
                        id : 5,
                        word : '关键词5',
                        value : 10005
                    }, {
                        id : 6,
                        word : '关键词6',
                        value : 2004
                    }, {
                        id : 7,
                        word : '关键词7',
                        value : 10003
                    }, {
                        id : 8,
                        word : '关键词8',
                        value : 6002
                    }, {
                        id : 9,
                        word : '关键词9',
                        value : 9001
                    }, {
                        id : 10,
                        word : '关键词10',
                        value : 10000
                    }, {
                        id : 11,
                        word : '关键词6',
                        value : 7004
                    }, {
                        id : 12,
                        word : '关键词7',
                        value : 10003
                    }, {
                        id : 13,
                        word : '关键词8',
                        value : 5002
                    }, {
                        id : 14,
                        word : '关键词9',
                        value : 4001
                    }, {
                        id : 15,
                        word : '关键词10',
                        value : 3000
                    }],
            explosiveWords : [{
                        id : 16,
                        word : '我是关键词1111111111111111111',
                        value : 10009,
                        upRate : 0.9955
                    }, {
                        id : 17,
                        word : '我是关键词1222222222222222222',
                        value : 10008,
                        upRate : 0.9955
                    }, {
                        id : 18,
                        word : '关键词1',
                        value : 10007,
                        upRate : 0.9955
                    }, {
                        id : 19,
                        word : '我是关键词14',
                        value : 10006,
                        upRate : 0.9955
                    }, {
                        id : 20,
                        word : '我是关键词15',
                        value : 10005,
                        upRate : 0.9955
                    }, {
                        id : 21,
                        word : '我是关键词16',
                        value : 10004,
                        upRate : 0.9955
                    }, {
                        id : 22,
                        word : '我是关键词17',
                        value : 10003,
                        upRate : 0.9955
                    }, {
                        id : 23,
                        word : '我是关键词18',
                        value : 10002,
                        upRate : 0.9955
                    }, {
                        id : 24,
                        word : '我是关键词19',
                        value : 10001,
                        upRate : 0.9955
                    }, {
                        id : 25,
                        word : '我是关键词20',
                        value : 10,
                        upRate : 0.9955
                    }, {
                        id : 26,
                        word : '我是关键词19',
                        value : 10001,
                        upRate : 0.9955
                    }, {
                        id : 27,
                        word : '我是关键词20',
                        value : 10,
                        upRate : 0.9955
                    }]
        };
    
        return rel;
    };
});