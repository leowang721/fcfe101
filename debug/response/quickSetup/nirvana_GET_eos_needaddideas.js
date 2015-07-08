
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
        rel.status = 200;
        rel.data = {
            status : 1
            // 0表示不需要添加创意，1表示需要继续添加创意
        };
        kslfData = 0;
        /*
         * rel.errorCode={ "message": "你妹啊 你妹！", "code": 6012, "detail": null }
         */
        return rel;
    };
});