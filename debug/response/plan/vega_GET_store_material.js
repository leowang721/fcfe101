define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [];
        var city = ['北京','上海','广州','深圳','西安'];
        var maxnum = 20;
        var minnum = 5;
        var storeid = 0;
        for (var c = 0; c < city.length; c++) {
            var cobj = {
                provName: city[c],        
                provinceId: c,
                list: []
            }
            var m = Math.random()*maxnum+minnum;
            for (var s = 0; s < m; s++){
                var sobj = {
                    id: storeid,
                    name: city[c] + '门店' + s,
                    pointx: parseInt(Math.random() * 1000),
                    pointy: parseInt(Math.random() * 1000)
                }
                cobj.list.push(sobj);
                storeid++;
            }
            rel.data.push(cobj);
        }
        return rel;
    };
});