
/**
 * 展开单元获得关键词列表等信息的借口
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), list = [], wordsum = 10, i;
        var j = '0';
        for (i = 0; i < wordsum; i++) {
            j = j + i;
            list.push({
                        recmwinfoid : param.recmplanid + '-' + param.recmunitid
                                + '-' + i,
                        recmshowword : '关键词' + param.recmplanid + '--'
                                + param.recmunitid + '--' + i,
                        recmbid : j,
                        recmwmatch : 31, // 匹配模式，15：广泛，31：短语，63：精确
                        recmisdel : i % 2 // 0表示未被删除、1表示已删除
                    });
        }
    
        rel.data = {
            recmwordcount : wordsum,
            recmwordlist : list
        };
        rel.status = 200;
        // 模拟数据请求延迟
        rel.timeout = 5000;
        return rel;
    };
});