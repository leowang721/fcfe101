
//单元绑定分机号
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        
        var rel = tpl.success();
        var len = 10,data = [];
        for (var i = 0; i < len; i++) {
            data[i] = {
                unitid: 12 + i,
                extbind: 5124 + i + ''
            }
        }
        rel.data = data;
        rel.status =400;
        rel.errorCode = {
            code: 1562
        };
        return rel;
    };
});