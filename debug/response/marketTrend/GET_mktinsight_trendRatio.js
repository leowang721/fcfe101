
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data={
            myRatio: [
                10.11,
                100*Math.random()
            ],
            otherRatio: null,
            industryRatio: [
                0 - Math.random(),
                null,
                0 - Math.random()
            ]
        };
        
        return rel;
    };
});