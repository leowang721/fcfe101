/**
 * 添加关键词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [
            {
                "index": 0,
                "winfoid": 9115460252,
                "wordid": 42617937,
                "bid": null,
                "status": null,
                "showword": "asdfasf"
            }
        ];
        return rel;
    };
});