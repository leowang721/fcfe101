/**
 * @file 动态创意
 * @author Feixiang Yuan(yuanfeixiang@baidu.com)
 * @date 2014-09-25
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
        unitid: function (index) {
            return index;
        },
        unitname: function (index) {
            return '单元' + index;
        },
        dynideaid: function (index) {
            return index;
        },
        dynideastat: function (index) {
            return [0, 1, 2, 4, 5, 7, 8][Math.round(Math.random() * 100) % 7];
        },
        pausestat: function (index) {
            switch (index % 2 + '') {
                case '0' :
                    return 0;
                case '1' :
                    return 1;
            }
        },
        title: function (index) {
            return '动态创意' + index;
        },
        url: function (index) {
            return 'http://www.baidu.com/?123&456' + index;
        },
        murl: function (index) {
            return 'http://m.baidu.com/?123&456' + index;
        },
        clks: function () {
            return 10000;
        },
        shows: function () {
            return 20000;
        }
    };
});