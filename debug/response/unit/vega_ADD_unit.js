define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {
            unitid : 112,
            planid: 1
        }
        return rel;
    };
});