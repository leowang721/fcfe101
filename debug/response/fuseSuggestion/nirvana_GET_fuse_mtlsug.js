define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var kslfData = storage.get('kslfData');
    if (kslfData === undefined) {
        kslfData = 0;
        storage.set('kslfData', 0);
    }


    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var yAxis = "[0, 1, 6, 11, 23, 48, 84, 137, 232, "
                  +  "592, 808, 886, 958, 1032, 1098, 1161," 
                  +  "1197, 1235, 1269, 1301, 1406, 1468," 
                  +  "1508, 1533, 1554, 1566, 1568, 1573,"
                  +  "1575, 1575, 1576, 1577, 1577, 1577, 1577, 1577]";
    
        var xAxis = "[0.0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9," 
                  + "1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9," 
                  +  "2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5," 
                  +  "7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0]";
        rel.errorCode = 0;
        var matchlist = ['15', '31', '63'];
        var ctrllist = ['0', '1', '3'];
        var returnData = {
            1001: {
                data:{
                    planid: param.sugReqItems[0].planid,
                    planname: '涅槃计划_' + param.sugReqItems[0].planid + '_new',
                    bgttype: 1,
                    wbudget: 1301,
                    suggestbudget: 1334,
                    clklost: 123
                },
                reason: 101,
                suggestion: 1001
            },
            1002: {
                data:{
                    cycnum: "7",
                    planid: param.sugReqItems[0].planid,
                    planname: param.sugReqItems[0].planname,
                    // suggestcyc : "[[204,208],[109,111],[308,318],[609,618],[715,720]]",
                    suggestcyc: "[[621, 622], [607, 608], [608, 609], [623, 624], [602, 603], [603, 604], [604, 605]]",
                    plancyc : "[[101,102],[118,121],[114,118]]",
                    plancyc: "[[100, 124], [200, 224], [300, 324], [400, 424], [500, 524], [600, 610], [620, 624], [700, 710], [720, 724]]",
                    // potionalclk: "[13, 34, 16, 88, 30, 90]",
                    potionalclk: "[50, 50, 50, 50, 50, 50, 50]",
                    // hotlevel: "[53, 34, 76, 18, 60, 20]"
                    hotlevel: "[0, 0, 0, 0, 0, 0, 0]"
                    
                },
                reason: 103,
                suggestion: 1002
            },
            1005: {
                data: {
                    planid: param.sugReqItems[0].planid,
                    planname: '减肥开飞机',
                    mPriceFactor: 0.5,
                    recmmPriceFactor: 7.0,
                    click: 23, 
                    predictClick: 1575,
                    dotNum: 7,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    reason: parseInt(Math.random() * 10) % 2
                },
                reason: 106,
                suggestion: 1005
            },
            2001: {
                data: {
                    planid: param.sugReqItems[0].planid,
                    planname: param.sugReqItems[0].planname,
                    unitid: +param.sugReqItems[0].planid * 1000 + 1,
                    unitname: param.sugReqItems[0].unitname
                },
                reason: 201,
                suggestion: 2001
            },
            2002: {
                data: {
                    planid: param.sugReqItems[0].planid,
                    planname: param.sugReqItems[0].planname,
                    unitid: +param.sugReqItems[0].planid * 1000 + 1,
                    unitname: param.sugReqItems[0].unitname,
                    ideaid: "[1000, 1001, 1002]"
                },
                reason: 201,
                suggestion: 2002
            },
            3001: {
                data: {
                    planid: param.sugReqItems[0].planid,
                    planname: param.sugReqItems[0].planname,
                    unitid: +param.sugReqItems[0].planid * 1000 + 1,
                    unitname: param.sugReqItems[0].unitname,
                    ideaid: param.sugReqItems[0].ideaid
                    // unitname: '单元' + (param.sugReqItems[0].planid * 1000 + 1)
                },
                reason: 301,
                suggestion: 3001
            },
            3002: {
                data: {
                    planid: param.sugReqItems[0].planid,
                    planname: param.sugReqItems[0].planname,
                    unitid: +param.sugReqItems[0].planid * 1000 + 1,
                    unitname: param.sugReqItems[0].unitname,
                    ideaid: param.sugReqItems[0].ideaid
                },
                reason: 301,
                suggestion: 3002
            },
            4001: {
                data: {
                    winfoid: param.sugReqItems[0].winfoid
                },
                reason: 401,
                suggestion: 4001
            },
            4002: {
                data: {
                    winfoid: param.sugReqItems[0].winfoid,
                    showword: '我又换名了',
                    prefideaid: 1000,
                    planid: 1000,
                    unitid: 1000
                },
                reason: 402,
                suggestion: 4002
            },
            4003: {
                data: {
                    winfoid: param.sugReqItems[0].winfoid,
                    showword: '我换名了您别介意融合1.0',
                    bid: 0,
                    unitbid: 10,
                    recmbid: 15,
                    // 展现占比 整数数字，直接后边加%
                    // 如果非法，默认不提示这句： 近7天左侧前三位的展现占比为20%
                    showratio: 0,
                    targetshowratio: 28
                },
                reason: param.sugReqItems[0].reason,
                suggestion: param.sugReqItems[0].suggestion
            },
            4007: {
                data: {
                    winfoid: param.sugReqItems[0].winfoid,
                    showword: '我换名了您别介意融合1.0',
                    bid: 10.00,
                    unitbid: 10.00,
                    recmbid: 15.00,
                    // 展现占比 整数数字，直接后边加%
                    // 如果非法，默认不提示这句：近7天左侧前三位的展现占比为多少%
                    showratio: 20,
                    targetshowratio: 28
                },
                reason: param.sugReqItems[0].reason,
                suggestion: param.sugReqItems[0].suggestion
            },
            4009: {
                data: {
                    winfoid: param.sugReqItems[0].winfoid,
                    planid: param.sugReqItems[0].planid,
                    unitid: param.sugReqItems[0].unitid,
                    planname: '计划计划计划计划计划名名名名名←＿←',
                    unitname: '←＿← →＿→ ↑＿↑ ↓＿↓ 呵呵 呵呵呵 呵呵',
                    showword: '→＿→为什么我也要换个名-_-',
                    bid: 0.01,
                    unitbid: 10,
                    wmatch: matchlist[Math.ceil(Math.random() * 2)],
                    recmwmatch: matchlist[Math.ceil(Math.random() * 2)],
                    wctrl: ctrllist[Math.ceil(Math.random() * 2)],
                    recmwctrl: ctrllist[Math.ceil(Math.random() * 2)],
                    recmwords: '鲜花快递1,鲜花快递2,鲜花快递3,鲜花快递4,'
                        + '鲜花快递5鲜花快递5鲜花快递5鲜花快递5鲜花快递,'
                        + '鲜花快递6,鲜花快递7鲜花快递7鲜花快递7鲜花快递'
                        + '鲜花快递7,鲜花快递8'
                },
                reason: param.sugReqItems[0].reason,
                suggestion: param.sugReqItems[0].suggestion
            }
        };
    
        rel.data = {};
        var idkey = {
            'planinfo': 'planid',
            'unitinfo': 'unitid',
            'wordinfo': 'winfoid',
            'ideainfo': 'ideaid'
        };
        rel.data[param.sugReqItems[0][idkey[param.level]]] =
            returnData[param.sugReqItems[0].suggestion];
    
        kslfData++;
    
        return rel;
    
    };
});