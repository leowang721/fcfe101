
/**
 * 获取转化列表的数据
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(),
            listData = [];
        for (var i = 0; i < 0; i++) {
            listData[i] = {
                planid_name : "/<button>鲜花折\'\\\"lkj&lt;&gt;扣<a>" + i,
                unitid_name : "鲜花折扣",
                wordid_name : "鲜花折扣",
                trans : Math.round(Math.random() * 100),
                clks : Math.round(Math.random() * 100),
                paysum : fixed(Math.random() + Math.random() * 100)
            };
        }
        rel.data = listData;
        
        /**
        var temp = +prompt('是否NOTALL', 1);
        
        if (temp) {
            rel = {
                status: 400,
                errorCode: {
                    code: 1500
                }
            };
        }
        */
        
        return rel;
    };
});