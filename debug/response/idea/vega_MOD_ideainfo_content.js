
/**
 * 修改创意
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return require('./MOD_idea')(path, param);
    };
});