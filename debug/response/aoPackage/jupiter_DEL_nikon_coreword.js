
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            aostatus : 0,
            errorcodes : 0,
            errorcorewords : []
        };
        rel.status = 200;
        // rel.timeout = 1000;
        return rel;
    };
});