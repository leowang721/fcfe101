
/**
 * 获取最新三个循环报告
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = [];
    
        for (var i = 0; i < 3; i++) {
            data.push({
                        fileid : '1239' + i,
                        filename : '2010-09-01至2010-09-30 关报告名称<button>&@^%#$_' + i,
                        isdel : (i % 2 == 1) ? 0 : 1
                    });
        }
    
        rel.data = data;
        rel.error = {};
    
        return rel;
    };
});