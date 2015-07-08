
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // console.log('GET_kr_recycle_items' + param);
        var rel = tpl.success();
        var len = 251;
        var data = [];
        for (var i = 0; i < len; i++) {
            data[data.length] = {
                "status" : 0,
                "userid" : 800 + i,
                "addtime" : null,
                "unitid" : 100 + i,
                "planid" : 200 + i,
                "wordid" : 11000 + i,
                "modtime" : null,
                "krlogid" : 400 + i,
                "srchcnt" : 500 + i,
                "cmprate" : 600 + i,
                "word" : "很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的音乐视频网站" + i,
                "krrid" : 700 + i
            }
        }
        rel.data = data;
        return rel;
    };
});