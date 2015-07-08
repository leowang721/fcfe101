
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.status = 200;
        rel.data = {};
        var pid;
        var pausestat = param.items.pausestat;
        var wordstat = param.items.pausestat == 0 ? 0 : 2;
        for (var i = 0, l = param.winfoid.length; i < l; i++) {
            pid = param.winfoid[i];
            rel.data[pid] = {
                "winfoid" : pid,
                "pausestat" : pausestat,
                "wordstat" : wordstat
            }
        }
        // }
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    
    };
});