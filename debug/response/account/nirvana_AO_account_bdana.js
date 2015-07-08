/**
 * 账户预算分析
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = [
            3, // status
            20, // advice
            700, // lostclick
            ["67.5|55.11", "66.5|55.11", "67|55.11", "72|58.32", "75.5|60.43",
                "97|70.97", "116|77.96", "116.8|78.15", "120.3|78.57",
                "173.1|78.57", "120.3|78.57"]];
        return rel;
    };
});