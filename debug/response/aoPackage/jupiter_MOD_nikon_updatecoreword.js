/**
 * 模拟更新重点词的接口
 * @author wuhuiyao
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            aostatus: 0,
            errorcodes : 0,
            errorcorewords : []
        };
    //    var addWords = params.addwinfoids;
    //    var delWords = params.delwinfoids;
    ////    rel.data.errorcorewords = [
    ////        {
    ////            errorcoe: 2, // 1表示该重点词已被删除,2表示该词已经是重点词,
    ////            winfoid: addWords[0]
    ////        },
    ////        {
    ////            errorcoe: 1,
    ////            winfoid: delWords[0]
    ////        }
    ////    ];
        rel.status = 200;
        // rel.timeout = 1000;
        return rel;
    };
});