/**
 * 获取用户是否是突降账户
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            isdecr : kslftestdata
            // 0表示不是突降账户，1表示是突降账户
        };
    
        rel.data = data;
    
        return rel;
    };
});