

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var typeids = [1,2,3,4,5,6,7,8,31,32,33,34,35,36,37,38,39], len = typeids.length;
        var data = [], di, i = 0;
    
        var getValue = function() {
            return Math.ceil((Math.random()*100));
        };
        var getOptions = function() {
            return 11;
        };
        while(len--) {
            di = data[i++] = {};
            di.typeid= typeids[len];
            di.value = getValue();
            di.options = getOptions();
        }
        rel.data = {
            options: data,
            sync: [
                {
                    from: 0, // 0 - PC/1 - APP
                    to: 1, // 0 - PC/ 1 - APP
                    value: 1 // 0 - 不同步/1-同步
                }
            ]
        };
        return rel;
    };
});