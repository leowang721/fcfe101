
/**
 * 修改实验
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return Requester.debug.lab_ADD_abtest(level, param);
    };
});