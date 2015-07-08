

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {};
        rel.data.listData = [{
            mcid : '1',
            name : '客服组一二客服组一二'
        }, {
            mcid : '2',
            name : '客服组二'
        }, {
            mcid : '3',
            name : '客服组三'
        }, {
            mcid : '4',
            name : '客服组四'
        }, {
            mcid : '5',
            name : '客服组五'
        }, {
            mcid : '6',
            name : '客服组6'
        }, {
            mcid : '7',
            name : '客服组7'
        }, {
            mcid : '8',
            name : '客服组8'
        }, {
            mcid : '9',
            name : '客服组9'
        }, {
            mcid : '10',
            name : '客服组10'
        }, {
            mcid : '11',
            name : '客服组11'
        }];
        return rel;
    };
});