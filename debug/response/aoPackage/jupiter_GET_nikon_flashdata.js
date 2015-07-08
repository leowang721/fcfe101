
/**
 * 获取包的flash数据
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
       // return {"status":200,"data":{"aostatus":0,"desc":{},"listData":[{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-02"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-03"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-04"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-05"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-06"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-07"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-08"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-09"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-10"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-11"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-12"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-13"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-14"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-15"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-16"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-17"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-18"},{"mqnum":"0,0,0,0,0,0,0,0,0,0,0","date":"2014-01-19"},{"mqnum":"245,574,891,2964,1988,1541,870,450,191,72,29","date":"2014-01-20"},{"mqnum":"245,574,891,2964,1988,1541,870,450,191,72,29","date":"2014-01-21"},{"mqnum":"245,574,891,2964,1988,1541,870,450,191,72,29","date":"2014-01-22"},{"mqnum":"245,574,891,2964,1988,1541,870,450,191,72,29","date":"2014-01-23"},{"mqnum":"245,574,891,2964,1988,1541,870,450,191,72,29","date":"2014-01-24"},{"mqnum":"85,214,188,816,1355,1322,805,590,401,266,250","date":"2014-01-25"},{"mqnum":"130,439,514,1899,2482,2208,1190,568,241,78,44","date":"2014-01-26"},{"mqnum":"83,200,198,819,1312,1224,640,294,118,26,20","date":"2014-01-27"},{"mqnum":"83,201,194,820,1313,1225,640,294,118,26,20","date":"2014-01-28"},{"mqnum":"126,325,472,1168,1200,1049,541,247,99,19,16","date":"2014-01-29"},{"mqnum":"0,0,0,6,9,6,3,0,0,0,0","date":"2014-01-30"},{"mqnum":"0,0,0,6,9,6,3,0,0,0,0","date":"2014-01-31"}]},"error":null}

        var rel = tpl.success(), i;
    
        rel.data = {
            desc : {},
            listData : []
        };
        // rel.status = 400;
        switch (+param.pkgid) {
            case 1 :
                rel.data.desc = {
                    decrtype : 'shows',
                    begindate : '2012-05-14',
                    enddate : '2012-05-17',
                    decrwordnum : 1000,
                    decrunitnum : 100,
                    decrplannum : 10,
                    beginvalue : 5000,
                    endvalue : 4000,
                    decr : 1000
                };
                for (i = 0; i < 7; i++) {
                    rel.data.listData.push({
                                date : '2012-05-1' + (i + 1),
                                value : i == 6 ? '500' : (Math.round(Math.random()
                                        * 3000000)
                                        + (i * 100) + '')
                            });
                }
                break;
            case 2 :
                param.condition = param.condition || {
                    biztype : 0
                };
                if (param.condition.biztype == 1) {
                    rel.data.desc = {
                        bizdate : '2012-05-12',
                        avgclksbefore : 123456,
                        avgclksafter : 234567,
                        day : 7
                    };
                    for (i = 0; i < 15; i++) {
                        rel.data.listData.push({
                                    date : '2012-05-' + (i + 2),
                                    clks : i < 7 ? (3000 + i * 300) : (45000 + i * 1400)
                                });
                    }
                } else {
    //                rel.data.desc = {
    //                    totalclklost : 100,
    //                    totalclk : 5500,
    //                    modelofftime : '24:00', // 同行的下线时间
    //                    defaultdate : '2012-05-15'
    //                };
    //                for (i = 0; i < 7; i++) {
    //                    var p = {
    //                        date : '2012-05-1' + (i + 1),
    //                        clklostday : i == 2 ? 100 : 0,
    //                        // clksbyhour : '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
    //                        // clksbyhour :
    //                        clksbyhour : '45,34,11,22,11,22,45,88,51,77,45,55,15,100,55,77,15,55,60,70,100,100,100,10',
    //                        offlinelist : '[[0, 4], [12, 14], [16,17], [19,24]]',
    //                        // offlinelist: '[[0,8], [9,24]]',
    //                        // offlinelist:'[[21, 24]]',
    //                        offlinetime : (i + 18) + ':00' // 当日自己的下线时间
    //                    };
    //
    //                    rel.data.listData.push(p);
    //                }
    
                    // 非效果检验状态升级mock数据
                    rel.data.desc = {
                        totalofflinetime: '12', // 搁置时段数
                        totalclklost: '2334' // 损失点击数
                    };
                    for (i = 1; i < 7; i++) {
                        var p = {
                            date: '2012-07-0' + i,
                            clks: i < 3 ? 0 : '' + parseInt(Math.random() * 1000), // 日点击量
                            clklostday: i >= 2 && i <= 4 ? 0 :'' + parseInt(Math.random() * 1000), // 日损失点击量
                            offlinetime: '0' + i + ':1' + i // 当日账户最后一次撞线时间
                        };
    
                        rel.data.listData.push(p);
                    }
                }
                break;
            case 3 :
                rel.data.desc = {
                    star1num : '-1000',
                    badqnum : '10',
                    star2num : '0',
                    midqnum : '20',
                    star3num : '3000' ,
                    goodqnum : '30'
                };
                for (i = 0; i < 30; i++) {
                    rel.data.listData.push({
                                date : '2012-05-' + (i+1),
                                // star1num : i == 4 ? 0 :
                                // (Math.round(Math.random()* 3000) + (i * 100) +
                                // ''),
                                // star2num : i == 4 ? 0 :
                                // (Math.round(Math.random()* 3000) + (i * 200) +
                                // ''),
                                // star3num : i == 4 ? 0 :
                                // (Math.round(Math.random()* 3000) + (i * 300) +
                                // '')
                                star1num : 50,
                                star2num : 4648,
                                star3num : 50,
                                badqnum : 50,
                                midqnum : 20,
                                goodqnum : 40,
                                pcqnum: '100,102,163,194,130,116,117,118,119,110,141',
                                mqnum: '11,12,13,14,15,16,17,18,19,10,21'
                            });
                }
                break;
            case 5 :
                for (i = 0; i < 7; i++) {
                    rel.data.listData.push({
                                date : '2012-05-1' + (i + 1),
                                value : 3000 * i
                            });
                }
                break;
            case 6 : // 行业领先包
                var lightOrder = Math.ceil(Math.random() * 10);
                lightOrder = (0 == lightOrder) ? 1 : lightOrder;
                
                var random1 = (parseInt(Math.random() * 10) % 2 == 0);
                var random2 = (parseInt(Math.random() * 10) % 2 == 0);
                
                var changeType = random1 ? -1 : 1;
                var levelchange = (changeType * random2) + "";
                
                var rankchange = random2 ? "-1" : "1";
                rankchange *= (Math.ceil(Math.random() * 100) + 1);
                rankchange = "" + rankchange;
                
                rel.data.desc = {
                    datatime: '1352563200000',//"" + (new Date()).getTime() + "",
                    tiptype: '0',//'0',//(parseInt(Math.random() * 10) % 2),
                    levelchange: '-3',//levelchange,//'0',<0,>0
                    rankchange: -3,//'1',//rankchange,
                    percent: '51',//parseInt(Math.random() * 99),
                    avgvalue: '48',//"140",
                    goodvalue: "83",
                    currvalue: "173",
                    rankindex: '1'//"" + lightOrder
                };
                break;
            case 7: // 突降急救包升级
                rel.data.desc = {
                    begindate : '2012-05-10',
                    enddate : '2012-05-11',
                    decrwordnum : 1000,
                    decrunitnum : 100,
                    decrplannum : 10,
                    beginvalue : 5000,
                    endvalue : 4000,
                    // 突降急救包升级优化项分组标题描述信息数据
                    rankdown: '1.5', //排名平均下降
                    leftrankdown: '20', //推左次数平均下降
                    invalidwinfo: '12', //关键词突变为不生效状态
                    timeoff: '2' //在线时长下降，小时
                };
                for (i = 0; i < 13; i++) {
                    rel.data.listData.push({
                        date : '2012-05-' + (i + 5),
                        value : i == 6 ? '500' : (Math.round(Math.random()
                            * 3000000)
                            + (i * 100) + '')
                    });
                }
                break;
            case 9: // 行业旺季包
                rel.data.desc = {
                    tradeid: param.condition.tradeid,
                    tradename: '中国旅游',
                    tradetype: 1,
                    peakstart: '2013-05-01',
                    peakend: '2014-05-01',
                    tradepvratio: parseInt(Math.random() * 100), // 行业检索量上升比率
                    show: -1* parseInt(Math.random() * 100), // 展现量增幅
                    showratio: parseInt(Math.random() * 1000),
                    clk: parseInt(Math.random() * 100), // 点击量增幅
                    clkratio: parseInt(Math.random() * 10000), // 点击量增幅比率
                    avgshow: parseInt(Math.random() * 100), // 日均展现量增幅
                    avgclk: -1 * parseInt(Math.random() * 100) // 日均点击量增幅
                };
    
                var begin = new Date('2013-04-01');
                var end = new Date('2013-06-01');
                var moment = include('moment');
                for (i = begin; i < end; ) {
                    rel.data.listData.push({
                        date: moment(i).format('yyyy-MM-dd'),
                        tradepv: parseInt(Math.random() * 100),
                        clk: parseInt(Math.random() * 100 + 100),
                        show: parseInt(Math.random() * 1000 + 1000)
                    });
                    i.setDate(i.getDate() + 1);
                }
    //            rel.data.listData = [];
                break;
            case 10: // 转化提升包
                // 1,2,3分别代表转化、二跳、商桥
                var transformTypes = [1, 2, 4];
                rel.data.desc = {
                    state: 3, //1、2、3分别代表没安装，安装不正确，正常
                    defaulttype: 1, // 默认展现类型，当且仅当state为3时存在。
                    hasdatatype: '1,2' // 有转化数据的转化类型
                };
    
                // 1,2,3,4分别代表整体，较好，一般，较差。
                var valueTypes = [1, 2, 3, 4];
    
                rel.data.listData = [];
                var listData = rel.data.listData;
    
                for (var i = 0, len1 = transformTypes.length; i < len1; i ++) {
                    for (var j = 0, len2 = valueTypes.length; j < len2; j ++) {
                        listData.push({
                            transtype: transformTypes[i],
                            valuetype: valueTypes[j],
                            weekcsm: (i * (j + 1) * 10 + 20324345600) * 0.01, // 周消费
                            weekclk: i * (j + 1) * 199 + 123232300,          // 周点击
                            weekcv: i * (j + 1) * 5 + 3,               // 周转化
                            weekcpa: i * (j + 1) * 55 + 100,           // 转化成本
                            percent: i * (j + 1) + 5                   // 饼图中该类型占的比例
                        });
                    }
    //
    //                listData[i] = {
    //                    transtype: transformTypes[i],
    //                    hasdata: i === 1 ? 0 : 1, // 表示该转化类型当前是否有数据，0表示没有，1表示有
    //                    detail: detail
    //                };
                }
        }
        /*if (param.condition && param.condition.qnumtype == 1) {
            rel.status = 500;
        }*/
    
        // rel.timeout = 1800;
    
        return rel;
    };
});