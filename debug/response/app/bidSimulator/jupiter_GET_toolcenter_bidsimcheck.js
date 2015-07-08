/**
 * @file 检查模拟词
 * @author Guangyao Tang(tangguangyao@baidu.com)
 */

define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');

    module.exports = function (path, params) {
        var ret = tpl.success();
        
        // params.winfos 是一个id的数组，[1, 12, 23, 34]
        var ids = params.winfos;
        var len = ids.length;
        ids = len > 10 ? ids.slice(len - 7) : ids;

        ret.data = {
            listData: ids
        };
        
        return ret;
    };
});