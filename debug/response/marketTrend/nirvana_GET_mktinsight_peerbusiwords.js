
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = [{
                        id : 1,
                        word : 'dj舞曲',
                        value : 20009
                    }, {
                        id : 2,
                        word : 'mp4电影下载',
                        value : 30008
                    }, {
                        id : 3,
                        word : '麻辣女兵电视',
                        value : 50007
                    }, {
                        id : 4,
                        word : '吸血鬼日记',
                        value : 90006
                    }, {
                        id : 5,
                        word : '周杰伦十二新作',
                        value : 40005
                    }];
        return rel;
    };
});