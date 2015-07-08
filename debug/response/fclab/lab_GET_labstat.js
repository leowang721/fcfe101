define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {
            "1":[1],
            "2":[1],
            "3":[1],
            "10":[1]
        }
    
        if(param.level == 'useracct') {
            rel.data = {
                "1":[1, 2],
                "2":[1, 2],
                "3":[1],
                "10":[1, 2]
            }
        }
    
        return rel;
    
    };
});