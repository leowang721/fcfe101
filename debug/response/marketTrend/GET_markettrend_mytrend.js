
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            leftShowTrend : [{
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }, {
                        date : (new Date()).getTime(),
                        most : 0.4,
                        avg : 0.3,
                        mine : 0.2
                    }
    
            ],
            promotionShowTrend : [{
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 5555555
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 5555555,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }, {
                        date : (new Date()).getTime(),
                        avg : 100000,
                        mine : 9999999
                    }]
        };
        return rel;
    };
});