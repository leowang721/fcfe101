define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            61 : 1,
            62 : 1,
            63 : 1
        };
        return rel;
    };
});