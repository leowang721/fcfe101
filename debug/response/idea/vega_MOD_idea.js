
/**
 * 添加创意
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');
    var random = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel = {
            "data" : {},
    
            "status" : 200,
    
            "errorCode" : {
                "message" : "\"\"",
                "code" : 714,
                "detail" : {
                    'title' : '手机哦耳机哦I我金额哦I我金额哦I叫我诶'
                },
                "idx" : 0
            }
        };
        
        var ideaid = param.ideaid;
        for (var i = 0, len = ideaid; i < len; ++i) {
            var id = ideaid;
            rel.data[id] = {
                "ideastat": random.number(0, 2),
                "activestat": random.number(0, 1),
                "pausestat": param.items.pausestat
            };
        }
    
        return rel;
    };
});