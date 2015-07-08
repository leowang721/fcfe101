// 获取创意对应的优选关键词接口
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            listData : [{
                        winfoid : 1,
                        showword : "参考词1"
                    }, {
                        winfoid : 2,
                        showword : "参考词2"
                    }]
        }
        return rel;
    
    };
});