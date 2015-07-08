/**
 * 添加关键词到不同单元 ADD/keyword/diffunit
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel = {
            "data" : [{
                        "index" : 0,
                        "status" : 0,
                        "winfoid" : 126118,
                        "wordid" : 336553,
                        "showword" : "鹌鹑",
                        "bid" : null
                    }, {
                        "index" : 1,
                        "status" : 0,
                        "winfoid" : 126121,
                        "wordid" : 7924968,
                        "showword" : "巧克力豆",
                        "bid" : null
                    }],
    
            "status" : 300,
    
            "error" : [{
                        "message" : "关键字中触犯黑名单规则  ",
                        "code" : 643,
                        "detail" : null,
                        "idx" : 0
                    }, {
                        "message" : "关键字触犯黑名单规则 法轮功",
                        "code" : 635,
                        "detail" : null,
                        "idx" : 3
                    }]
        }
    
        rel.status = 200;
        rel.error = [];
    
        return rel;
    };
});