
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var data = [];
        for (var i = 0; i < 6; i++) {
            var list = {
                'mcid': '123' + i,
                'iconurl': 'http:baidu,com/',
                'detailsurl': 'http:baidu,com/',
                'version': '1.1.' + i,
                'platform': 0,
                'downurl': 'wwww.www.',
                'appname': 'app name app name' + i,
                'creativeid':[1,2,3]
            };
            data.push(list);
        }
        rel.data = data;
        rel.status = 200;
        return rel;
    };
});