
/**
 * 查询关键词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var listData = [];
        for (var i = 0; i < 15; i++)
            listData.push({
                        showword : 'a',
                        winfoid : i,
    
                        planid : i + 100,
                        planname : 'aa',
    
                        unitid : i + 1000,
                        unitname : 'aaa'
                    })
        return {
            status : 200,
            data : {
                listData : listData,
                notFound : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                        '11', '12']
            }
        }
    };
});