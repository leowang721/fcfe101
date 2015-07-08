
/**
 * 查询开放域名列表请求
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = ['baidu.com','163.com','sina.com','ok.com','google.com'];
        
        return rel;
    };
});