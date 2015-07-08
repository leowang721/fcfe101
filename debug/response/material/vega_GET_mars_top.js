    
    
/**
 * 获取排行榜数据
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        var relList = [];
        switch (param.level) {
        case "planinfo":
            //rel.status = 500;
            for (var i = 1; i < 11; i++) {
                relList.push({
                    planid: 100 + i,
                    planname: "很长很长特别长的推广计划<b>1000" + i + "</b>sMSMFDLSFMSDLM",
                    planstat: [0,1,2,3,11][Math.round(Math.random()*100) % 5],
                    clks: Math.round(Math.random(1) * 1000),
                    shows: Math.round(Math.random(1) * 100000),
                    paysum: Math.round(Math.random(1) * 100),
                    showpay: Math.round(Math.random(1) * 1000),
                    trans: Math.round(Math.random(1) * 30),
                    phonetrans: Math.round(Math.random(1) * 30),
                    clkrate: Math.random(1),
                    avgprice: Math.round(Math.random(1) * 400) / 100    
                });
            }
            break;
        case "unitinfo":
            for (var i = 1; i < 11; i++) {
                relList.push({
                    planid: 100 + i,
                    planname: "很长很长特别长的推广计划<b>1000" + i + "</b>sMSMFDLSFMSDLM",
                    planstat: [0,1,2,3,11][Math.round(Math.random()*100) % 5],
                    unitid: 100 + i,
                    unitname: "特殊符号跳转单元=（**&……￥" + i + "&",
                    unitstat: [0,1,11][Math.round(Math.random()*100) % 3],
                    clks: Math.round(Math.random(1) * 1000),
                    shows: Math.round(Math.random(1) * 100000),
                    paysum: Math.round(Math.random(1) * 100),
                    showpay: Math.round(Math.random(1) * 1000),
                    trans: Math.round(Math.random(1) * 30),
                    phonetrans: Math.round(Math.random(1) * 30),
                    clkrate: Math.random(1),
                    avgprice: Math.round(Math.random(1) * 400) / 100    
                });
            }
            break;
        case "wordinfo":
            for (var i = 1; i < 11; i++) {
                relList.push({
                    planid: 100 + i,
                    planname: "很长很长特别长的推广计划<b>1000" + i + "</b>sMSMFDLSFMSDLM",
                    planstat: [-1,1,2,3,11][Math.round(Math.random()*100) % 5],
                    unitid: 100 + i,
                    unitname: "很长很长特别长的推广单元<b>1000" + i + "</b>sMSMFDLSFMSDLM",
                    unitstat: [-1,1,11][Math.round(Math.random()*100) % 3],
                    winfoid: 100 + i,
                    showword: "很长很长特别长的推广单元<b>1000" + i + "</b>sMSMFDLSFMSDLM",
                    wordstat: [-1,1,2,3,4,5,6][Math.round(Math.random()*100) % 7],
                    clks: Math.round(Math.random(1) * 1000),
                    shows: Math.round(Math.random(1) * 100000),
                    paysum: Math.round(Math.random(1) * 100),
                    showpay: Math.round(Math.random(1) * 1000),
                    trans: Math.round(Math.random(1) * 30),
                    phonetrans: Math.round(Math.random(1) * 30),
                    clkrate: Math.random(1),
                    avgprice: Math.round(Math.random(1) * 400) / 100    
                });
            }
            //relList = [];
            break;
        }
        rel.data.listData = relList;
        return rel;
    };
});