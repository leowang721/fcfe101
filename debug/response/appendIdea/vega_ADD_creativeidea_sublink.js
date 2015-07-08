
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
       var rel = tpl.success();
       // rel = {"status":400,"data":null,"errorCode":{"code":20714,"message":"","detail":{"URL":"URL主域名和注册网站不一致"},"idx":0}}
        rel.data = ['1001','1002'];
        rel.status = 200;
        rel.errorCode = {code:20711};
        return rel;
    };
});