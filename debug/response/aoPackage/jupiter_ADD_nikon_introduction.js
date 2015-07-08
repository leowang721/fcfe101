/**
 * 模拟通知后端已经展现过的引导页信息
 * @author wuhuiyao (wuhuiyao@baidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var id = param.id;
    
        var introArr = Requester.debug.data.intro;
        var introItem;
        for (var i = introArr.length; i --;) {
            introItem = introArr[i];
            if (introItem.id == id) {
                introArr.splice(i, 1);
                break;
            }
        }
        //    rel.status = 400;
        //    rel.timeout = 1500;
        return rel;
    };
});