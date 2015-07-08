/**
 * 模拟响应请求同行指标数据
 *
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        
        // data_type: 1.下线时间, 2.展现次数, 
        // 3.左侧展现概率, 5.生效三星词比例
        var value = [
            {
                data_type: '1', // 下线时间
                min_value: '7800',
                max_value: '73000',
                avg_value: '12800',
                good_value: '36000',
                curr_value: '42000',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '13', // 最大在线时间
                min_value: '7903',
                max_value: '73003',
                avg_value: '22803',
                good_value: '22850',
                curr_value: '52003',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '2', // 展现次数
                min_value: 10,//'100',
                max_value: 40,//'900',
                avg_value: 30,//'500',
                good_value: 40,//'700',
                curr_value:10,//'100',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '3', // 左侧展现概率
                min_value: '3',
                max_value: '95',
                avg_value: '74',
                good_value: '81',
                curr_value: '95',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '5', // 生效三星词比例
                min_value: '13',
                max_value: '84',
                avg_value: '61',
                good_value: '70',
                curr_value: '60',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '6', //网站打开速度，没用到的指标
                min_value: '0',
                max_value: '12',
                avg_value: '5',
                good_value: '10',
                curr_value: '-1',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '12', // 10分质量度
                min_value: '14',
                max_value: '85',
                avg_value: '62',
                good_value: '71',
                curr_value: '61',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            }
        ];
        
        rel.data.peer_data = {};
        rel.data.peer_data.value = value;
        rel.data.token = 'adwew323';
        
        // rel.timeout = 1000;
        return rel;
        
    };
});