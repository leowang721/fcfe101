define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        // 模拟数据请求延迟
        rel.timeout =1000;
        rel.data = [
            { planid:1,
                desc:[ '优惠有效期：11-01至11-30', '优惠时段：周末全天', '优惠力度：5.0 折'],
                status:1,
                label:'查看优惠/设置时段1',
                url:'http://caiwu.baidu.com/mp-coupon/client_vas/task/new?uid=6251777',
                title: '可参加1'
            },{ planid:2,
                desc:[ '优惠有效期：11-01至11-30', '优惠时段：周末全天', '优惠力度：5.0 折'],
                status:2,
                label:'查看优惠/设置时段2',
                url:'http://caiwu.baidu.com/mp-coupon/client_vas/task/new?uid=6251777',
                title: '可参加2'
            },{ planid:3,
                desc:[ '优惠有效期：11-01至11-30', '优惠时段：周末全天', '优惠力度：5.0 折'],
                status:2,
                label:'查看优惠/设置时段3',
                url:'http://caiwu.baidu.com/mp-coupon/client_vas/task/new?uid=6251777',
                title: '可参加3'
            }] ;
        return rel;
    
    };
});