/**
 * 通知后端用户打开后优化包请求模拟
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var debugUtil = storage.get('debugUtil');
    if (!debugUtil) {
        var debugUtil = {};
        storage.set('debugUtil', debugUtil);
    }

    module.exports = function (path, param) {
        var rel = tpl.success();
        var pkgIds = param.pkgids;
    
        var viewAoPkgMap = debugUtil.viewAoPkgMap;
        if (!viewAoPkgMap) {
            viewAoPkgMap = {};
            debugUtil.viewAoPkgMap = viewAoPkgMap;
        }
    
        var viewPkgNum;
        for (var i = 0, len = pkgIds.length; i < len; i ++) {
            viewPkgNum = viewAoPkgMap[pkgIds[i]];
            if (typeof viewPkgNum === 'undefined') {
                viewPkgNum = 0;
            }
            viewPkgNum += 1;
            viewAoPkgMap[pkgIds[i]] = viewPkgNum;
        }
    
        return rel;
    };
});