
/**
 * 检查单一url（转化跟踪工具-->全面检查-->转化跟踪URL）
 */        
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
         var rel = tpl.success();
         rel.data = true;
         rel = {
             status : 400,
            data : '',
            errorCode : {
                message : '错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息'
            }
         };
         // 模拟数据请求延迟
         rel.timeout = 1000;
         return rel; 
    };
});