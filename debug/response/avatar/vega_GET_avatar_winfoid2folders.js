
/**
 * 获得一批关键词所属的监控文件夹列表
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            1 : [{
                        folderid : 321,
                        foldername : "监控文件夹"
                    }, {
                        folderid : 322,
                        foldername : "监控文件夹关键词所属"
                    }],
            2 : [{
                        folderid : 323,
                        foldername : "监控文件夹"
                    }, {
                        folderid : 324,
                        foldername : "监控文件夹关键词所属"
                    }],
            3 : [{folderid:325, foldername: "监控文件夹"},{folderid:326, foldername: "监控文件夹关键词所属"}],
            39 : [{folderid:321, foldername: "监控文件夹"},{folderid:322, foldername: "监控文件夹关键词所属"}],
            73 : [{folderid:323, foldername: "监控文件夹"},{folderid:324, foldername: "监控文件夹关键词所属"}],
            17 : [{folderid:325, foldername: "监控文件夹"},{folderid:326, foldername: "监控文件夹关键词所属"}]
            
        }
        return rel;
    };
});