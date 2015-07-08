define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = [];
        for (var i = 1; i < 15; i ++) {
            rel.data.push({
                id: i,
                //投此地域的同行百分比
                value: Math.round(10000*Math.random())/10000
            });
        }
    
        return rel;
    };
    
    
    };
});