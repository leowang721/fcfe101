
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.data.isAsyncTask = 0;
/*        rel.status = 400;
        rel.errorCode = {};
        rel.errorCode.code = 442;*/
        rel.timeout = 1000;
        return rel;
    };
});