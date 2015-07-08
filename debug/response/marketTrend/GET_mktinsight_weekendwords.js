
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [{
                        id : 1,
                        word : '关键词1',
                        value : 20009,
                        upRate: 29
                    }, {
                        id : 2,
                        word : '关键词多多少少是2',
                        value : 30008,
                        upRate: 21
                    }, {
                        id : 3,
                        word : '关键词32233顶多算是',
                        value : 50007,
                        upRate: 20
                    }, {
                        id : 4,
                        word : '关键词ss',
                        value : 90006,
                        upRate: 22
                    }, {
                        id : 5,
                        word : '关键词5',
                        value : 40005,
                        upRate: 11
                    }];
        return rel;
    };
});