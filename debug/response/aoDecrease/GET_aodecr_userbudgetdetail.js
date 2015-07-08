
/**
 * 效果突降 获取账户层级预算详情
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {
            totalnum : 100,
            returnnum : 100,
            timestamp : '20110101010',
            listData : [{ // 用来存储账户层级预算数据信息
                bgttype : 1, // 预算类型
                daybgtdata : { // 存储日预算基础数据与分析数据
                    daybgtvalue : 777.77, // 值
                    dayanalyze : { // 日预算分析数据
                        tip : 5,
                        // 0 不提示 hasproblem = 0, priority = 0
                        // 1 预算合理 hasproblem = 0, priority = 0
                        // 2 日预算风险 hasproblem = 1, priority = 1
                        // 3 需提供日预算建议 hasproblem = 1 , priority = 2
                        // 4 需提供周预算建议 hasproblem = 1 , priority = 2
                        // 5 需要恢复 某日的预算
    
                        suggestbudget : 0,// 建议预算点
                        maxbudget : 999,
                        lostclicks : 100,// 损失点击数
                        startpoint : [0, 0], // 存放起点
                        endpoint : [1000, 1000], // 存放终点
                        budgetpoint : [50, 50], // 预算点
                        keypoints : [ // 存放七个关键点
                        [767.5, 55.11], [772, 58.32], [775.5, 60.43], [797, 70.97],
                                [816, 77.96], [816, 77.96], [873.1, 78.57]],
                        incitermsg : [ // 存放同行激励信息
                        ['00:00:00', 0, '0'], // 起点
                                ['00:05:00', 10, '24000'], // 自身点
                                ['23:55:00', 351, '36000'], // 优质客户点
                                ['23:55:00', 360, '0'] // 终点
                        ],
                        show_encourage : 1, // 是否提示同行激励
                        model_num : 5,
                        words : '你好/你坏', // 核心关键词面值字面串，以/分隔
                        wordids : "1" // 核心关键词id值
                    }
                },
                weekbgtdata : { // 存储周预算基础数据与分析数据
                    weekbgtvalue : 8888.88, // 周预算值
                    wbdvalue : { // 周预算分配数据
                        tiptype : 0, // tipType取值范围{0：无提示,1：提示点击增加,2：提示风险}
                        incclicks : 99,// 增加点击数
                        barlist : [ // 存储分配柱状条数据信息，共7条bar信息
                        {        // bar，用来存储柱状条数据信息
                            type : 2, // Type标识柱状条数据类型取值{1：预算,2：消费}
                            data : 0
                                // 当天分配的预算
                        }, {    // bar，用来存储柱状条数据信息
                                    type : 2, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data : 66
                                    // 当天分配的预算
                                }, { // bar，用来存储柱状条数据信息
                                    type : 2, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data : 77
                                    // 当天分配的预算
                                }, { // bar，用来存储柱状条数据信息
                                    type : 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data : 88
                                    // 当天分配的预算
                                }, { // bar，用来存储柱状条数据信息
                                    type : 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data : 99
                                    // 当天分配的预算
                                }, { // bar，用来存储柱状条数据信息
                                    type : 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data : 99
                                    // 当天分配的预算
                                }, { // bar，用来存储柱状条数据信息
                                    type : 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data : 99
                                    // 当天分配的预算
                                }]
                    },
                    weekanalyze : { // 周预算分析数据，格式与dayanalyze相同，只填写周预算分析的内容。此处略
                        tip : 4,
                        // 0 不提示 hasproblem = 0, priority = 0
                        // 1 预算合理 hasproblem = 0, priority = 0
                        // 2 日预算风险 hasproblem = 1, priority = 1
                        // 3 需提供日预算建议 hasproblem = 1 , priority = 2
                        // 4 需提供周预算建议 hasproblem = 1 , priority = 2
                        suggestbudget : 10000,// 建议预算点
                        lostclicks : 100,// 损失点击数
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
                        ]
                    },
                    istargetuser : 0
                    // 是否为目标用户 0：不是目标用户，1：是目标用户
                }
            }]
        };
        return rel;
    };
});