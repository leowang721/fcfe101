
/**
 * 通知任务被取消（用户进行了“放弃方案”的描述） return data 0 新账户，1 老账户
 * 
 * @author wanghuijun@baidu.com
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var kslfData = storage.get('kslfData');
    if (kslfData === undefined) {
        kslfData = 0;
        storage.set('kslfData', 0);
    }
    
    module.exports = function (path, param) {
        var rel = tpl.success();
        kslfData = 0;
    
        return rel;
    };
});