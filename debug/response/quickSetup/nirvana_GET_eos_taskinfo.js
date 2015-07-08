
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), list = [], pnum = 3, unum = 5
                * pnum, knum = 4 * unum, i, j, k;
        for (i = 0; i < pnum; i++) {
            list.push({
                        recmplanid : i,
                        recmplanname : '计划' + i,
                        recmunitcount : 5,
                        recmwordcount : 5 * 4,
                        recmunitlist : []
                    });
            for (j = 0; j < 5; j++) {
                list[i].recmunitlist.push({
                            recmunitid : i + '-' + j,
                            recmunitname : '单元' + i + '-' + j,
                            recmwordcount : 4,
                            recmunitbid : 13.00 + i + j
                        });
            }
        }
    
        rel.data = {
            recmplancount : pnum,
            recmunitcount : unum,
            recmwordcount : knum,
            recmplanlist : list
        };
    
        rel.status = 200;
        /*
         * rel.errorCode={ "message": "你妹啊 你妹！", "code": 6019, "detail": null }
         */
        return rel;
    };
});