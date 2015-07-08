
/**
 * 转化跟踪URL进度查询回调，获取检查结果（转化跟踪工具-->全面检查-->转化跟踪URL）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = {
            progress : "done", // processing
            listData : [{
                url : 'urlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurl',
                errorMsg : 'error message'
            }, {
                url : 'url',
                errorMsg : 'error message'
            }, {
                url : 'url',
                errorMsg : 'error messageerror messageerror messageerror messageerror messageerror messageerror messageerror messageerror messageerror messageerror messageerror messageerror messageerror message'
            }]
        };
        
        return rel;
    };
});