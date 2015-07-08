define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel = {
            /*"data" : [{
                        "index" : 2,
                        "status" : 0,
                        "winfoid" : 126118,
                        "wordid" : 336553,
                        "showword" : "鹌鹑",
                        "bid" : null
                    }, {
                        "index" : 1,
                        "status" : 0,
                        "winfoid" : 126121,
                        "wordid" : 7924968,
                        "showword" : "巧克力豆",
                        "bid" : null
                    }],*/
             data:[1001,1002,1003],
            "status" :400,// 批量添加创意测试时将400改为200 mayue@baidu.com
    
            "errorCode" : {
                "message" : " ",
                "code" : 714,
                "detail" : {
                    'title' : 'URL主域名和注册网站不一致',
                    'desc1' : '井底蛙'
                },
                "idx" : 0
            }
        }
    
        return rel;
    };
});