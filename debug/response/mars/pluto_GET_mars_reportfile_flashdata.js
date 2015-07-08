
/**
 * 定制报告图表
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
        var rel = tpl.success(), param = {
            reportinfo : {
                dataitem : param.dataitemIdx
            }
        };
    
        // 使用实时报告的接口生成
        var data = this.pluto_GET_mars_reportdata(level, param);
        rel.data = data.data['DATA'];
    
        rel.error = {};
    
        return rel;
    };
});