
/**
 * 获取用户打折词信息请求模拟
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var wordStrMap = {
            0: '已购打折词<input type="text" />&abc',
            1: '打折词霜冻束带所得税的发顺丰所得税的发顺丰随碟附送斯蒂芬斯蒂芬斯蒂芬斯蒂芬时段数的方式为斯蒂芬斯蒂芬',
            2: 'abc',
            3: 'ssdfsldf2sdfkslfk23sewerwsslfxsfsjflwjoeirwoerowrejwoeiwooooooooeweoiweiwoefkslfjslfksflweiwerwrwrewerwr',
            4: '打折词'
        };
    
        var details = [];
        var item;
        var num = parseInt(Math.random() * 100);
        for (var i = 0; i < num; i ++) {
            item = {
                isDeletedWord: '' + parseInt(Math.random() * 100) % 2, // 是否是删除的打折词：'1' or '0'
                winfoid: '' + (i + 1),
                showword: i + wordStrMap[i % 5],
                planname: i  + '计划' + wordStrMap[i % 5],
                unitname: i + '单元' + wordStrMap[i % 5],
                paySum: '' + Number(Math.random() * 10000).toFixed(2),
                wordNum: '' + parseInt(Math.random() * 1000), // 累计添加的打折词
                discountSum: '' + Number(Math.random() * 10000).toFixed(2), // 累计享受折扣额
                ratio: '' + Number(Math.random() * 10).toFixed(1), // 打折的折扣
                discountBeginDate: '2013-08-01',// 打折开始时间
                discountEndDate: '2013-08-31' //打折结束时间
            };
            details[i] = {
                data: item
            };
        }
    
        rel.data = {
            commData: {
                totalDiscountSum: '' + Number(Math.random() * 1000000).toFixed(2),
                totalWordNum: '' + parseInt(Math.random() * 10000),
                currMonthDiscountSum: '' + Number(Math.random() * 100000).toFixed(2),
                currMonthWordNum: '' + parseInt(Math.random() * 10000),
                preMonthDiscountSum: '' + Number(Math.random() * 100000).toFixed(2),
                preMonthWordNum: '' + parseInt(Math.random() * 100000)
            },
            detailresitems: details
        };
    
        // rel.timeout = 1500;
    
        return rel;
    };
});