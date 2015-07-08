
/**
 * 获取计划列表（有无对比）数据
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            data: [],
            sum: {},
            status: 200,
            errorCode: null
        };
        // 生成data
        for (var i = 1, len = 126; i <= 126; i++) {
            rel.data.push({
                planname: i + '!@#$%激活名何曾名称<span>' + i,
                type: [1, 2, 4, 16][(4 * Math.random() | 0)],
                time: [
                    '2013-01-18 至 2013-01-28',
                    '2013-01-19 至 2013-01-20',
                    '2013-01-19 至 2013-01-19',
                    '2013-02-18 至 2013-02-28',
                    '2013-03-18 至 2013-03-28',
                    '2013-04-18 至 2013-04-28',
                    '2013-05-18 至 2013-05-28',
                    '2013-06-18 至 2013-06-28',
                    '2013-07-18 至 2013-07-28',
                    '2013-08-18 至 2013-08-28'
                ][(10 * Math.random() | 0)],
                trans: 7,
                pay: 712.21 + i,
                avgtrans: 4.11 + i,
                transrate: '4' + i + '.12%',
                // 对比时候才有的
                otrans: 19,
                opay: 1112.21 + i,
                oavgtrans: 4.11 + i,
                otransrate: '4' + i + '.12%',
                otime: [
                    '2013-01-18 至 2013-01-28',
                    '2013-01-19 至 2013-01-20',
                    '2013-01-19 至 2013-01-19',
                    '2013-02-18 至 2013-02-28',
                    '2013-03-18 至 2013-03-28',
                    '2013-04-18 至 2013-04-28',
                    '2013-05-18 至 2013-05-28',
                    '2013-06-18 至 2013-06-28',
                    '2013-07-18 至 2013-07-28',
                    '2013-08-18 至 2013-08-28'
                ][(10 * Math.random() | 0)]
            });
        }
        // 为空
        // rel.data = [];
        // 生成sum
        // rel.sum[1] = {
        //     trans: 130,
        //     pay: 712.21,
        //     avgtrans: 4.11,
        //     transrate: '42.12%',
        //     time: '2013-01-18 至 2013-01-28',
        //     // 仅当对比报告报告时下列fields才有值
        //     otrans: 130,
        //     opay: 792.21,
        //     oavgtrans: 4.11,
        //     otransrate: '42.12%',
        //     otime: '2013-01-18 至 2013-01-28'
        // };
        rel.sum[2] = {
            trans: 170,
            pay: 762.21,
            avgtrans: 4.11,
            transrate: '22.12%',
            time: '2013-01-18 至 2013-01-28',
            // 仅当对比报告报告时下列fields才有值
            otrans: 190,
            opay: 792.21,
            otran
            oavgtrans: 4.11,srate: '462.12%',
            otime: '2013-01-18 至 2013-01-28'
        };
        rel.sum[4] = {
            trans: 170,
            pay: 1172.21,
            avgtrans: 4.11,
            transrate: '12.12%',
            time: '2013-01-18 至 2013-01-28',
            // 仅当对比报告报告时下列fields才有值
            otrans: 190,
            opay: 712.21,
            oavgtrans: 4.11,
            otransrate: '42.12%',
            otime: '2013-01-18 至 2013-01-28'
        };
        rel.sum[16] = {
            trans: 31,
            pay: 712.21,
            avgtrans: 4.11,
            transrate: '32.12%',
            time: '2013-01-18 至 2013-01-28',
            // 仅当对比报告报告时下列fields才有值
            otrans: 53,
            opay: 912.21,
            oavgtrans: 4.11,
            otransrate: '62.12%',
            otime: '2013-01-18 至 2013-01-28'
        };
        return rel;
    };
});