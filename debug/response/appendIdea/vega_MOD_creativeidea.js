
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel = {
            "data": [{
                "index": 2,
                "status": 0,
                "winfoid": 126118,
                "wordid": 336553,
                "showword": "鹌鹑",
                "bid": null
            }, {
                "index": 1,
                "status": 0,
                "winfoid": 126121,
                "wordid": 7924968,
                "showword": "巧克力豆",
                "bid": null
            }],
            
            "status": 200,
            
            "errorCode": {
                "message": "",
                "code": 714,
                "detail": {
                    'title' : '时间的交往多久我'
                },
                "idx": 0
            }
        }
    
        return rel;
    };
});