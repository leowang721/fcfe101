
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // console.log('GET_kr_recycle_num' + param);
        var rel = tpl.success();
        rel.data = 299;
        return rel;
    };
});