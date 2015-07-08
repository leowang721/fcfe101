
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // console.log('ADD_kr_recycle' + param);
        var rel = tpl.success();
        rel.data = 1;
        return rel;
    };
});