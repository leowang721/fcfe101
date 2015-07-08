define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var debugUtil = storage.get('debugUtil');
    if (!debugUtil) {
        var debugUtil = {};
        storage.set('debugUtil', debugUtil);
    }
    var kslfData1 = storage.get('kslfData1');
    if (kslfData1 === undefined) {
        kslfData1 = 0;
        storage.set('kslfData1', 0);
    }

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var viewInfoMap = debugUtil.viewAoPkgMap || {};
        function getViewBoxFlag(pkgId, flag) {
            flag = flag || 0;
            var num = viewInfoMap[pkgId] || 0;
            return num >= 2 ? 0 : flag;
        }
    
        var command = param.command;
        if (command == 'start') {
            kslfData1 = 0;
        }
        rel.data = {
            aostatus : kslfData1 < 2 ? 1 : 0,
            reqid : '1234',
            aoPackageItems : [{
                pkgid : 4,
                newoptnum : kslfData1 < 2 ? 1 : 2,
                viewBoxFlag: getViewBoxFlag(4, 2), // 升级包//新增用来标识优化包的提醒框展示样式，0=正常包1=新包，2=更新包
                data : {
                    proctime : new Date().valueOf(),
                    probwordnum : 134,
                    globalId : '123',
                    noleftscreennum: Math.ceil(Math.random() * 50), // 不在左侧词个数
                    budgetnotenoughnum: Math.ceil(Math.random() * 50), // 预算不足个数
                    showqlownum: Math.ceil(Math.random() * 50), // 质量度过低
                    searchnoeffnum: Math.ceil(Math.random() * 50), // 搜索无效
                    searchlownum: Math.ceil(Math.random() * 50), // 搜索量过低
                    rankdownnum: Math.ceil(Math.random() * 50) // 下降个数
                }
            }, {
                pkgid : 2,
                newoptnum : 3,
                data : {
                    totalclklost : '8000',
                    globalId : '123'
                }
            }, {
                pkgid : 3,
                newoptnum : 4,
                data : {
                    startype : '3',
                    num : '72',
                    totalnum : '258',
                    globalId : '123'
                }
            }, {
                pkgid : 1,
                newoptnum : 12,
                data : {
                    decrtype : 'shows',
                    beginvalue : '258',
                    endvalue : '186',
                    datetype : 0,
                    globalId : '123'
                    // 0表示节假日，1表示工作日
                }
            }, {
                pkgid : 5,
                newoptnum : kslfData1 < 2 ? -1 : 6,
                data : {
                    totalwordsnum : '300',
                    globalId : '123'
                }
            }, {
                pkgid : 6,
                newoptnum : kslfData1 < 2 ? -1 : '3',
                data : {
                    percent : "30",//parseInt(Ma//(parseInt(Math.random() * 10) % 2 + 1) + ""th.random() * 100) + "",
                    tiptype : '2',//(parseInt(Math.random() * 10) % 2 + 1) + ""
                    globalId : '123'
                }
            }, { // 突降急救包升级版
                pkgid : 7,
                newoptnum : kslfData1 < 2 ? -1 : '25',
                data : {
                    beginvalue : '358',
                    endvalue : '196',
                    begindate: '' + ((new Date()).getTime() - 1000000000),
                    enddate: (new Date()).getTime(),
                    globalId : '123'
                }
            }, { // 移动包
                pkgid : 8,
                viewBoxFlag: getViewBoxFlag(8, 1),
                newoptnum : kslfData1 < 2 ? -1 : '7',
                data : {
                    //没有
                }
            }, {
                pkgid: 9, // 旺季包
                viewBoxFlag: getViewBoxFlag(9, 1),
                newoptnum : kslfData1 < 2 ? -1 : '8',
                data : {
                    beforepeaknum: '2',
                    inpeaknum: '1',
                    afterpeaknum: 1,
                    tradename: '西藏旅游',
                    tradepvratio: '15'
                }
            }, {
                pkgid: 10, // 转化提升包
                viewBoxFlag: getViewBoxFlag(10, 1),
                newoptnum : kslfData1 < 2 ? -1 : '9'
            }]
        };
    
        kslfData1++;
    //    rel.timeout = 5000;
    
        return rel;
    };
});