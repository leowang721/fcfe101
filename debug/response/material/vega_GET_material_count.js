
/**
 * 获取物料数量
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var level = param.level;
        switch(level){
            case "planinfo":
                rel.data = 100;
            case "unitinfo":
                rel.data = 1000;
            case "wordinfo":
                rel.data = 5000;
            case "ideainfo":
                rel.data = 50;
        }
        return rel;
    };
});