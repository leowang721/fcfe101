
/*****以下是2.0版本的接口*****/
/**
 * 请求市场风向标首页数据
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var now = new Date();
        rel.data = {
            id: 15,
            hotBegin: now.getTime() + 5*24*3600*1000,
            hotEnd: now.getTime() + 43*24*3600*1000,
            name: '旅游及票务>旅游>云南西双版纳旅游哈哈',
            ratio: 0.1701,
            myShow: 0.0012,
            myShowLastWeek: 0.0021,
            averageShow: 0.0032,
            averageShowLastWeek: 0.0038
        }
        // rel.data = null;
        // rel.status = 500;
        return rel;
    };
});