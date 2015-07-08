
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    
        // return
        // {"data":{"errorList":[{"wordCode":637,"wordStr":"fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"}]},"status":600,"errorCode":{"message":"kr
        // autounit word is null","code":2003,"idx":0,"detail":null}};
    
        var rel = tpl.success();
        rel.status = 200;
    
        var groupListTmp = [];
    
        for (var i = 0; i < 8; i++) {
            var wordListTmp = [];
    
            if (i <= 5) {
                var random = Math.floor(Math.random()*20);
                for (var j = 0; j < random; j++) {
                    wordListTmp[j] = {
                        wordStr : (20 * i + j)
                                + ((j%5) ? '院线加盟' : '出资加盟一家大型滴商业电影院线要花费多少银子呢'), // 关键词字面
                        wordCode : ''// 关键词状态码：636,642
                    };
                }
            }
    
            var group = {
                seqId : i, // 顺序标识，从0-7
                planId : i <= 3 ? 100 + (i + 1) : null, // 计划ID
                planName : '娱乐休闲', // 计划名
                unitId : 102, // 单元ID
                unitName : '数字影院', // 单元名
                groupCode : -1,// (i%2==0 )?636:641,
                wordList : wordListTmp
            }
    
            groupListTmp[i] = group;
        }
        var newDate = new Date();
    
        rel.data = {
            logid : 123, // 日志标识
            krAutoUnitSessionId : newDate.getMilliseconds(),
            errorList : [{
                        wordStr : '好长超长超。。。。。。。。',
                        wordCode : 637
                    }],
            groupList : groupListTmp,
            unitNameList : ["新建单元1", "新建单元2", "新建单元3", "新建单元4", "新建单元5", "新建单元6",
                    "新建单元7", "新建单元8"]
        }
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});