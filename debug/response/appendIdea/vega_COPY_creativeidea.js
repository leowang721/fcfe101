

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
            rel.data = ['1001','1002','1003'];
            rel.status=300;
            rel.errorCode={
                code:'123',
                detail:'eeeeeeeeeeee'
            }
            return rel;
        
    };
});