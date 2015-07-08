
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            activity : [{
                        href : 'http://www.baidu.com',
                        desc : '111sdddddddddddddddddddddddddddddddddddsdfwefwe'
                    }, {
                        href : 'http://www.baidu.com',
                        desc : '222'
                    }],
            coupon : [{
                        href : 'http://www.baidu.com',
                        desc : '111'
                    }, {
                        href : 'http://www.baidu.com',
                        desc : '222'
                    }]
        };
        return rel;
    };
});