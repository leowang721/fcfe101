/**
 * 计划的模拟物料数据
 */
define(function (require, exports, module) {
    var tpl = require('../lib/tpl');
    var random = require('random');

    exports.data = {
        remarketingstat: function (index) {
            return index % 2 == 0 ? 0 : 1; 
        }, 

        bridgeStat: function () {
            return 1;
        },

        bridgeEnable: function () {
            return 0;
        },

        bridgeError: function () {
            return '用户没有有效的商桥站点';
        },

        appcnt: function () {
            return  {
                'ctvcnt': 5,
                'cnt': 15

            };
        },
        bridgecnt: function () {
            return  {
                'ctvcnt': 5,
                'cnt': 15

            };
        },
        sublinkcnt: function () {
            return  {
                'ctvcnt': 5,
                'cnt': 15

            };
        },
        msublinkcnt: function () {
            return  {
                'ctvcnt': 5,
                'cnt': 15

            };
        },
        phonecnt: function () {
            return  {
                'ctvcnt': 5,
                'cnt': 15

            };
        },
        ecallcnt: function () {
            return  {
                'ctvcnt': 5,
                'cnt': 15

            };
        },

        unitcnt: function () {
            return  {
                'ctvcnt': 15,
                'cnt': 15

            };
        },
        qrstat1: function () {
            return '1';
        },
        planid: function (index) {
            index = +index;
            return index >= 1000 ? Math.floor(index / 1000) : index;
        },
        planname: function (index) {
            return index % 2 === 0 ? '[auto-03-28_10:16]-3000016975' + exports.data.planid(index) : '计划名车巴' + exports.data.planid(index)

        },
        planstat: function (index) {
            /*
             * 计划状态 0, '有效' 绿 1, '处在暂停时段' 黄 2, '暂停推广' 黄 3, '推广计划预算不足' 红 11,
             * '账户预算不足' 红
             */
            // 返回随机数
            return [0, 1, 2, 3, 11][Math.floor(Math.random() * 5)];
            switch (index % 5 + '') {
                case '0':
                    return 0;
                case '1':
                    return 1;
                case '2':
                    return 2;
                case '3':
                    return 3;
                case '4':
                    return 11;
            }
        },
        pausestat: function (index) {
            /*
             * 计划状态 0, '有效' 绿 1, '处在暂停时段' 黄 2, '暂停推广' 黄 3, '推广计划预算不足' 红 11,
             * '账户预算不足' 红
             */
            switch (index % 5 + '') {
                case '0':
                    return 0;
                case '1':
                    return 1;
                case '2':
                    return 1;
                case '3':
                    return 0;
                case '4':
                    return 0;
            }
        },
        plandynamicideastat: function () {
            return Math.round(Math.random() * 15);
        },
        acctdynamicideastat: function () {
            return Math.random() > 0.5 ? '1' : '0';
        },
        unitcount: function (index) {
            return index % 9;
        },
        region: function () {
            return '北京';
        },
        wregion: function () {
            return '';
        },
        wbudget: function () {
            return Math.random(1) * 1000;
        },
        weekbudget: function () {
            return 500;
        },
        bgttype: function () {
            return 1;
        },
        plancyc: function () {
            var cyc = []
            for (var i = 1; i <= 7; i++) {
                var flag = random.int(0, 1);
                var cnt;
                if (flag) {
                    cnt = random.int(0, 5);
                }
                else {
                    cnt = 0;
                }
                var point = [];
                for (var j = 0; j < cnt; j++) {
                    point.push(random.int(0, 24));
                }
                point.sort();
                point = point.filter(function (ii, idx) {
                    return ii !== point[idx - 1];
                });
                point.forEach(function (end, idx) {
                    if (idx % 2) {
                        var start = point[idx - 1];
                        cyc.push([
                            +('' + i + (start < 10 ? '0' : '') + start),
                            +('' + i + (end < 10 ? '0' : '' ) + end)
                        ]);
                    }
                });
            }
            return cyc;
        },

        clks: function () {
            return Math.round(Math.random(1) * 1000);
        },
        clkrate: function () {
            return Math.random(1);
        },
        shows: function () {
            return Math.round(Math.random(1) * 1000);
        },
        paysum: function () {
            return Math.round(Math.random(1) * 1000);
        },
        trans: function () {
            return Math.round(Math.random(1) * 10);
        },
        phonetrans: function () {
            return Math.round(Math.random(1) * 10);
        },
        avgprice: function () {
            return Math.random(1) + 0.5;
        },

        showprob: function (index) {
            return index % 2 + 1;
        },
        cpro: function (index) {
            return index % 2;
        },
        cprostat: function (index) {
            // return index%2 == 0 ? '有效' : '无效';
            return index % 2;
        },
        cproprice: function () {
            return Math.random(1) * 10;
            // return '';
        },
        showpay: function () {
            return Math.random(1) * 100;
        },
        createtime: function () {
            return '2011-01-18';
        },
        negative: function () {
            return ['否定关键词1', '否定关键词2']
        },
        accuratenegative: function () {
            return ['10', '20', '30'];
        },
        ipblack: function () {
            return ['202.114.12.34'];
        },
        allnegativecnt: function () {
            return ((Math.random()) * 100).toFixed(0);
        },
        allipblackcnt: function () {
            return ((Math.random()) * 100).toFixed(0);
        },
        offlinestat: function () {
            return {
                '2011-01-06': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-07': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-08': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-09': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-10': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-11': [
                    ['9', '12'],
                    ['16', '23']
                ],
                '2011-01-12': [
                    ['9', '12'],
                    ['16', '23']
                ]
            };
        },
        reonlinereason: function () {
            return {
                '2011-01-06': [
                    ['07:24', '21:00', 3],
                    ['21:40', '23:09', 2]
                ],
                '2011-01-07': [
                    ['07:24', '11:00', 3],
                    ['21:00', '22:00', 3]
                ],
                '2011-01-08': [
                    ['02:00', '07:23', 3],
                    ['21:01', '23:59', 1]
                ],
                '2011-01-09': [
                    ['00:10', '09:23', 2],
                    ['12:24', '21:00', 3],
                    ['22:01', '23:01', 2]
                ],
                '2011-01-10': [
                    ['00:10', '09:23', 2],
                    ['12:24', '21:00', 3],
                    ['22:01', '23:01', 2]
                ],
                '2011-01-11': [
                    ['00:10', '07:23', 2],
                    ['08:24', '11:00', 3],
                    ['12:01', '20:00', 2],
                    ['21:00', '22:00', 3]
                ],
                '2011-01-12': [
                    ['00:10', '09:23', 2],
                    ['12:24', '21:00', 3],
                    ['22:01', '23:01', 2]
                ]
            };
        },
        offlinereason: function () {
            return [
                [1],
                [16, 0],
                [5, 2],
                [8],
                [7, 1],
                [3, [
                    [308, '法拉利'],
                    [309, '保时捷'],
                    [102, '悍马'],
                    [16384]
                ]],
                [10, 1],
                [
                    12,
                    [
                        [308, 'wordblack原因1', '{关键词}{通配符}'],
                        [309, 'wordblack原因2', '关键词2'],
                        [16384, '资质理由', '资质绑定被拒']
                    ]]
            ];
        },
        ideatype: function () {
            return  Math.floor((Math.random() * 10) % 5);
        },
        deviceprefer: function (i) {
            //return 2;
            return [0,2][ i % 2];
        },
        mPriceFactor: function (i) {
            return [1, '', 3][i % 3];
        },

        devicecfgstat: function () {
            //return Math.round(Math.random(1) * 1);
            return 1;
        },
        ideacnt:function () {
            return {
                cnt:10,
                ideacnt:3
            };

        },
        phonenum: function () {
            var list = [
                {
                    phonenum: '344555-344555344555',
                    phonestat: 1
                },
                {
                    phonenum: '344555-344555344555',
                    phonestat: 1
                },
                {
                    phonenum: '344555-344555344555',
                    phonestat: 1
                }
            ];
            return list[Math.round(Math.random(1) * 2)];
        },
        optsug: function () {
            // LEVELINFO: {
            //     REASON: {
            //         'planinfo': [101, 102, 103, 104],
            //         'unitinfo': [201, 201],
            //         'ideainfo': [301, 301],
            //         'ordinfo': [401, 402, 403, 404, 405, 406]
            //     },
            //     SUGGESTION: {
            //         'planinfo': [1001, 1001, 1002, 1002],
            //         'unitinfo': [2001, 2002],
            //         'ideainfo': [3001, 3002],
            //         'wordinfo': [4001, 4002, 4003, 4004, 4005, 4006]
            //     }
            // }
            var pos = Math.floor(Math.random() * 5);
            var reason = [101, 102, 103, 104, 106];
            var suggestion = [1001, 1001, 1002, 1002, 1005];
            //var reason = [106, 106, 106, 106, 106];
            //var suggestion = [1005, 1005, 1005, 1005, 1005];
            return {
                data: {},
                reason: reason[pos],
                suggestion: suggestion[pos]
            };
        }
    };

    var dataFactory = exports.data;
    var cache = {};
    for (var k in dataFactory) {
        (function () {
            var key = k;
            if (!cache[key]) {
                cache[key] = {};
            }
            var backFun = dataFactory[key];
            dataFactory[key] = function (index) {
                var value;
                if (index !== undefined) {
                    if (cache[key][index] === undefined) {
                        cache[key][index] = 
                            backFun.apply(dataFactory, arguments);
                    }
                    value = cache[key][index];
                } else {
                    value = backFun.apply(dataFactory, arguments);
                }
                return value;
            }
        })();
    }
});
