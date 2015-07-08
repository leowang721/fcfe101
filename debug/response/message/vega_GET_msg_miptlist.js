

/**
 * 获取最重要消息预览弹窗数据
 * @param {Object} level
 * @param {Object} param
 * @author zhouyu
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var getMsgItem = require('./getMsgItem');

    module.exports = function (path, param) {
        var rel = tpl.success();
        //    rel.status = 500;
        rel.data = {
            lasttime: 21212, //本次请求的系统时间
            msglist: getMsgItem(4, 3)
        };
        return rel;
    };
});