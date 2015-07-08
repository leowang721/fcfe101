
/**
 * 第一步进入第二步时，获取第二步关键词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            token : '12334234', // 请求序列值，用以唯一标识一个请求
            wcnt : 124, // 所有词的总量。不是话术上的那个值
            industrynames : '鲜花，冰箱，啤酒' // 以逗号分隔
        }, recmwords = [];
    
        for (var i = 0; i < 2; i++) {
            recmwords.push({
                        wordid : 100 + i,
                        showword : '很长很长很长很长很长很长很长很长很长很长很长很长的关键词' + i,
                        pv : 100 + i, // 日均搜索量
                        kwc : 200 + i // 竞争激烈程度
                    });
        }
    
        data.recmwords = recmwords;
        rel.data = data;
    
        /**
         * rel = { "status": 400,
         * 
         * "errorCode": { "message": "你妹啊 你妹！", "code": 6012, "detail": null } };
         */
        return rel;
    };
});