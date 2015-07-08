/**
 * 关键词的模拟物料数据
 */
define(function (require, exports, module) {
    var tpl = require('../lib/tpl');
    var rand = require('../lib/rand');

    exports.data = {
        blockreason : function(index) {
            return 0;
        },
        confidence :function(index) {
            return 0;
        },
        pcblockreason : function(index) {
            return 0;
        },
        pcconfidence :function(index) {
            return 0;
        },
        mblockreason : function(index) {
            return 0;
        },
        mconfidence :function(index) {
            return 0;
        },
        showqscore : function(index) {
            var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            return list[Math.floor(Math.random() * 10)];
        },
        pcqscore : function(index) {
            var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            //var list = [1,1,1,1,1,1,1,1,1,1,1];
            return list[Math.floor(Math.random() * 10)];
            //return 0;
        },
        mqscore : function(index) {
            var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            return list[Math.floor(Math.random() * 10)];
        },
        mTransPrice: function (index) {
            if (index === 0) {
                return 0;
            } else {
                if (index % 3 === 0 || index % 4 === 0) {
                    return 1;
                } else if (index % 5 === 0 || index % 6 === 0 || index % 7 === 0) {
                    return 2;
                } else if (index % 8 === 0 || index % 9 === 0 || index % 10 === 0) {
                    return 3;
                } else {
                    return 0;
                }
            }
        },
        mTransPriceReason: function (index) {
            if (index === 0) {
                return 0;
            } else {
                if (index % 3 === 0 || index % 4 === 0) {
                    if (index % 2 === 0) {
                        return 2;
                    } else {
                        return 3;
                    }
                } else if (index % 5 === 0 || index % 6 === 0 || index % 7 === 0) {
                    return 4;
                } else if (index % 8 === 0 || index % 9 === 0 || index % 10 === 0) {
                    return 5;
                } else {
                    if (index % 2 === 0) {
                        return 0;
                    } else {
                        return 1;
                    }
                }
            }
        },
        mTransPoints: function (index) {
            return index % 10;
        },
        mTransPointsReason: function (index) {
            if (index % 10 === 0) {
                return index % 2;
            } else {
                return index % 10 + 1;
            }
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
        unitbid: function (index) {
            return index;
        },
        winfoid: function (index) {
            return index;
        },
        wordid: function (index) {
            return index;
        },
        showword: function (index) {
            // return
            // '关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词关键词'
            // + index;
            if (index % 2 == 0) {
                return '&lt<button>关键词关键词关键词关键词关键词关键词</button>' + index;
            }
            return '较短关键词';
        },
        wordstat: function (index) {
            return [0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 15][index % 11];

        },
        planstat: function (index) {
            return require('./plan').data.planstat(index)
        },
        unitstat: function (index) {
            /*
             * 单元状态 0, '有效' 绿 1, '暂停推广' 黄 11, '推广计划暂停推广' 黄
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
            switch (index % 2 + '') {
                case '0' :
                    return 0;
                case '1' :
                    return 1;
            }
        },
        activestat: function (index) {
            switch (index % 2 + '') {
                case '0' :
                    return 1;
                case '1' :
                    return 0;
            }
        },
        wmatch: function (index) {
            var ind = index % 3;
            switch (ind) {
                case 0 :
                    return 31;
                case 1 :
                    return 63;
                case 2 :
                    return 15;
            }
        },
        wurl: function (index) {
            return 'http://www.baidu.com/?123&456' + index;
        },
        mwurl: function (index) {
            return 'http://www.baidu.com/?123&456' + index;
        },
        shadow_wurl: function (index) {
            return 'http://new.baidu.com/?123&456' + index;
        },
        shadow_mwurl: function (index) {
            return 'http://new.baidu.com/?123&456' + index;
        },
        bid: function (index) {
            return index * Math.random();
        },
        minbid: function (index) {
            return index * Math.random();
        },
        showqstat: function (index) {
            var list = [11, 12, 13, 21, 23, 30];
            return list[Math.floor(Math.random() * 6)];
        },
        pcshowq: function (index) {
            var list = [11, 12, 13, 21, 23, 30];
            return list[Math.floor(Math.random() * 6)];
        },
        mshowq: function (index) {
            var list = [11, 12, 13, 21, 23, 30, null];
            return list[index % 7];
        },
        clks: function (index) {
            return 100 + index;
        },
        shows: function (index) {
            return 200.03 + index;
        },
        paysum: function (index) {
            return (300 + index) % 60;
        },
        trans: function (index) {
            return Math.round(Math.random(1) * 100) + index;
        },
        avgprice: function (index) {
            // return Math.random() + index;
            return 300.234234324 + index;
        },
        clkrate: function () {
            return Math.random(1);
        },
        showpay: function () {
            return Math.round(Math.random(1) * 100);
        },
        offlinereason: function () {
            return [
                [16, 1],
                [13],
                [15],
                [11],
                [7, 3],
                [
                    12,
                    [
                        [213, 'wordblack原因213',
                            '{关键词}{通配符}发&lt;达<br/>发大水'],
                        [309, 'wordblack原因2', '关键词2']
                    ]]
            ];
        },
        wctrl: function (index) {
            return Math.floor(Math.random() * 2);
        },
        bidoptcount: function (index) {
            // 操作
            return Math.round(Math.random(1) * 100) + index;
        },
        pprate: function (index) {
            // 展现概率
            return Math.random(1);
        },
        deviceprefer: function () {
            // 0是全部
            // 2是仅移动
            // 无1的情况
            return 2;//1;
        },
        ideaquality: function (index) {
            return index % 3;
        },
        pageexp: function (index) {
            return index % 6;
        },
        optsug: function () {
            var pos = Math.floor(Math.random() * 6);
            var reason = [401, 402, 403, 401, 407, 414];
            var suggestion = [4001, 4002, 4003, 4007, 4003, 4009];
            return {
                data: {
                    showratio: 12
                },
                reason: reason[pos],
                suggestion: suggestion[pos]
            };
        },
        
        /**
         * 分匹配模式启用状态状态，0 启用，1未启用
         * @param {number} index
         *     行数，从1开始
         */
        matchPriceEnableStatus: function (index) {
            // 0: 该关键词所对应的单元已开启分匹配模式，该关键词并已接受分匹配模式
            // 1: 该关键词所对应的单元未启用分匹配模式出价，或该关键词并未接受分匹配模式。
            return 0;//Math.round(Math.random());
        },
        marker: function () {
            var list = [0, 1, 2, 4, 8, 16];
            return list[Math.floor(Math.random(1) * list.length)];
        }
    };
});