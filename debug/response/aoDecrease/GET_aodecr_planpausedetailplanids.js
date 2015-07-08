
/**
 * 暂停推广计划ids
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            signature : 'IU！%RUHA', // 签名，用于记录一组condition状态
            aostatus : 0
            // 请求状态，0-处理正常，1-请求格式错误，2-系统内部错误，3-任务队列已满，请重试，4-需要更详细的请求数据，不只是签名
        }, planid = [], i;
    
        for (i = param.startindex; i <= param.endindex; i++) {
            planid.push(i);
        }
    
        data.planid = planid;
        rel.data = data;
    
        return rel;
    };
});