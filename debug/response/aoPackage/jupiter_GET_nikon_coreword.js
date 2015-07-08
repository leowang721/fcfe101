
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            aostatus: 0,
            corewords: [],
            corewordmaxsize: 50//Math.ceil(Math.random() * 200 + 60)
        };
    
        var existedNum = 48;//Math.ceil(Math.random() * 260);
        for (var i = 0; i < existedNum; i++) {
            rel.data.corewords.push({
                        winfoid : i,
                        showword : i + '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的重点词',
                        unitid : 1000 + i,
                        unitname : (1000 + i)
                                + '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的单元',
                        planid : 10000 + i,
                        planname : (10000 + i)
                                + '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的计划'
                    });
        }
    
        return rel;
    };
});