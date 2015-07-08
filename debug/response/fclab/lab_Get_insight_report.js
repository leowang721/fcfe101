
/**
 * 竞价洞察，表格数据
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    
        var rel = {
            'status': '200',
            'data': {
                'myNo': '4',
                'totalsize': '1000',
                'datalist': [
                    {
                        'showurl': 'www.1xxffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffxx.com',
                        'userid': '1',
                        'show_ratio': '0.80',
                        'rank_avg': '0.1',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.2xxxx.com',
                        'userid': '2',
                        'show_ratio': '0.79',
                        'rank_avg': '0.2',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.3xxxx.com',
                        'userid': '3',
                        'show_ratio': '0.78',
                        'rank_avg': '0.3',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.chyaoshun.com',
                        'userid': '4',
                        'show_ratio': '0.77',
                        'rank_avg': '10.4',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': '-',
                        'userid': '5',
                        'show_ratio': '0.76',
                        'rank_avg': '0.5',
                        'rank_behind': '101',
                        'show_left': '0.25',
                        'show_together': '101'
                    },
                    {
                        'showurl': 'www.6xxxx.com',
                        'userid': '6',
                        'show_ratio': '0.75',
                        'rank_avg': '8.6',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.7xxxx.com',
                        'userid': '7',
                        'show_ratio': '0.74',
                        'rank_avg': '0.7',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.8xxxx.com',
                        'userid': '7',
                        'show_ratio': '0.73',
                        'rank_avg': '0.8',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.9xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.72',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.10xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.71',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.11xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.70',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.12xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.4',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.13xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '3.4',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.14xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.15xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '5.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.16xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.17xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.18xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.19xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.20xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.21xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.22xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.23xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.24xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    },
                    {
                        'showurl': 'www.25xxxx.com',
                        'userid': '8',
                        'show_ratio': '0.35',
                        'rank_avg': '1.5',
                        'rank_behind': '0.2',
                        'show_left': '0.25',
                        'show_together': '0.25'
                    }
                ]
            },
    
    
            'errorCode': null
        };
        return rel;
    };
});