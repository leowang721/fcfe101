

/**
 * 检测实验名称
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    //    var rel = tpl.success()
        var rel = {
            "status": 200,
    
            "errorCode": {
                "code": 180020
            }
        }
    //    rel.status = (Math.floor((Math.random()*100))%2 + 1) * 200;
    //    console.log(rel);
        return rel;
    };
});