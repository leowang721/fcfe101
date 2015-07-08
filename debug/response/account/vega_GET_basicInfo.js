/**
 * @file copy from nirvana_GET_basicInfo
 * @author liuming07(liuming07@baidu.com)
 */

define(function (require, exports, module) {
    var random = require('random');

    module.exports = function (path, param, context) {
        /* globals setCookie */
        if (context) {
            // 设置会话级cookie，保证auth权限有效
            var exp = 'Wed, 23 Jul 2015 02:52:19 GMT';
            setCookie({
                '__cas__rn__': 'kslf_cas_rn;path=/;expires=' + exp,
                '__cas__st__3': 'kslf_cas_st_3;path=/'
            }, context);
        }

        var userid = context.POST.userid || random.int(1, 500);

        // if (context.headers) {
        //     context.headers = {
        //         location: 'http://www.baidu.com'
        //     };
        //     rel._status = 302;
        // }

        // return {
        //     redirect: true
        // }

        return {
            'userInfo': {
                'optUlevelid': userid,
                'optName': 'zliu',
                // 纪念一下元老
                'userName': '童谣',
                'mPriceFactorMin': 0.1,
                // 服务器返回的是秒
                'serverTime': parseInt(+new Date() / 1000, 10),
                'mPriceFactorMax': 10.0,
                'urlCutPrex': ['siteapp.baidu.com/site/', 'page.baidu.com/'],
                'ulevelid': 10101,
                'optid': 12626,
                'userRole': 'wordadmin',
                'spaceNewsCount': 3,
                'appOptUrl': 'http://www.baidu.com',
                'externalFlowPriceFactor': {
                    min: 0.1,
                    max: 0.9
                }
            },
            'acctAuth': {
                'optAuth': true,
                'writable': true,
                'crmEditable': true
            },
            'bizAuth': {
                'ao': {
                    'krstation_gate': true,
                    'qualityenv': true,
                    'aofuse2.0': true,
                    'effectana': true,
                    'toolcenter': true,
                    'optcoreword': true,
                    'krstation': true,
                    'toleftrecmbid': true,
                    'fusemobilebidsug': true,
                    'optcenter': true,
                    // 'bidstrategy': true, // 盯排名
                    'remarket': true,  // 搜索再营销 小流量开关
                    'insight': true,  // 竞价洞察
                    'bidsimulator': true, // 模拟出价器
                    'aomanual': true // ao手动版改版
                },
                'platform': {
                    'wregionSecondary': 2,
                    'reportLevel': 300,
                    'region': true,
                    'userRoles': [
                        'lab',
                        'lab-abtest',
                        'lab-insight',
                        'phone-creative-data',
                        'mobile-intro',
                        'discount-info',
                        'fcwise-mobile-user',
                        'wireless-user-mpricefactor',
                        'fcwise-alldevice-user',

                        // 二级地域的黑名单，这个名单里的用户没有二级地域的功能
                        // 'fcnp-region-secondary-black',
                        'fcnp-region-secondary-retainBid',
                        'idea-search',
                        'fc-scorpio-user',
                        'fc-cached-mtl-users',  // 物料列表优化的小流量用户

                        'fc-match-price-factor-user', // 分匹配模式和流量探测的小流量用户

                        // 新管理页小流量用户
                        // 目前该小流量没有。开发时需要将该小流量解禁。
                        'new-management-users',
                        'fc-dynamic-idea-snippet', // 动态创意自提小流量
                        // 以下是小辉传的但是构造数据原来没有
                        'wireless-user-bridge',
                        'preview22',
                        'report',
                        'preview12',
                        'advanced-ip-excluded',
                        'invalid-click-report-xll',
                        'preview',
                        'lab-abtest',
                        'preview21',
                        'preview11',

                        // @author dengyijun 动态创意小流量
                        'dynamicidea-user',

                        // KA用户
                        'ka-user',
                        // 新关键词列表
                        'fc-mtl-wordlist-users',
                        // 数据中心一期小流量（deprecated），15.3.26切为黑名单：fc-datacenter-black-user
                        'fc-reportcenter-user',
                        // 报告投放网络选项小流量
                        'report-target-net-user',
                        'fc-external-flow-bid-strategy',
                        // 'default-manage-user'
                        'fc-business-shield',
                        // 管理页视频计划入口小流量
                        'fc-video-user',
                        // 仅投无线系统白名单字段
                        'fcwise-only-mobile-user',
                        // nirnavaII权限
                        'new-nirvanaII-users'
                    ],
                    'hasAntiReport': false,
                    'hasMatchReport': false
                },
                'hags': {
                    'krstation_gate': true,
                    'qualityenv': true,
                    'aofuse2.0': true,
                    'effectana': true,
                    'toolcenter': true,
                    'optcoreword': true,
                    'krstation': true,
                    'toleftrecmbid': true,
                    'fusemobilebidsug': true,
                    'optcenter': true,
                    // 'bidstrategy': true, // 盯排名
                    'remarket': true,  // 搜索再营销 小流量开关
                    'insight': true,  // 竞价洞察
                    'bidsimulator': true, // 模拟出价器
                    'aomanual': true, // ao手动版改版
                    'lab': true,
                    'lab-abtest': true,
                    'lab-insight': true,
                    'phone-creative-data': true,
                    'mobile-intro': true,
                    'discount-info': true,
                    'fcwise-mobile-user': true,
                    'wireless-user-mpricefactor': true,
                    'fcwise-alldevice-user': true,

                    // 二级地域的黑名单，这个名单里的用户没有二级地域的功能
                    // 'fcnp-region-secondary-black',
                    'fcnp-region-secondary-retainBid': true,
                    'idea-search': true,
                    'fc-scorpio-user': true,
                    'fc-cached-mtl-users': true,  // 物料列表优化的小流量用户

                    'fc-match-price-factor-user': true, // 分匹配模式和流量探测的小流量用户

                    // 新管理页小流量用户
                    // 目前该小流量没有。开发时需要将该小流量解禁。
                    'new-management-users': true,
                    'fc-dynamic-idea-snippet': true, // 动态创意自提小流量
                    // 以下是小辉传的但是构造数据原来没有
                    'wireless-user-bridge': true,
                    'preview22': true,
                    'report': true,
                    'preview12': true,
                    'advanced-ip-excluded': true,
                    'invalid-click-report-xll': true,
                    'preview': true,
                    'lab-abtest': true,
                    'preview21': true,
                    'preview11': true,

                    // @author dengyijun 动态创意小流量
                    'dynamicidea-user': true,

                    // KA用户
                    'ka-user': true,
                    // 新关键词列表
                    'fc-mtl-wordlist-users': true,
                    // 数据中心黑名单,已经废弃的老报名点字段是fc-reportcenter-user
                    'fc-datacenter-black-user': false,
                    // 报告投放网络选项小流量
                    'report-target-net-user': true,
                    'fc-external-flow-bid-strategy': true,
                    // 'default-manage-user'
                    'fc-business-shield': true,
                    // 管理页视频计划入口小流量
                    'fc-video-user': true,
                    // 仅投无线系统白名单字段
                    'fcwise-only-mobile-user': true,
                    // nirnavaII权限
                    'new-nirvanaII-users': true
                }
            }
        };
    };
});
