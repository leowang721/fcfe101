define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            title: '关键词已参与精准流量优惠活动',
            content: [
                "优惠有效期：07-09至07-31",
                "优惠时段：周末全天","优惠力度：8折"
            ],
            link: [
                {
                    text: '查看优惠详情' + param.winfoid,
                    url: 'sth'
                }
            ]
        };
        rel.status = 400;
    };
});