
/**
 * 检查实验对象是否可用
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        //    var rel = tpl.success()
        var list = param.winfoidlist;
        var len = list.length;
        var upper = Math.floor(len / 2);
        var detail = {};
        var code = [180010, 180011, 180012];
        for (var i = 0; i < upper; i++) {
            var index = Math.floor(Math.random() * 100) % 3;
            detail[list[i]] = {
                "code": code[index]
            }
        }
        var rel = {
            "status": 300,
    
            "errorCode": {
                "code": 180028
            },
    
            "wordErrorDetail": detail
        }
    
        return rel;
    };
});