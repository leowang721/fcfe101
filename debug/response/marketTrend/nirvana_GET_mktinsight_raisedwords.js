
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
                        word : '关键词1',
                        value : 20009,
                        upRate : 0//注意，这个upRate取值为0/1分别表示“已购买”和“建议购买”
                    }, {
                        id : 2,
                        word : '关键词了谁离了谁了劳斯莱斯',
                        value : 30008,
                        upRate : 1
                    }, {
                        id : 3,
                        word : '关键词33卡后婚都结了',
                        value : 50007,
                        upRate : 0
                    }, {
                        id : 4,
                        word : '关键',
                        value : 90006,
                        upRate : 0
                    }, {
                        id : 5,
                        word : '关键词5嗯嗯我去嗯嗯',
                        value : 50005,
                        upRate : 1
                    }];
        return rel;
    };
});