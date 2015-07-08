
/**
 * 关键词分组升级新增接口数据请求模拟
 */
/**
 * 保存关键词自动分组/拖拽关键词分组验证请求模拟
 * @author wuhuiyao@baidu.com
 * @date 20130620
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 300;
    
        var reqGroupList = baidu.object.clone(param.groupList);
    
        var groupCodes = [
            -1, 400, 643, 451, 452, 513, 641, 500,
            501, 502, 511, 405, 503, 504, 3, 5, 999
        ];
    
        var wordCodes = [-1, 636, 634, 635, 888];
        var group;
        var wordList;
        var wIdx;
        for (var i = 0, len = reqGroupList.length; i < len; i++) {
            group = reqGroupList[i];
            group.groupCode = groupCodes[i % groupCodes.length];
            wordList = group.wordList;
    
            for (wIdx = wordList.length; wIdx --;) {
                wordList[wIdx].wordCode = wordCodes[ wIdx % wordCodes.length ];
            }
        }
    
        rel.data = {
            logid : 123, // 日志标识
    
            groupList : reqGroupList
    
        };
    
        rel.errorCode = {
            code : 2011
        };
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    
    };
});