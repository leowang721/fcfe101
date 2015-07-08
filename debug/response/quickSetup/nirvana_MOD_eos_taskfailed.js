
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var kslfData = storage.get('kslfData');
    if (kslfData === undefined) {
        kslfData = 0;
        storage.set('kslfData', 0);
    }
    
    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = null;
        rel.status = 200;
        if (kslfData == 6) {
            kslfData = 0;
        }
        if (kslfData == 7) {
            kslfData = 2;
        }
        return rel;
    };
});