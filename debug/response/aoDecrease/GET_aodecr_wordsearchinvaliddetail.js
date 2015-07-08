
/**
 * 效果突降 关键词部分
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return new Requester.debug.returnDecrWord(param);
    };
});