
/**
 * 获取关键词自动分组升级提醒气泡被关闭次数请求模拟
 * @author wuhuiyao@baidu.com
 * @date 20130620
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data.bubbleState = 1; // 1：显示bubble，0：不显示bubble
    
        return rel;
    };
});