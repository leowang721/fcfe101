
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        Requester.debug.data.expeStatus[param.entry] = param.value;
        return rel;
    };
});