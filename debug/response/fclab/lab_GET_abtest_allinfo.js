
/**
 * 获取实验信息
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            "data": {
                "labid": 123,
                "labname": "我的实验室",
                "duration": 5, //持续时间，默认3周，后台传的单位为天，换算成周以后才能传入该action
                "ratio": 70, //实验流量比例,20%的话，为20，默认50%
                "labtype": 1, //实验类型，1：出价，默认为出价
                "focus": 2, //关注指标,1,2,4(点击，展现，转化),位表示那些关注那些指标，默认为点击
                "labstat": 1, //实验状态,2(立即开始)，1(保存未开始)
                "abwordlist": []//实验对象
            },
            "status": 200,
            "errorCode": null
        }
        return rel;
    };
});