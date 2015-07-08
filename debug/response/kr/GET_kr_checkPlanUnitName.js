
/**
 * 验证计划单元名称的有效性请求模拟：重命名计划/单元名称；添加新计划/单元名称
 * @author wuhuiyao@baidu.com
 * @date 20130620
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
    
        var isPlanRename = param.isPlanRenameFlag;
        rel.errorCode = {};
        var errorCode = rel.errorCode;
    
        if (isPlanRename) {
            errorCode.code = 400;
        }
        else {
            // errorCode.code = 502;
        }
    
        rel.data = {
            logid : 123, // 日志标识
            data : {}
        };
        rel.timeout = 1000;
        return rel;
    
    };
});