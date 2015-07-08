
/**
 * 请求网站列表（转化跟踪工具-->网站列表）
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
                site_url: "www.baidu.com/<button>" + i,
                transNum: Math.round(Math.random() * 100),
                status: i % 2,
                phoneTrackStatus: (i + 1) % 2
            };
        }
        rel.data = listData;
        return rel;
    };
});