
/**
 * 新户迭代一，更多关键词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            token : param.token,
            wcnt : 100,
            recmwords : []
        };
        for (var i = param.startindex, l = param.startindex + 100; i < l; i++) {
            rel.data.recmwords.push({
                        wordid : 10000 + i,
                        showword : '扩展关键词' + i + '极为恶疾哦方季惟额哦ijfiosjdoifjwkle',
                        pv : 15000 + i,
                        kwc : (10 + i) % 100
                    });
        }
        rel.status = 300;
    
        return rel;
    };
});