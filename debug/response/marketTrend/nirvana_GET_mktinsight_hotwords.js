
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 500;
        rel.errorCode = {
            code: 10002
        };
        rel.data = [{
                        id : 1,
                        word : '关键词1单独的得到',
                        value : 20009,
                        upRate : 0.9955
                    }, {
                        id : 2,
                        word : '关键哦哦鹅鹅鹅词2',
                        value : 30008,
                        upRate : 0.9955
                    }, {
                        id : 3,
                        word : '关键ds都神神叨叨词3',
                        value : 50007,
                        upRate : -0.2155
                    }, {
                        id : 4,
                        word : '关键词4',
                        value : 90006,
                        upRate : -0.1955
                    }, {
                        id : 5,
                        word : '关键词5',
                        value : 10005,
                        upRate : 0.2955
                    },{
                        id : 6,
                        word : '关键词的得到',
                        value : 20009,
                        upRate : 0.9955
                    }, {
                        id : 7,
                        word : '关键哦鹅鹅词2',
                        value : 30008,
                        upRate : 0.9955
                    }, {
                        id : 11,
                        word : '关键ds都神神叨叨词3',
                        value : 50007,
                        upRate : -0.2155
                    }, {
                        id : 23,
                        word : '关键4',
                        value : 90006,
                        upRate : -0.1955
                    }, {
                        id : 10,
                        word : '关键10',
                        value : 10005,
                        upRate : 0.2955
                    }, {
                        id : 33,
                        word : '关键41',
                        value : 90006,
                        upRate : -0.1955
                    }, {
                        id : 40,
                        word : '关键120',
                        value : 10005,
                        upRate : 0.2955
                    }];
        return rel;
    };
});