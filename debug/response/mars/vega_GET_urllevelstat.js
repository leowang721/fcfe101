define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {
            '1' : 0,
            '2' : 2000000000000,
            '3' : 120000000,
            traderanking : 0.26
        };
    
    };
    };
});