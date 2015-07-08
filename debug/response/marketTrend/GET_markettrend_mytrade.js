
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [{
                    name : "['行业1', '行业2', '行业3']",
                    id : 0
                }, {
                    name : "['行业1', '行业2', '行业3']",
                    id : 1
                }, {
                    name : "['行业1', '行业2', '行业3']",
                    id : 2
                }, {
                    name : "['行业1', '行业2', '行业3']",
                    id : 3
                }, {
                    name : "['行业1', '行业2', '行业3']",
                    id : 4
                }]
        return rel;
    };
});