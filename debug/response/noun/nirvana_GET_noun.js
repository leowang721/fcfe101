define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = '<em>' + param.word + '</em>就是巴巴~~~';
        rel.timeout = 1000;
        return rel;
    };
});