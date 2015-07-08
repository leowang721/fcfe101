
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = [{
                    "id" : 1,
                    "rank" : 1,
                    "epvRate" : 0.9
                }, {
                    "id" : 2,
                    "rank" : 2,
                    "epvRate" : 0.8
                }, {
                    "id" : 33,
                    "rank" : 3,
                    "epvRate" : 0.1200
                }, {
                    "id" : 3,
                    "rank" : 4,
                    "epvRate" : 0.1200
                }, {
                    "id" : 27,
                    "rank" : 5,
                    "epvRate" : 0.1200
                }, {
                    "id" : 26,
                    "rank" : 6,
                    "epvRate" : 0.1200
                }, {
                    "id" : 34,
                    "rank" : 7,
                    "epvRate" : 0.1200
                }, {
                    "id" : 9,
                    "rank" : 8,
                    "epvRate" : 0.1200
                }, {
                    "id" : 14,
                    "rank" : 9,
                    "epvRate" : 0.1200
                }, {
                    "id" : 4,
                    "rank" : 10,
                    "epvRate" : 0.12000
                }, {
                    "id" : 5,
                    "rank" : 11,
                    "epvRate" : 0.5834
                }, {
                    "id" : 8,
                    "rank" : 12,
                    "epvRate" : 0.0257
                }, {
                    "id" : 10,
                    "rank" : 13,
                    "epvRate" : 0.6323
                }, {
                    "id" : 11,
                    "rank" : 14,
                    "epvRate" : 0.7186
                }, {
                    "id" : 12,
                    "rank" : 15,
                    "epvRate" : 0.9357
                }, {
                    "id" : 13,
                    "rank" : 16,
                    "epvRate" : 0.9617
                }, {
                    "id" : 15,
                    "rank" : 17,
                    "epvRate" : 0.4695
                }, {
                    "id" : 16,
                    "rank" : 18,
                    "epvRate" : 0.9551
                }, {
                    "id" : 17,
                    "rank" : 19,
                    "epvRate" : 0.0219
                }, {
                    "id" : 18,
                    "rank" : 20,
                    "epvRate" : 0.9439
                }, {
                    "id" : 19,
                    "rank" : 21,
                    "epvRate" : 0.0938
                }, {
                    "id" : 20,
                    "rank" : 22,
                    "epvRate" : 0.6310
                }, {
                    "id" : 21,
                    "rank" : 23,
                    "epvRate" : 0.0848
                }, {
                    "id" : 22,
                    "rank" : 24,
                    "epvRate" : 0.7426
                }, {
                    "id" : 23,
                    "rank" : 25,
                    "epvRate" : 0.4448
                }, {
                    "id" : 24,
                    "rank" : 26,
                    "epvRate" : 0.9782
                }, {
                    "id" : 25,
                    "rank" : 27,
                    "epvRate" : 0.2134
                }, {
                    "id" : 28,
                    "rank" : 28,
                    "epvRate" : 0.8908
                }, {
                    "id" : 29,
                    "rank" : 29,
                    "epvRate" : 0.4985
                }, {
                    "id" : 30,
                    "rank" : 30,
                    "epvRate" : 0.1238
                }, {
                    "id" : 31,
                    "rank" : 31,
                    "epvRate" : 0.7953
                }, {
                    "id" : 32,
                    "rank" : 32,
                    "epvRate" : 0.7221
                }, {
                    "id" : 35,
                    "rank" : 33,
                    "epvRate" : 0.6257
                }, {
                    "id" : 36,
                    "rank" : 34,
                    "epvRate" : 0.6572
                }];
    
        return rel;
    };
});