/**
 * 计划层级预算详情
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.errorCode = 0;
        rel.data = {
            totalnum : param.condition.planid.length,
            returnnum : 100,
            timestamp : '20110101010',
            listData : [{ // 用来存储账户层级预算数据信息
                bgttype : 1, // 预算类型
                daybgtdata : { // 存储日预算基础数据与分析数据
                    daybgtvalue : 666.66, // 值
                    dayanalyze : { // 日预算分析数据
                        tip : 3,
                        // 0 不提示 hasproblem = 0, priority = 0
                        // 1 预算合理 hasproblem = 0, priority = 0
                        // 2 日预算风险 hasproblem = 1, priority = 1
                        // 3 需提供日预算建议 hasproblem = 1 , priority = 2
                        // 4 需提供周预算建议 hasproblem = 1 , priority = 2
                        suggestbudget : 1000,// 建议预算点
                        lostclicks : 100,// 损失点击数
                        retripercent: 23, // 可挽回点击数,为0时候不展现额外的话术,升级预算话术新增 2013.3.19 by Huiyao
                        startpoint : [0, 0], // 存放起点
                        endpoint : [1000, 1000], // 存放终点
                        budgetpoint : [50, 50], // 预算点
                        keypoints : [ // 存放七个关键点
                        [767.5, 55.11], [772, 58.32], [775.5, 60.43], [797, 70.97],
                                [816, 77.96], [816, 77.96], [873.1, 78.57]],
                        incitermsg : [ // 存放同行激励信息
                        ['02:05:00', 7500, '0'], // 起点
                                ['06:55:00', 24900, '240'], // 自身点
                                ['09:00:02', 42400, '360'], // 优质客户点
                                ['23:33:00', 107800, '0'] // 终点
                        ],
                        show_encourage : 1, // 是否提示同行激励
                        model_num : 5,
                        words : '你好/你坏', // 核心关键词面值字面串，以/分隔
                        wordids : [1, 2]
                        // 核心关键词id值
                    }
                },
                // weekbgtdata : { weekbgtvalue : 333.33 }
                weekbgtdata : null
            }]
    
        }
    
        // rel.data =
        // {"timestamp":1315982065000,"listData":[{"bgttype":0,"daybgtdata":null,"weekbgtdata":null}],"totalnum":0,"returnnum":0,"signature":"419136226857159471","aostatus":2}
        return rel;
    };
});