define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            yAverageShare : 0.08,
            lAverageShare : 0.07,
            yLeftShare : 0.10,
            lLeftShare : 1.00
        }
        return rel;
    };
});