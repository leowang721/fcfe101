
/**
 * 包优化项应用
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var kslfData1 = storage.get('kslfData1');
    if (kslfData1 === undefined) {
        kslfData1 = 0;
        storage.set('kslfData1', 0);
    }
    var kslfData2 = storage.get('kslfData2');
    if (kslfData2 === undefined) {
        kslfData2 = 0;
        storage.set('kslfData2', 0);
    }

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.data = {
            aostatus : 0,
            applyToken : (new Date()).valueOf()
        };
        kslfData2 = params.applyreqitems;
        kslfData1 = 0;
        return rel;
    };
});