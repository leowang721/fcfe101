
/**
 * 获取某个层级物料数据（包括已删除数据）
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var materialData = {
        useracct: require('../../materialData/account').data,
        planinfo: require('../../materialData/plan').data,
        unitinfo: require('../../materialData/unit').data,
        wordinfo: require('../../materialData/keyword').data,
        ideainfo: require('../../materialData/idea').data,
        creativeIdeaInfo: require('../../materialData/creative').data
    };

    module.exports = function (path, param) {
        var rel = tpl.success();
        var type = param.creativetype;
        var level = param.level;
        //    rel.status = 500;
        if (param.isdel.length > 1) {
            rel.status = 800;
        }
        level = (level == "creativeinfo" || level == "creativeideainfo") ? "creativeIdeaInfo" : level;
                
        var l = Math.round(Math.random() * 100) % 10;
        var l = 70;
        rel.data.listData = [];
        for (var j = 0; j < l; j++) {
            rel.data.listData[j] = {};
            for (var i = 0, len = param.fields.length; i < len; i++) {
                if(param.fields[i] == 'content'){
                   rel.data.listData[j][param.fields[i]] = materialData[level][param.fields[i]][type](j);
                    
                }
                else{
                    rel.data.listData[j][param.fields[i]] = materialData[level][param.fields[i]](j);
                
                }
                rel.data.listData[j].isdel = 1;
            }
        }
        return rel;
    };
});