/**
 * 附加创意的模拟物料数据
 */
define(function (require, exports, module) {
    var tpl = require('../lib/tpl');
    var rand = require('../lib/rand');

    exports.data = {
        planid: function (index) {
            return require('./plan').data.planid(index);
        },
        mtid: function () {
            var d = [1, 2020];
            var i = Math.round(Math.random(1) * 1);
            return d[i];

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
        creativeid: function (index) {
            return index;
        },
        clks: function () {
            return 10000;
        },
        creativeclks: function () {
            return 10000;
        },
        shows: function () {
            return 20000;
        },
        paysum: function () {
            return 300.234234324;
        },
        creativepaysum: function () {
            return 300.234234324;
        },
        avgprice: function () {
            return Math.random();
        },
        clkrate: function () {
            return Math.random(1);
        },
        showpay: function () {
            return Math.random(1) * 100;
        },
        creativetype: function () {
            var type = ['sublink'];
            return type[0];
        },
        content: {

            'sublink': function () {
                var len = Math.round(Math.random() * 100) % 6, content = [], title = ['情人<button>e</button>节鲜花', '送女友', '看病人鲜花', '鲜花快递', '花儿为何这样红'];

                for (var i = 0; i < len; i++) {
                    var temp = {};

                    temp.title = title[i];
                    temp.url = 'http://www.baidu.com';
                    content.push(temp);
                }

                return content;
            },
            'phone': function (index) {
                var content = {
                    'phonenum': '112233' + index
                };

                return content;
            },
            'bridge': function () {
                var content = {};
                return content;
            },
            'ecall': function () {
                var content = {
                    'ecall': '12345678901234567890',
                    'mcid': '123456'
                };

                return content;
            }


        },
        stat: function (index) {
            return [0, 1, 2, 4, 5][Math.round(Math.random() * 100) % 5];
        },
        pausestat: function (index) {
            switch (index % 2 + '') {
                case '0':
                    return 0;
                case '1':
                    return 1;
            }
        },

        shadowcreativeid: function (index) {
            return index;
        },

        shadowcontent: function () {
            var len = Math.round(Math.random() * 100) % 5,
                content = [],
                title = ['影子1', '影子2', '影子3', '影子4', '影子5'];

            for (var i = 0; i < len; i++) {
                var temp = {};

                temp.title = title[i];
                temp.url = 'http://www.baidu.com';
                content.push(temp);
            }

            return content;
        },

        shadowstat: function () {

            return [0, 1, 2, 4, 5][Math.round(Math.random() * 100) % 5];
        },

        shadowpausestat: function (index) {
            switch (index % 2 + '') {
                case '0':
                    return 0;
                case '1':
                    return 1;
            }
        },


        offlinereason: function () {
            return [
                [16, 0],
                [11],
                [7, 4],
                [3,
                    [
                        [308, '法拉利'],
                        [309, '保时捷'],
                        [102, '悍马'],
                        [16384]
                    ]
                ],
                [10, 1],
                [12,
                    [
                        [308, 'wordblack原因1', '关键词,通配符'],
                        [309, 'wordblack原因2', '关键词2']
                    ]
                ]
            ];
        },

        appname: function (index) {
            return 'App名称<button>fd</button>App' + index;
        },

        appdevicetype: function (index) {
            return [1, 3][index % 2];
        },

        version: function (index) {
            return '10.0.' + index;
        },
        apimodtime: function (index) {
            return '2014-02-21';
        },
        mcid: function (index) {
            return [100, 200][index % 2];
        },
        latestmcid: function(index) {
            return [110, 120][index % 2];
        },
        callcnt400: function (index) {
            return index * 100;
        },
        isLXBPhone: function () {
            return 1;
        }
    };
});