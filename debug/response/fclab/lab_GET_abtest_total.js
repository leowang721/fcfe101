
/**
 * 获取abtest数据统计信息
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            sort: {
                "all": 120,//全部实验
                "new": 24,//未开始
                "doing": 34,//试验中
                "done": 22//已完成
            },
            allcnt: {
                "testcnt": 23,//当前试验数量
                "alltestcnt": 24,//累计实验数量
                "mtlcnt": 213, // 当前实验对象数量
                "allmtlcnt": 2134 // 累计实验对象数量
            }
        }
    
        return rel;
    };
});