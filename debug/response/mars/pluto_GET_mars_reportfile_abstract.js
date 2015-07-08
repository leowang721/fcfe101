
/**
 * 定制报告总计
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
    
        // 将所有的clkrate加上百分号
        for (var i = 0, l = data.data['SUM'].length; i < l; i++) {
            data.data['SUM'][i]['clkrate'] = data.data['SUM'][i]['clkrate'] * 100
                    + '%';
        }
    
        rel.data = {
            sum : data.data['SUM'],
            cols : data.data['COL'],
            rownum : 100
        }
        rel.error = {};
    
        return rel;
    };
});