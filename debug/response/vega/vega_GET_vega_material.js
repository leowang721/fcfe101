define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {};
        for (var k in param.fields) {
            rel.data[param.fields[k]] = Math.random() * 200;
        }
        rel.data.daysconsumable = '-1';
        return rel;
    };
});