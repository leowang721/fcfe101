
/**
 * 获取跟踪方式（转化跟踪工具-->跟踪方式设置链接）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            trackType : 0, //0:url,1:cookie,2:不跟踪，-1:用户未进行设置，-2:不可设置，在首次推广URL检查完成前，用户不可设置
            cookieAuth : true //true or false
        };
        return rel;
    };
});