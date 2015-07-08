/**
 * 获取abtest实验数据
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    //    rel.status = 400;
        var maxLen = Math.floor(Math.random() * 100) % 6;
        var data = []
        for (var i = 0; i < maxLen; i++) {
            data[data.length] = {
                labid: 124 + i,                //实验id
                labstat: Math.floor(Math.random() * 100) % 3 + 1,    //试验状态1 / 2 / 3  ：未开始/进行中/已完成
                labname: "实验test" + i,        //实验名称
                mtlcnt: 232,            //关键词数量
                labtype: 1,                    //实验类型（出价为1 or URL（暂不支持））
                //持续时长（单位为天，一定是7的整数倍,大于等于1周小于等于8周）
                duration: (Math.floor(Math.random() * 100) % 8 + 1) * 7,
                efftime: "2012-12-11",        //生效时间
                passday: 12,                //已实验天数
                ratio: 20,                    //流量分布
                focus: 2,                    //关注指标,0,2,4(点击，展现，转化)
                show: 1223,                    //实验组展现
                click: 20,                    //实验组点击
                trans: 3,                    //实验组转化
                pay: 50,                    //实验组消费（元）
                oshow: 122,                    //对照组展现
                oclick: 10,                    //对照组点击
                otrans: 1,                    //对照组转化
                opay: 20                    //对照组消费
            }
        }
        rel.data = data;
        return rel;
    };
});