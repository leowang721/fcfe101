
/**
 * 请求关键词自动分组信息请求模拟
 * @author wuhuiyao@baidu.com
 * @date 20130620
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
    
        var groupListTmp = [];
    
        var planName;
        var unitName;
        var planId;
        var unitId;
        var wordStrMap = {
            0: '出资加盟一家大型滴商业电影院线要花费多少银子呢出资加盟一家大型滴商业电影院线要花费多少银子呢出资加盟一家大型滴商业电影院线要花费多少银子呢出资加盟一家大型滴商业电影院线要花费多少银子呢出资加盟一家大型滴商业电影院线要花费多少银子呢',
            1: '出资加盟一家大型滴商业电影院线要花费多少银子呢',
            2: 'abc',
            3: 'ssdfsldf2sdfkslfk23sewerwsslfxsfsjflwjoeirwoerowrejwoeiwooooooooeweoiweiwoefkslfjslfksflweiwerwrwrewerwr',
            4: '院线加盟'
        };
    
        var groupCodes = [
            -1, 400, 643, 451, 452, 513, 641, 500,
            501, 502, 511, 405, 503, 504, 3, 5, 999
        ];
    
        var wordCodes = [-1, 636, 634, 635, 888];
    
        for (var i = 0; i < 20; i++) {
            var wordListTmp = [];
    
            //        if (i <= 5) {
            var random = 10;//Math.floor(Math.random()* 120);
            for (var j = 0; j < random; j++) {
                wordListTmp[j] = {
                    wordStr : (20 * i + j)
                        + wordStrMap[j % 5], // 关键词字面
                    wordMatch: [63, 31, 15][j % 3],
                    wordCtrl: [0, 1, 3][j % 3],
                    wordBid: j + 1,
                    wordCode : wordCodes[ j % wordCodes.length],
    
                    // 打折词新增
                    uuid: '' + parseInt(Math.random() * 100000),
                    wordRatio: '' + Number(Math.random() * 10).toFixed(1), // 打折的折扣
                    discountBeginDate: '2013-08-01',// 打折开始时间
                    discountEndDate: '2013-08-31' //打折结束时间
                };
            }
            //        }
    
            planName = '娱乐休闲' + i % 5;
            if (i % 2) {
                planName += '娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲娱乐休闲'
            }
            planId = i % 2 ? 100 + (i + 1) : -1;
            if (planId !== -1) {
                unitId = parseInt(Math.random() * 100) % 2 ? 1000 + (i + 1) : -1;
            }
            else {
                unitId = -1;
            }
            unitName = '数字影院' + parseInt(Math.random() * 1000);
            if (i % 2) {
                unitName += '数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院数字影院'
            }
            var group = {
                seqId : i, // 顺序标识，从0-7
                planId : planId, // 计划ID
                planName : planName, // 计划名
                unitId : unitId, // 单元ID
                unitName : unitName, // 单元名
                groupCode : groupCodes[ i % groupCodes.length ],
                wordList : wordListTmp
            }
    
            groupListTmp[i] = group;
        }
        var newDate = new Date();
    
        rel.data = {
            logid : 123, // 日志标识
            krAutoUnitSessionId : newDate.getMilliseconds(),
            errorList : [{
                wordStr : '好长超长超<input type="text" />。。。。。。。。',
                wordCode : 637
            },{
                wordStr : 'tesesg好长超长超<input type="text" />。。。。。。。。',
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