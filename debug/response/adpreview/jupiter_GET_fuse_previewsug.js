define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = {
            aostatus : 0
        };
        var word = params.showwords[0];
        var whitewords = [
            '鲜花',
            '鲜花啊鲜花',
            'aaaaaaaaaaa',
            'abcd',
            '鲜a花b',
            '鲜bbbb花bbbb'
        ];
    
        var pass = baidu.array.indexOf(whitewords, word) > -1;
    
        rel.data.wordsug = {};
        var optdata = {
            isleft:false,
            hasbought:true,
            recmcoreword:true,
            wordinfo:{ planid:123,unitid:456,winfoid:789,
                planname:'计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1计1计划1计划1',
                unitname:'单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单单元1单元1单元1单元1单',
                showword:'鲜花'
            },
            suggestions:[
                {
                    data:null,
                    reason:501,
                    suggestion:null,
                    mtlid:123
                },
                {
                    data:null,
                    reason:502,
                    suggestion:null,
                    mtlid:123
                },
                {
                    data:null,
                    reason:503,
                    suggestion:null,
                    mtlid:123
                },
                {
                    data:null,
                    reason:504,
                    suggestion:null,
                    mtlid:123
                },
                {
                    data:{
                        planid: 1,
                        planname: '涅槃计划_',
                        bgttype: 1,
                        wbudget: 1301,
                        suggestbudget: 1334,
                        clklost: 123
                    },
                    reason:101,
                    suggestion:1001,
                    mtlid:123
                },
                {
                    data:{
                        cycnum: "7",
                        planid: 1,
                        planname: 123,
                        // suggestcyc : "[[204,208],[109,111],[308,318],[609,618],[715,720]]",
                        //suggestcyc: "[[621, 622], [607, 608], [608, 609], [623, 624], [602, 603], [603, 604], [604, 605]]",
                        plancyc : "[[101,102],[118,121],[114,118]]",
                        plancyc: "[[100, 124], [200, 224], [300, 324], [400, 424], [500, 524], [600, 610], [620, 624], [700, 710], [720, 724]]"
                        // potionalclk: "[13, 34, 16, 88, 30, 90]",
                        //potionalclk: "[50, 50, 50, 50, 50, 50, 50]",
                        // hotlevel: "[53, 34, 76, 18, 60, 20]"
                        //hotlevel: "[0, 0, 0, 0, 0, 0, 0]"
                    },
                    reason:103,
                    suggestion:1004,
                    mtlid:123
                },
                {
                    data:{
                        planid : 1,
                        planname : 'test'
                    },
                    reason:105,
                    suggestion:1003,
                    mtlid:123
                },
                {
                    data:{
                        planid: 1,
                        planname: 123,
                        unitid: 123,
                        unitname: 23
                    },
                    reason:201,
                    suggestion:2001,
                    mtlid:123
                },
                {
                    data:{
                        unitid : 12,
                        unitname : 'testss'
                    },
                    reason:202,
                    suggestion:2003,
                    mtlid:123
                },
                {
                    data:{
                        winfoid: 12
                    },
                    reason:411,
                    suggestion:4001,
                    mtlid:123
                },
                {
                    data:{
                        winfoid: 12,
                        showword: '我又换名了',
                        prefideaid: 1000,
                        planid: 1000,
                        unitid: 1000
                    },
                    reason:402,
                    suggestion:4002,
                    mtlid:123
                },
                {
                    data:{
                        winfoid: 12,
                        showword: '我换名了您别介意融合1.0',
                        bid: 0,
                        unitbid: 10,
                        recmbid: 15,
                        // 展现占比 整数数字，直接后边加%
                        // 如果非法，默认不提示这句： 近7天左侧前三位的展现占比为20%
                        showratio: 0,
                        targetshowratio: 28
                    },
                    reason:403,
                    suggestion:4003,
                    mtlid:123
                },
                {
                    data:{
                        winfoid: 12,
                        showword: '我换名了您别介意融合1.0',
                        bid: 10.00,
                        unitbid: 10.00,
                        recmbid: 15.00,
                        // 展现占比 整数数字，直接后边加%
                        // 如果非法，默认不提示这句：近7天左侧前三位的展现占比为多少%
                        showratio: 20,
                        targetshowratio: 28
                    },
                    reason:407,
                    suggestion:4003,
                    mtlid:123
                } ,
                {
                    data:{
                        winfoid: 12,
                        showword: '我换名了您别介意融合1.0',
                        bid: 10.00,
                        unitbid: 10.00,
                        recmbid: 15.00,
                        // 展现占比 整数数字，直接后边加%
                        // 如果非法，默认不提示这句：近7天左侧前三位的展现占比为多少%
                        showratio: 20,
                        targetshowratio: 28
                    },
                    reason:410,
                    suggestion:4003,
                    mtlid:123
                },
                {
                    data:null,
                    reason:412,
                    suggestion:null,
                    mtlid:123
                },
                {
                    data:null,
                    reason:413,
                    suggestion:null,
                    mtlid:123
                },
                {
                    data:null,
                    reason:409,
                    suggestion:null,
                    mtlid:123
                },
                {
                    data:{
                        winfoid:1
                    },
                    reason:408,
                    suggestion:4008,
                    mtlid:123
                }
            ]
        };
    
        var key = pass ? word : whitewords[0];
        rel.data.wordsug[key] = optdata;
    
        rel.status = 200;
        rel.errorCode = {};
        rel.timeout = 1000;
    };
    };
});