
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
        var i;
        rel.status = 200;
        rel.data = {
            aostatus : 0,
            applyToken : param.applyToken,
            applyresitems : kslfData2
        };
        switch (kslfData1) {
            case 0 :
                for (i = 0; i < kslfData2.length / 2; i++) {
                    baidu.object.extend(rel.data.applyresitems[i], {
                                state : 0
                            });
                }
                for (i; i < kslfData2.length; i++) {
                    baidu.object.extend(rel.data.applyresitems[i], {
                                state : 1
                            });
                }
                break;
            default :
                for (i = 0; i < kslfData2.length; i++) {
                    baidu.object.extend(rel.data.applyresitems[i], {
                                state : 0
                            });
                }
        }
        kslfData1++;
        return rel;
    
    };
});