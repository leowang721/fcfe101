/**
 * 用户层级预算详情
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        /*
         * rel.data = { "timestamp":0, "listData":[ { "daybgtdata":null,
         * "weekbgtdata":{ "weekbgtvalue":10000.0, "wbdvalue":{ "tiptype":null,
         * "incclicks":null, "barlist":[ {"type":2,"data":60.0},
         * {"type":2,"data":30.0}, {"type":2,"data":40.0}, {"type":1,"data":30.0},
         * {"type":1,"data":30.0}, {"type":1,"data":30.0}, {"type":1,"data":30.0} ] },
         * "weekanalyze":null, "istargetuser":0 }, "bgttype":2 } ] }
         */
        rel.data = {
            totalnum: 100,
            returnnum: 100,
            timestamp: '20110101010',
            listData: [
                { // 用来存储账户层级预算数据信息
                    bgttype: 2, // 预算类型
                    daybgtdata: { // 存储日预算基础数据与分析数据
                        daybgtvalue: 777.77, // 值
                        dayanalyze: { // 日预算分析数据
                            tip: 3,
                            // 0 不提示 hasproblem = 0, priority = 0
                            // 1 预算合理 hasproblem = 0, priority = 0
                            // 2 日预算风险 hasproblem = 1, priority = 1
                            // 3 需提供日预算建议 hasproblem = 1 , priority = 2
                            // 4 需提供周预算建议 hasproblem = 1 , priority = 2
                            // 5 需要恢复 某日的预算
    
                            suggestbudget: 1000,// 建议预算点
                            maxbudget: 999,
                            lostclicks: 100,// 损失点击数
                            retripercent: 23, // 可挽回点击数,为0时候不展现额外的话术,升级预算话术新增 2013.3.19 by Huiyao
                            startpoint: [0, 0], // 存放起点
                            endpoint: [1000, 1000], // 存放终点
                            budgetpoint: [50, 50], // 预算点
                            keypoints: [ // 存放七个关键点
                                [767.5, 55.11],
                                [772, 58.32],
                                [775.5, 60.43],
                                [797, 70.97],
                                [816, 77.96],
                                [816, 77.96],
                                [873.1, 78.57]
                            ],
                            incitermsg: [ // 存放同行激励信息
                                ['00:00:00', 0, '0'], // 起点
                                ['00:05:00', 10, '24000'], // 自身点
                                ['23:55:00', 351, '36000'], // 优质客户点
                                ['23:55:00', 360, '0'] // 终点
                            ],
                            show_encourage: 1, // 是否提示同行激励
                            model_num: 5,
                            words: '你好/你坏', // 核心关键词面值字面串，以/分隔
                            wordids: "1" // 核心关键词id值
                        }
                    },
                    weekbgtdata: { // 存储周预算基础数据与分析数据
                        weekbgtvalue: 8888.88, // 周预算值
                        wbdvalue: { // 周预算分配数据
                            tiptype: 2, // tipType取值范围{0：无提示,1：提示点击增加,2：提示风险}
                            incclicks: 99,// 增加点击数
                            barlist: [ // 存储分配柱状条数据信息，共7条bar信息
                                {        // bar，用来存储柱状条数据信息
                                    type: 2, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data: 0
                                    // 当天分配的预算
                                },
                                {    // bar，用来存储柱状条数据信息
                                    type: 2, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data: 66
                                    // 当天分配的预算
                                },
                                { // bar，用来存储柱状条数据信息
                                    type: 2, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data: 77
                                    // 当天分配的预算
                                },
                                { // bar，用来存储柱状条数据信息
                                    type: 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data: 88
                                    // 当天分配的预算
                                },
                                { // bar，用来存储柱状条数据信息
                                    type: 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data: 99
                                    // 当天分配的预算
                                },
                                { // bar，用来存储柱状条数据信息
                                    type: 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data: 99
                                    // 当天分配的预算
                                },
                                { // bar，用来存储柱状条数据信息
                                    type: 1, // Type标识柱状条数据类型取值{1：预算,2：消费}
                                    data: 99
                                    // 当天分配的预算
                                }
                            ]
                        },
                        weekanalyze: { // 周预算分析数据，格式与dayanalyze相同，只填写周预算分析的内容。此处略
                            tip: 4,
                            // 0 不提示 hasproblem = 0, priority = 0
                            // 1 预算合理 hasproblem = 0, priority = 0
                            // 2 日预算风险 hasproblem = 1, priority = 1
                            // 3 需提供日预算建议 hasproblem = 1 , priority = 2
                            // 4 需提供周预算建议 hasproblem = 1 , priority = 2
                            suggestbudget: 2800,// 建议预算点
                            lostclicks: 100,// 损失点击数
                            startpoint: [0, 0], // 存放起点
                            endpoint: [7000, 7000], // 存放终点
                            budgetpoint: [2350, 2350], // 预算点
                            keypoints: [ // 存放七个关键点
                                [2767.5, 55.11],
                                [2772, 58.32],
                                [2775.5, 60.43],
                                [2797, 70.97],
                                [2816, 77.96],
                                [2816, 77.96],
                                [2873.1, 78.57]
                            ],
                            incitermsg: [ // 存放同行激励信息
                                ['02:05:00', 7500, '0'], // 起点
                                ['06:55:00', 24900, '240'], // 自身点
                                ['09:00:02', 42400, '360'], // 优质客户点
                                ['23:33:00', 107800, '0'] // 终点
                            ]
                        },
                        istargetuser: 0
                        // 是否为目标用户 0：不是目标用户，1：是目标用户
                    }
                }
            ]
        };
    
        // rel.data =
        // {"timestamp":1315929158000,"listData":[{"daybgtdata":null,"weekbgtdata":{"weekbgtvalue":700000.0,"wbdvalue":{"tiptype":2,"incclicks":0,"barlist":[{"type":1,"data":25000.0},{"type":1,"data":112500.0},{"type":1,"data":112500.0},{"type":1,"data":112500.0},{"type":1,"data":112500.0},{"type":1,"data":112500.0},{"type":1,"data":112500.0}]},"weekanalyze":{"endpoint":[2.58,1.25],"words":null,"tip":4,"show_encourage":null,"model_num":null,"maxbudget":null,"suggestbudget":1222.0,"lostclicks":12,"startpoint":[1.0,0.75],"budgetpoint":[1.79,1.25],"keypoints":[[1.57,1.18],[1.61,1.2],[1.64,1.22],[1.64,1.22],[1.72,1.24],[1.72,1.24],[1.79,1.25]],"wordids":null,"incitermsg":null},"istargetuser":0},"bgttype":2}],"totalnum":0,"returnnum":0,"signature":"902720026650075993","aostatus":2}
        // rel.data =
        // {"timestamp":0,"listData":[{"daybgtdata":{"daybgtvalue":1111.0,"dayanalyze":null},"weekbgtdata":{"weekbgtvalue":400.0,"wbdvalue":{"tiptype":0,"incclicks":0,"barlist":[{"type":2,"data":30.0},{"type":2,"data":30.0},{"type":2,"data":40.0},{"type":1,"data":30.0},{"type":1,"data":30.0},{"type":1,"data":30.0},{"type":1,"data":30.0}]},"weekanalyze":null,"istargetuser":0},"bgttype":1}],"totalnum":0,"returnnum":0,"signature":null,"aostatus":2};
        /*
         * rel.data = { "timestamp":1317031557000, "listData":[{ "daybgtdata":null,
         * "weekbgtdata":{ weekbgtvalue : 8888.88, //周预算值 wbdvalue : null,
         * weekanalyze : { //周预算分析数据，格式与dayanalyze相同，只填写周预算分析的内容。此处略 tip : null, //0
         * 不提示 hasproblem = 0, priority = 0 //1 预算合理 hasproblem = 0, priority = 0
         * //2 日预算风险 hasproblem = 1, priority = 1 //3 需提供日预算建议 hasproblem = 1 ,
         * priority = 2 //4 需提供周预算建议 hasproblem = 1 , priority = 2 suggestbudget :
         * null,//建议预算点 lostclicks : null,//损失点击数 startpoint : null, //存放起点 endpoint :
         * null, //存放终点 budgetpoint : null, //预算点 keypoints : null, incitermsg :
         * null } }, "bgttype":2 }], "totalnum":0, "returnnum":55,
         * "signature":"7776630977594186406", "aostatus":0 };
         */

        // rel._timeout = 5000;
    
        return rel;
    };
});