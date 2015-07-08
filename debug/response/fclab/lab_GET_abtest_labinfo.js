
/**
 * 获取一个实验的数据信息
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return Requester.debug.lab_GET_abtest_list(level, param, 1);
    };
});