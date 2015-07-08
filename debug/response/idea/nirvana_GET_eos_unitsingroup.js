
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            groupcount : 4,
            grouplist : [[1, 2, 3], [4, 5, 6], [1, 2, 3], [4, 5, 6]]
        };
    
        return rel;
    };
});