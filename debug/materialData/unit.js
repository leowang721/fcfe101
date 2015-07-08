/**
 * 单元的模拟物料数据
 */
define(function (require, exports, module) {
    var tpl = require('../lib/tpl');
    var rand = require('../lib/rand');

    exports.data = {
        deviceprefer: function () {
            //return Math.round(Math.random(1) * 2);
            return 0;
        },
        devicecfgstat: function () {
            //return Math.round(Math.random(1) * 1);
            return 1;
        },
        planid: function (index) {
            return require('./plan').data.planid(index);
        },
        planname: function (index) {
            return require('./plan').data.planname(index);
        },
        unitid: function (index) {
            return index;
        },
        unitname: function (index) {
            return '单元' + index;
        },
        unitstat: function (index) {
            return [0, 1, 11][Math.floor(Math.random() * 3)];
            /*
             * 单元状态 0, "有效" 绿 1, "暂停推广" 黄 11, "推广计划暂停推广" 黄
             */
            switch (index % 3 + '') {
                case '0' :
                    return 0;
                case '1' :
                    return 1;
                case '2' :
                    return 11;
            }
        },
        pausestat: function (index) {
            /*
             * 单元状态 0, "有效" 绿 1, "暂停推广" 黄
             */

            switch (index % 3 + '') {
                case '0' :
                    return 0;
                case '1' :
                    return 1;
                case '2' :
                    return (index + 1) % 6 === 0 ? 0 : 1;
            }
        },
        unitbid: function (index) {
            return index + 100;
        },
        wordcount: function (index) {
            return index % 9;
        },
        ideacnt: function (index) {
            return 9;
        },
        ideacount: function (index) {
            return Math.floor((index || 0) + 100) % 9;
        },// 账户树升级新增数据by mayue@baidu.com

        clks: function (index) {
            return 100 + index;
        },
        clkrate: function () {
            return Math.random(1);
        },
        shows: function (index) {
            return 200 + index;
        },
        paysum: function (index) {
            return 300.234234324 + index;
        },
        trans: function (index) {
            return 10 + index;
        },
        phonetrans: function () {
            return Math.round(Math.random(1) * 10);
        },
        extbind: function () {
            var index = Math.ceil(Math.random() * 100) % 5;
            if (index === 0) {
                return '-';
            } else {
                return Math.ceil(Math.random() * 10000) + '';
            }
        },
        avgprice: function (index) {
            return 0.5234234324 + index;
        },
        createtime: function () {
            return '2011-3-20';
        },
        showpay: function () {
            return Math.random(1) * 100;
        },
        negative: function () {
            return ['否定关键词1', '否定关键词2'];
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
        unitMPriceFactor : function(index) {
            return ['', '', 3][index % 3];
        },
        mPriceFactor : function(index) {
            return ['', 1, 2][index % 3];
        },
        offlinereason: function () {
            return [
                [16, 1],
                [5, 2],
                [8],
                [7, 2],
                [3, [
                    [308, '法拉利'],
                    [309, '保时捷'],
                    [102, '悍马']
                ]],
                [10, 1],
                [
                    12,
                    [
                        [308, 'wordblack原因1', '{关键词}{通配符}'],
                        [309, 'wordblack原因2', '关键词2']
                    ]]
            ];
        },
        creativecnt: function () {
            return {
                'sublink': 0,
                //'sublink': Math.floor((Math.random() * 10) % 2),
                'msublink': Math.floor((Math.random() * 10) % 2),
                'app': Math.floor((Math.random() * 10) % 2),//Math.floor((Math.random()*10)%2)
                'phone': 0,
                'bridge': Math.floor((Math.random() * 10) % 2),
                'ecall': Math.floor((Math.random() * 10) % 2)
            }
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
            var pos = Math.floor(Math.random() * 3);
            var reason = [201, 201];
            var suggestion = [2001, 2002];
            return {
                data: {},
                reason: reason[pos],
                suggestion: suggestion[pos]
            };
        },
        
        /**
         * 分匹配模式出价状态，0 启用，1关闭
         * @param {number} index
         *     行数，从1开始
         */
        matchPriceStatus: function (index) {
            return index % 2;
        },
        
        matchPriceFactor: function (index) {
            var accurate = Number(rand.number(1, 10).toFixed(2));
            var phrase = Number(rand.number(0.1, accurate).toFixed(2));
            var widespread = Number(rand.number(0, phrase).toFixed(2));
            return {
                accurate: accurate,    // 精确
                phrase: phrase,    // 短语
                widespread: widespread //广泛
            };
        },
        
        /**
         * 流量探测启用状态状态，0 启用，1未启用
         * @param {number} index 行数，从1开始
         */
        flowDetectionStatus: function (index) {
            // 0: 该单元已开启流量探测
            // 1: 该单元并未开启流量探测
            return Math.round(Math.random());
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
                        var v = backFun.apply(dataFactory, arguments);
                        cache[key][index] = v;
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