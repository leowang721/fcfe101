
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.data = {};
        var uid;
        var state = param.items.pausestat;
        for (var i = 0, l = param.unitid.length; i < l; i++) {
            uid = param.unitid[i];
            rel.data[uid] = {
                "unitid" : uid,
                "pausestat" : state,
                "planstat" : state
            }
        }
        rel.timeout = 1500;
        return rel;
    };
});