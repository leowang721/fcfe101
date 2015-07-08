/**
 * 第二阶段之后获取详情信息，包括预算、地域以及时段
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.data = {
            wregion : '',
            plancyc : '[]',
            bgttype : 1,
            budget : 100,
            tasktype : 1
        };
        var len = 4;
        for (var i = 1; i < len; i++) {
            if (i != 6) {
                rel.data.wregion += i + (i == len - 1 ? '' : ',');
            }
        }
        /*
         * rel.errorCode={ "message": "你妹啊 你妹！", "code": 6012, "detail": null }
         */
        return rel;
    };
});