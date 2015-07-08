
/**
 * 获取推广阶段及各指标的权限
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
        var rel = tpl.success(), auth = 0; // +prompt('3为无权限',
        // 0);
    
        rel.data = { // 0 : 正常，3 : 无此权限
            stages : {
                shows : 0,
                clks : 0,
                pv : auth,
                trans : auth
            },
            targets : {
                'shows' : 0,
                'clks' : 0,
                'pv' : 0,
                'trans' : 0,
                'lastofftime' : 0,
                'effwordnum' : 0,
                'leftshowrate' : 0,
                'star3numrate' : 0,
                'goodqwordnum' : 0,
                'conntime' : 0,
                'attraction' : 0
                // 其他值暂时不需要
            }
        };
    
        return rel;
    };
});