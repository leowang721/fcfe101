
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), start = 1000, data;
        switch (param.type) {
            case 'shows' :
                start = 1000;
                break;
            case 'clks' :
                start = 2000;
                break;
            case 'pv' :
                start = 3000;
                break;
        }
        if (param.level == 'useracct') {
            data = {
                listData : [{
                            beginvalue : 12000,
                            endvalue : kslftestdata == 1 ? 3333 : 11111,
                            decr : 8667
                        }]
            };
        } else {
            var listData = [];
            for (var i = 0; i < 20; i++) {
                listData.push({
                            winfoid : start + i,
                            showword : '啊a啊啊啊啊啊啊啊啊啊啊啊啊<button>关键字' + (start + i)
                                    + '就看见了进我空间看我就快乐健康',
                            unitid : start + i + 101,
                            unitname : '<button>这个长单元' + (start + i + 101)
                                    + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                            planid : start + i + 100,
                            planname : '<button>长计划' + (start + i + 100)
                                    + '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                            beginvalue : 1000 * (i + 1),
                            endvalue : 3000 * (i + 1),
                            decr : 3000 * (i + 1) - 1000 * (i + 1)
                        });
            }
            data = {
                listData : listData
            }
        }
        rel.data = data;
        return rel;
    };
});