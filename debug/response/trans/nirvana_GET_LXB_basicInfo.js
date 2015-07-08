
//获取400电话及今日消费
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            phone:"400-800-8888",
            lxbtodaypaysum: 5896321
        };
        //rel.status = 500;
        return rel;
    };
});