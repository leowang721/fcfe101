
define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');
    var moment = require('moment');
    
    module.exports = function (path, param, context) {
        if (context && setCookie) {
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
                'userName': '童谣',  // 纪念一下元老
                'mPriceFactorMin': 0.1,
                'serverTime': (new Date()) / 1000,
                'mPriceFactorMax': 10.0,
                'urlCutPrex': ['siteapp.baidu.com/site/', 'page.baidu.com/'],
                'ulevelid': 10101,
                'optid': 12626,
                'userRole': 'wordadmin',
                'spaceNewsCount': 3,
                'appOptUrl':'http://www.baidu.com',
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
                    'bidstrategy': true, // 盯排名
                    'remarket': true,  // 搜索再营销 小流量开关
                    'remarketduair': true,  // 黄金眼搜索再营销 小流量开关
                    'bidsimulator': true // 模拟出价器
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
                        //'fcnp-region-secondary-black',

                        'fcnp-region-secondary-retainBid',
                        'idea-search',
                        'fc-scorpio-user',
                        'fc-cached-mtl-users',  // 物料列表优化的小流量用户
                        
                        'fc-match-price-factor-user', // 分匹配模式和流量探测的小流量用户
                        
                        // 新管理页小流量用户
                        // 目前该小流量没有。开发时需要将该小流量解禁。
                        'new-management-users',

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
                        'fc-external-flow-bid-strategy',
                        'default-manage-user',
                        'fc-business-shield',
                        // 回收站小流量
                        'fc-recycle-bin',
                        // 动态自提小流量
                        'fc-dynamic-idea-snippet',
                        // 管理页视频计划入口小流量
                        'fc-video-user',
                        // 旧消息中心入口下线的小流量用户
                        'old-msg-center-off-users'
                    ],
                    'hasAntiReport': false,
                    'hasMatchReport': false
                }
            }
        };
    };
});
