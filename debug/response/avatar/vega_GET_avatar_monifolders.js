define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        //    rel.status = 500;
        var relList = [];
        var len = Math.round(Math.random() * 100) % 5;
        var len = 2;
        for (var j = 0; j < len; j++) {
            relList[j] = {
                'folderid': j + 100,
                'foldername' : '<button name="test">关键词</button><button>关键词</button><button>关键词</button><button>关键词</button>' + j,
                'fstat' : Math.round(Math.random() * 100) % 2,
                'moniwordcount' : 0,//为测试监控文件夹关键词为0而修改        by mayue@baidu.com
                'clks' : Math.round(Math.random() * 100),
                'shows' : Math.round(Math.random() * 100),
                'paysum' : Math.round(Math.random() * 100)
            };
        }
        rel.data.listData = relList;
        return rel;
    };
});