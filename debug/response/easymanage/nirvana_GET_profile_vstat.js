
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            vstat : "v",
            msgs : [{
                "location" : "1",
                "link" : "http://db-testing-ecom160.db01.baidu.com:8080/vchk/vlice/?userid=32",
                "title" : "真实性验证",
                "msg" : "(未验证)1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
            }, {
                "location" : "2",
                "link" : "http://db-testing-ecom160.db01.baidu.com:8080/vchk/bind/?userid=32",
                "title" : "关联",
                "msg" : "暂无消息"
            }],
            links : [{
                "location" : "3",
                "link" : "http://db-testing-ecom160.db01.baidu.com:8080/vchk/support/help",
                "title" : "客户真实性验证和关联介绍"
            }]
        };
        rel.status = 200;
        return rel;
    };
});