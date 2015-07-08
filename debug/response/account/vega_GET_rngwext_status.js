define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // 获取状态
        var rel = tpl.success();
    
        // data为1表示开启，0表示未开启
        rel.data = 1;
    
        return rel;
    
    };
});