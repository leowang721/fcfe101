define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            experiment: 1  // 1为同意参加，2为拒绝参加
        };
        // rel.status = 400;
        rel.error = {
            code: 1231,
            message: '无二无二沃尔沃'
        };
    };
    };
});