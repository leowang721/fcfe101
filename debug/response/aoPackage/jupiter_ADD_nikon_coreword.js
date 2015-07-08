
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, params) {
        var rel = tpl.success();
        var words = params.winfoids;
        rel.status = 200;
        rel.data = {
            errorcodes : 0,
            errorcorewords : [
                {
                    errorcode : 1,
                    winfoid : words[0]
                },
                {
                    errorcode : 2,
                    winfoid : words[1]
                }//,
                // {
                //     errorcode : 4,
                //     winfoid : words[2]
                // }
            ]
        };
        return rel;
    
    };
});