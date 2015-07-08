
/**
 * 获取各状态下的物料列表
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var list = [];
        for (var i = 0; i < 5; i++) {
            list[i] = {
                labwinfoid: 1212 + i, // 唯一id
                labid: param.labid, // labid
                winfoid: 2121 + i, // 关键词id
                showword: Math.random() < .8 ? ("232关键词" + i) : void 0,
                stat: param.stat, // 状态 // 1/2/3/4 - 推荐实验组/推荐对照组/继续观察/调整完成
                //只有stat为4时需要用到status字段，此时status字段值为4、5、6,7。status的1、2、3对应stat的1、2、3
                status: 7, //0 / 1 / 2 / 3 / 4 / 5 / 6/7, 实验中/新增保存/完成实验/停止实验/应用实验组/应用对照组/推广管理设置/关键词被删除
                degree: 99.70, // 置信度具体数值
                level: 1, // 置信度分档
                suggestion: "我是结论", // 结论分析
                bid: 21.2, // 出价
                obid: 21.2, // 参加实验室出价
                show: 32,
                oshow: 32,
    
                click: 1,
                oclick: 1,
    
                pay: 20,
                opay: 20,
    
                trans: 1,
                otrans: 1,
    
                avgprice: 121,
                oavgprice: 121,
    
                clickrate: "21%",
                oclickrate: "21%"
            };
        }
        var rel = {
            "data": list,
            "sum": {
                show: 1223,                    //实验组展现
                click: 20,                    //实验组点击
                trans: 3,                    //实验组转化
                pay: 50,                    //实验组消费（元）
                oshow: 122,                    //对照组展现
                oclick: 10,                    //对照组点击
                otrans: 1,                    //对照组转化
                opay: 20                    //对照组消费
            },
            "status": 200,
            "errorCode": null
        }
        return rel;
    };
});