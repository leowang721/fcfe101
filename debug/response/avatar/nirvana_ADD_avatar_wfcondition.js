
/**
 * 添加快捷方式
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();

        // 快捷筛选条件达到上限
        // rel.status = '400';
        // rel.errorCode = {};
        // rel.errorCode.code = 2860;
        // return rel;
    
        // 快捷筛选条件重名
        rel.status = '400';
        rel.errorCode = {};
        rel.errorCode.code = 2861;
        return rel;

        return rel;
    };
});