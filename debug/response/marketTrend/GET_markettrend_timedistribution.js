
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [{
                    time : 0,
                    rate : 0.4
                }, {
                    time : 1,
                    rate : 0.39
                }, {
                    time : 2,
                    rate : 0.38
                }, {
                    time : 3,
                    rate : 0.37
                }, {
                    time : 5,
                    rate : 0.36
                }, {
                    time : 4,
                    rate : 0.35
                }, {
                    time : 6,
                    rate : 0.34
                }, {
                    time : 7,
                    rate : 0.33
                }, {
                    time : 8,
                    rate : 0.32
                }, {
                    time : 9,
                    rate : 0.31
                }, {
                    time : 10,
                    rate : 0.30
                }, {
                    time : 11,
                    rate : 0.29
                }, {
                    time : 12,
                    rate : 0.28
                }, {
                    time : 13,
                    rate : 0.27
                }, {
                    time : 14,
                    rate : 0.26
                }, {
                    time : 15,
                    rate : 0.25
                }, {
                    time : 16,
                    rate : 0.24
                }, {
                    time : 17,
                    rate : 0.23
                }, {
                    time : 18,
                    rate : 0.22
                }, {
                    time : 19,
                    rate : 0.21
                }, {
                    time : 20,
                    rate : 0.20
                }, {
                    time : 21,
                    rate : 0.19
                }, {
                    time : 22,
                    rate : 0.18
                }, {
                    time : 23,
                    rate : 0.17
                }];
        return rel;
    };
});