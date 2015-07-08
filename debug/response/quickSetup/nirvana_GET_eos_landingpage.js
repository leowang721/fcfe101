
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            words: [
                '笨蛋超笨蛋<button>超笨</button>蛋超笨蛋超笨蛋超笨蛋超笨蛋1',
                '笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋2',
                '笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋3',
                '笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋4',
                '笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋5',
                '笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋超笨蛋6',
                '哇咔咔'
            ]
        };
        // rel.timeout = 2000;
        return rel;
    };
});