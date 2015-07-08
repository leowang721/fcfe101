define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            currcount: random.int(50, 100),
            maxcount: random.int(100, 500)
        };
        return rel;
    };
});