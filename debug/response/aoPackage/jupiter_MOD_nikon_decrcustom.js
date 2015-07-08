
/**
 * 模拟突降急救包升级版修改突降阈值的数据接口
 * @author wuhuiyao (wuhuiyao@baidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        kslftestdata = kslftestdata == 0 ? 1 : 0;
    
        //    rel.status = 400;
        // rel.timeout = 1500;
        return rel;
    };
});