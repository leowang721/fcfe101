/**
 * 创意的模拟物料数据
 */
define(function (require, exports, module) {
    var tpl = require('../lib/tpl');
    var rand = require('../lib/rand');

    exports.data = {
        planid: function (index) {
            return require('./plan').data.planid(index);
        },
        planname: function (index) {
            return require('./plan').data.planname(index);
        },
        deviceOpt: function () {
            return [0, 1][Math.round(Math.random() * 100) % 2];
        },
        shadow_deviceOpt: function () {
            return [0, 1][Math.round(Math.random() * 100) % 2];
        },
        unitid: function (index) {
            return index;
        },
        unitname: function (index) {
            return '单元' + index;
        },
        ideaid: function (index) {
            return index;
        },
        shadow_ideaid: function (index) {
            if (index % 2 == 0)
                return null;
            return index + 10000;
        },
        ideastat: function (index) {
            return [0, 1, 2, 4, 5, 7, 8][Math.round(Math.random() * 100) % 7];
        },
        shadow_ideastat: function (index) {
            if (index % 2 == 0)
                return null;
            return [0, 1, 2, 4, 5, 7][Math.round(Math.random() * 100) % 6];
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
        title: function (index) {
            return '{关键词}{通配符文字}{很长很^长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长创<b>意"标</b>\'题}'
                + index;
        },
        shadow_title: function (index) {
            if (index % 2 == 0)
                return null;
            return '影子——创<b>意"标</b>题1影子——创<b灌灌灌灌' + index;
        },
        desc1: function (index) {
            return '创<b>意"描述</b>&---&lt;&gt;&amp;&quot;----\'一' + index;
        },
        shadow_desc1: function (index) {
            if (index % 2 == 0)
                return null;
            return '影子——创<b>意"描述</b>一1影子——创<b>意"标</b>题1影子——创<b>意"标</对' + index;
        },
        desc2: function (index) {
            return '创<b>意"描述</b>\'二' + index;
        },
        shadow_desc2: function (index) {
            if (index % 2 == 0)
                return null;
            return '影子——创<b>意"描述</b>一1影子——创<b>意"标</b>题1影子——创<b>意"标</对' + index;
        },
        url: function (index) {
            return 'http://www.baidu.com/?123&456' + index;
        },
        shadow_url: function (index) {
            if (index % 2 == 0)
                return null;
            return '影子——http://www.baidu.com/?123&456' + index;
        },
        miurl: function (index) {
            return '';//'http://www.baidu.com/?123&456' + index;
        },
        shadow_miurl: function (index) {
            if (index % 2 == 0)
                return null;
            return '';//'影子——http://www.baidu.com/?123&456' + index;
        },
        mshowurl: function (index) {
            return '';//'http://www.baidu.com/' + index;
        },
        showurl: function (index) {
            return 'http://www.baidu.com/' + index;
        },
        shadow_mshowurl: function (index) {
            if (index % 2 == 0)
                return null;
            return '';//'影子——http://www.baidu.com/' + index;
        },
        shadow_showurl: function (index) {
            if (index % 2 == 0)
                return null;
            return '影子——http://www.baidu.com/' + index;
        },
        clks: function () {
            return 10000;
        },
        shows: function () {
            return 20000;
        },
        paysum: function () {
            return 300.234234324;
        },
        trans: function () {
            return 10;
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
        offlinereason: function () {
            return [
                [16, 0],
                [11],
                [7, 4],
                [3, [
                    [308, "法拉利"],
                    [309, "保时捷"],
                    [102, "悍马"],
                    [16384]
                ]],
                [10, 1],
                [
                    12,
                    [
                        [308, 'wordblack原因1', '关键词,通配符'],
                        [309, 'wordblack原因2', '关键词2']
                    ]]
            ];
        },

        deviceprefer: function () {
            return 2;
            // return Math.round(Math.random(1) * 2);
        },
        devicecfgstat: function () {
            return 1;
            //  return Math.round(Math.random(1) * 1);
        },
        creativecnt: function () {
            return {
                'sublink': 0,
                'app': 0
            };
        },
        optsug: function () {
            var pos = Math.floor(Math.random() * 2);
            var reason = [301, 301];
            var suggestion = [3001, 3002];
            return {
                data: {},
                reason: reason[pos],
                suggestion: suggestion[pos]
            };
        },
        marker: function () {
            var list = [0, 1, 2, 4, 8, 16];
            return list[Math.floor(Math.random(1) * list.length)];
        }
    };
});