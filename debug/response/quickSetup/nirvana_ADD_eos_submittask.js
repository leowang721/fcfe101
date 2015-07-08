
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
        //console.log(param)
        if (!param.industry) {
            kslfData = 1;
            return rel;
        }
    
        // kslfData = 1;
        /*
         * rel = { "status": 400,
         * 
         * "errorCode": { "message": "你妹啊 你妹！", "code": 6014, "detail": null } };
         */
        rel.data = {
            token : (new Date()).valueOf(),
            wcnt : 500,
            industrynames : '生命，陈超，小猪',
            recmwords : []
        };
        for (var i = 0; i < 2; i++) {
            rel.data.recmwords.push({
                        wordid : 10000 + i,
                        showword : '长关键词' + i + '极为恶疾哦方季惟额哦ijfiosjdoifjwkle',
                        pv : 15000 + i,
                        kwc : (10 + i) % 100
                    });
        }
        return rel;
    };
});