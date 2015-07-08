/**
 * @author wuhuiyao (wuhuiyao@b
 * 模拟获取概况页引导页信息的数据接口aidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {
            // 是否有引导页需要展现
            isshow: '1',
            // 要展现的引导页信息项
            introresitems: [
                // {
                //     id: '555',
                //     name: 'easymanage',
                //     priority: '0'
                // }
                // {
                //     id: '223',
                //     pkgid: '10',
                //     priority: '1'
                // },
                // {
                //     id: '220',
                //     pkgid: '9',
                //     priority: '1'
                // },
                // {
                //     id: '320',
                //     name: 'aopointactivityintro',
                //     priority: '3'
                // },
                // {
                //     id: '100',
                //     name: 'mobileintro',
                //     priority: '2',
                //     detail: {
                //         // 行业名称，为空，引导页上不显示
                //         industryname: '医疗',
                //         // 同行数量
                //         peernum: 34123,
                //         // 是否有权限参加活动
                //         activity: '1'
                //     }
                // }
            ]
        };
        return rel;
    };
});