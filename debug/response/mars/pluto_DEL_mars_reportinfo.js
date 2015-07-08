
/**
 * 删除报告
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
        var rel = tpl.success(), data = false;
    
        if (Math.random() > 0.5) {
            data = true;
        }
    
        rel.data = data;
        rel.error = {};
    
        return rel;
    };
});