
// 批量添加创意获取单元 mayue@baidu.com
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            listData : [{
                        planid : 3,
                        planname : "鲜花",
                        unitlist : [{
                                    unitid : 45,
                                    unitname : "玫瑰"
                                }, {
                                    unitid : 46,
                                    unitname : "康乃馨"
                                }, {
                                    unitid : 48,
                                    unitname : "紫罗兰"
                                }, {
                                    unitid : 49,
                                    unitname : "铁树"
                                }]
                    }, {
                        planid : 9,
                        planname : "野生",
                        unitlist : [{
                                    unitid : 90,
                                    unitname : "牵牛"
                                }, {
                                    unitid : 98,
                                    unitname : "蒲公英"
                                }]
                    }]
        }
        return rel;
    
    };
});