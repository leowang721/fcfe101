
/**
 * 修改账户
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.error = {
            '333333': {
                weekbudget: {
                    code: 401, // 316周预算过小，317周预算过大，318周预算低于上周消费，319周预算降低
                    detail: null,
                    idx: 0,
                    message: "[0.0,7,142.86]"
                }
            }
        };
        if ('undefined' != typeof param.items.wbudget) {
            rel.status = 200;
            rel.error = {
                '333333': {
                    wbudget: {
                        code: 401
                    }
                }
            };
        }
        if (param.alertLevel == 1) {
            rel.error = {};
            rel.status = 200;
        }
        rel.data = {};
        return rel;
    };
});