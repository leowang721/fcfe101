/**
 * 获取转化列表
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(),
            listData = [];
        
        for (var i = 0; i < 100; i++) {
            listData[i] = {
                siteid: i,
                trans_id: "1",
                name: "2注册跟踪&lt;/<button>" + i,
                step_url: "http://www.sina.com.cn/<button>" + i,
                siteUrl: "www.baidu.com" + i,
                step_type: i % 2,
                status: i % 2
            }
        }
        
        rel.data = listData;
        
        return rel;
    };
});