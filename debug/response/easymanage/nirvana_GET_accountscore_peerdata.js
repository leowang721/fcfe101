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
                data_type: '2', // 展现次数
                min_value: '100',
                max_value: '900',
                avg_value: '500',
                good_value: '700',
                curr_value: '100',
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
                data_type: '4', // 重点词平均排名
                min_value: '0',
                max_value: '90',
                avg_value: '50',
                good_value: '81',
                curr_value: '76',
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
                data_type: '6', //网站打开速度
                min_value: '0',
                max_value: '12',
                avg_value: '5',
                good_value: '10',
                curr_value: 1,//'-1',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '7', // 网站吸引力
                min_value: '13',
                max_value: '84',
                avg_value: '61',
                good_value: '70',
                curr_value: -1,
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '8', // others no use
                min_value: '0',
                max_value: '94',
                avg_value: '77',
                good_value: '83',
                curr_value: '59',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '9', // others no use
                min_value: '0',
                max_value: '94',
                avg_value: '77',
                good_value: '83',
                curr_value: '59',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '10', // others no use
                min_value: '0',
                max_value: '94',
                avg_value: '77',
                good_value: '83',
                curr_value: '59',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '11', // others no use
                min_value: '0',
                max_value: '94',
                avg_value: '77',
                good_value: '83',
                curr_value: '59',
                top_percentage: Math.ceil(Math.random() * 100) + ''
            },
            {
                data_type: '12', // others no use
                min_value: '0',
                max_value: '94',
                avg_value: '77',
                good_value: '83',
               /* curr_value: '59',*/
                top_percentage: Math.ceil(Math.random() * 100) + ''
            }
        ];
        // value = [];
        rel.data.peer_data = {};
        rel.data.peer_data.value = value;
        rel.data.token = 'adwew323';

        return rel;
    };
});