
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            averageWord: 3499,//同行平均购词量
            myWord: 5000,//我的购词量
            comparedWord: Math.random(),//高于同行的百分比
            averageShow: Math.random(),
            myShow: Math.random(),
            comparedShow: Math.random()
        };
        
        return rel;
    };
});