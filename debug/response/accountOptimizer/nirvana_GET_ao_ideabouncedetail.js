
/**
 * 创意跳出率较高详情
 * 
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            status: 200,
            data: {
                signature : 'IU！%RUHA',
                aostatus : 0,
                totalnum : 120,
                returnnum :  param.endindex - param.startindex,
                timestamp : 127831067988222,
                listData : []
            }
        };
        var listData = [];
        for (var i = param.startindex; i <= param.endindex; i++) {
            listData.push({
                        planid : i,
                        planname : '创意跳出率<button>这个长计划' + i + '啊啊啊啊啊啊啊啊啊',
                        unitid : i,
                        unitname : '创意跳出率<button>这个长单元' + i + '啊啊啊啊啊啊啊啊啊',
                        ideaid : i,
                        idea : '创意跳出率<button>这个长创意' + i + '啊啊啊啊啊啊啊啊啊',
                        title : '题目' + i,
                        desc1 : '描述(1)' + i,
                        desc2 : '描述(2)' + i,
                        url : 'http://www.baidu.com/' + i,
                        showurl : 'http://www.baidu.com/' + i,
                        ideastat : i,
                        shadow_ideaid : i,
                        shadow_title : 'shadow题目' + i,
                        shadow_desc1 : 'shadow描述(1)' + i,
                        shadow_desc2 : 'shadow描述(2)' + i,
                        shadow_url : 'http://www.baidu.com/' + i,
                        shadow_showurl : 'http://www.baidu.com/' + i,
                        shadow_ideastat : i,
                        bouncerate : '30%'
                    });
        }
    
        rel.data.listData = listData;
    
        return rel;
    };
});