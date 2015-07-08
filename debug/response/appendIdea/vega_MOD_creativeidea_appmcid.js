define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            successmcid:['1230','1231'],
            failmcid:['1233','1234']
        };
        rel.status = 200;
        return rel;
    
    };
});