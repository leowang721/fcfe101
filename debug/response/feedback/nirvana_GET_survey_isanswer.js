define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            'count' : '1',
            'auth' : '1',
            'userid' : '499',
            'listdata' : [{
                auth: 1,
                paperid: 1234,
                positionid: 3,
                papername: 'XXXXX可用性问卷'
            }]
        };
        return rel;
    };
});