
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return {
            status: 200,
            data: {
                hasAdvancedStyle: true
            }
            // timeout: 10000
        };
    };
});