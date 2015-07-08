
/**
 * 请求生成重点词优化包的重点词模拟接口
 * 
 * @author Wu Huiyao(wuhuiyao@baidu.com)
 */
/*Requester.debug.ADD_nikon_generatecoreword = function(p1, params) {
    var rel = tpl.success(), aostatusArr = [0, 1, 3, 100], idx = -1;

    // 随机产生一个aostatus
    while (idx > 3 || idx < 0) {
        idx = Math.ceil(Math.random() * 4) - 1;
    }

    // 状态，0: 正常，1: 处理中，3: 处理失败，100: 参数错误
    rel.data.aostatus = 0;// aostatusArr[idx];

    rel.timeout = 1000;
    return rel;
};*/
/**
 * 请求优化包的权限模拟接口
 * 
 * @author Wu Huiyao(wuhuiyao@baidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        // 状态，0: 正常，1: 处理中，3: 处理失败，100: 参数错误
        rel.data.aostatus = 0;
    
        // if (Math.ceil(Math.random() * 2) % 2) {
        rel.data.auth = '[1,2,3,4,5,6, 25]';
        // } else {
        // rel.data.auth = [1,2,3];
        // }
    
        return rel;
    };
});