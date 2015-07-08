

/**
 * 添加反馈建议
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    //    var rel = tpl.success();
        var rel = {
            'status': 400,
    
            'errorCode': {
                'code': 180000
            }
        }
    
        return rel;
    };
});