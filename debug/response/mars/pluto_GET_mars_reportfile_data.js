
/**
 * 定制报告数据
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), reportParam = {
            reportinfo : {
    
            }
        };
    
        // 使用实时报告的接口生成
        var data = this.pluto_GET_mars_reportdata(level, reportParam);
        rel.data = data.data['DATA'];
        // 取翻页
    
        var offset = (param.curPage - 1) * param.pageSize;
        rel.data = rel.data.slice(offset, offset + param.pageSize);
    
        // 将所有的clkrate加上百分号
        for (var i = 0, l = rel.data.length; i < l; i++) {
            rel.data[i]['clkrate'] = rel.data[i]['clkrate'] * 100 + '%';
        }
    
        rel.error = {};
    
        return rel;
    };
});