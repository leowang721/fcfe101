/**
 * Created by liuxuechao on 14-4-2.
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            data: [5,5,10,10,20,15,15,0,0,20],
            aostatus: 0,
            winfoid: null,
            type: null
        };
        return rel;
    };
});