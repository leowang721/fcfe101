define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [];
        for (var i = 0, l = param.keywords.length; i < l; i++) {
            rel.data.push({
                        keyword : param.keywords[i],
                        status : '0',
                        rank_low : 5,
                        rank_high : 1,
                        dayclk_low : 123,
                        dayclk_high : 1234,
                        daypv_level : '1',
                        showbar_length : 50
                    });
        }
    
        /*
         * 
         * rel = { "data": null, "status": 400, "errorCode": { "message":
         * "法轮功--关键字触犯黑名单规则 法轮功", "code": 0, "idx": 0, "detail": null } };
         */
    
        return rel;
    
    };
});