
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // return
        // {"data":{"groupList":[{"seqId":1,"planName":"yc_test","planId":21603722,"wordList":[{"selected":false,"wordCode":636,"wordStr":"真丝手绢"}],"unitId":95644402,"groupCode":-1,"unitName":"yc1"},{"seqId":2,"planName":"yc_test","planId":21603722,"wordList":[{"selected":false,"wordCode":636,"wordStr":"鲜花售卖2"}],"unitId":93951030,"groupCode":-1,"unitName":"yc2"},{"seqId":0,"planName":"新建计划","planId":21607655,"wordList":[{"selected":false,"wordCode":636,"wordStr":"苹果手机"},{"selected":false,"wordCode":636,"wordStr":"android手机"},{"selected":false,"wordCode":636,"wordStr":"迷你手机"}],"unitId":95647204,"groupCode":-1,"unitName":"新建单元1"},{"seqId":3,"planName":"新建计划","planId":-1,"wordList":[{"selected":false,"wordCode":-1,"wordStr":"速递1"},{"selected":false,"wordCode":-1,"wordStr":"速递3"},{"selected":false,"wordCode":-1,"wordStr":"速递4"},{"selected":false,"wordCode":-1,"wordStr":"速递2"}],"unitId":95647405,"groupCode":-1,"unitName":"新建单元5"},{"seqId":4,"planName":"新建计划","planId":-1,"wordList":[{"selected":false,"wordCode":-1,"wordStr":"啤酒"},{"selected":false,"wordCode":-1,"wordStr":"高档钢笔"},{"selected":false,"wordCode":-1,"wordStr":"花儿售卖"}],"unitId":-1,"groupCode":500,"unitName":"新建单元5"},{"seqId":5,"planName":"","planId":-1,"wordList":[],"unitId":-1,"groupCode":-1,"unitName":""},{"seqId":6,"planName":"","planId":-1,"wordList":[],"unitId":-1,"groupCode":-1,"unitName":""},{"seqId":7,"planName":"","planId":-1,"wordList":[],"unitId":-1,"groupCode":-1,"unitName":""}]},"status":300,"errorCode":null};
    
        var rel = tpl.success();
        rel.status = 300;
    
        var groupListTmp = [];
    
        for (var i = 0; i < 8; i++) {
            var wordListTmp = [];
    
            for (var j = 0; j < 7; j++) {
                wordListTmp[j] = {
                    selected : false,
                    wordStr : '院线加盟' + (3 * i + j), // 关键词字面
                    wordCode : (j % 2 == 0) ? 634 : 635
                };
            }
    
            var group = {
                seqId : i, // 顺序标识，从0-7
                planId : i <= 3 ? 100 + (i + 1) : null, // 计划ID
                planName : '娱乐休闲', // 计划名
                unitId : 102, // 单元ID
                unitName : '数字影院', // 单元名
                groupCode : (i % 2 == 0) ? 405 : 502,
                wordList : wordListTmp
            };
    
            groupListTmp.push(group);
        }
    
        rel.data = {
            logid : 123, // 日志标识
    
            groupList : groupListTmp
    
        };
    
        rel.errorCode = {
            code : 2011
        };
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    
    };
});