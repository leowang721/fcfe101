define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [];
        var obj = {};
        for (var n = 0; n < 105; n++) {
            obj[n] = Math.random() + 1;
        }
        rel.data.push(obj);
        return rel;
    };
});