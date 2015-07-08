
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        if (typeof Requester.debug.data.expeStatus[param.entry] == 'undefined') {
            Requester.debug.data.expeStatus[param.entry] = 1;
        }
        rel.data = Requester.debug.data.expeStatus[param.entry];
        return rel;
    };
});