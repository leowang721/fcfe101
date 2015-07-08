

/**
 * 获取实验中各种状态的关键词个数
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            "data": [347, 12, 23, 34, 344],//分别为 推荐实验组、推荐对照组、持续观察、 调整完成状态的物料个数
            "status": 200,
            "errorCode": null
        }
        return rel;
    };
});