define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            aostatus : 0
        };
        rel.data.resItems = [];
        rel.data.resItems.push({data:{
            recmplanid:'11414537',
            recmplanname:'计划',
            showword:'鲜花',
            recmwmatch:'15',
            recmunitname:"单元",
            wordid:'59970628',
            recmunitid:'274026294',
            recmbid:'0.8'
        }});
        rel.status = 200;
        rel.errorCode = {};
        rel.timeout = 1000;
        return rel;
    };
});