
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var random = ('' + Math.random() * 10).replace(/\D/g, ''), list = [];
    
        for (var i = 0; i < 20; i++) {
            list.push({
                        planid : 123123,
                        planname : '计划窝窝窝窝窝窝窝窝窝窝我',
                        unitid : 12312312,
                        unitname : '单元靠靠啊卡考啊啊啊卡啊喀喀喀',
                        words : [{
                                    winfoid : 12312312,
                                    showword : '1111-' + random
                                }, {
                                    winfoid : 12312312,
                                    showword : '2222-' + random
                                }, {
                                    winfoid : 12312312,
                                    showword : '3333-' + random
                                }
    
                        ]
                    });
        }
    
        rel.data = {
            listData : list
        };
    
        return rel;
    };
});