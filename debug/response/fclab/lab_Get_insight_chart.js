
/**
 * 竞价洞察，趋势图数据
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        if (param.dimension == 'rank_behind') {
            return { 'status': '200','data':[], 'errorCode': null};
        }
        var rel = {
            'status': '200',
            'data': [
                {
                    'showurl': '-',
                    'values': {
                        '2013-11-17': '-',
                        '2013-11-18': '0',
                        '2013-11-19': '40.45',
                        '2013-11-20': '20.35',
                        '2013-11-21': '10.15',
                        '2013-11-22': '0',
                        '2013-11-23': '90.45',
                        '2013-11-24': '60.35',
                        '2013-11-25': '40.25',
                        '2013-11-26': '-',
                        '2013-11-27': '50.35',
                        '2013-11-28': '60.25',
                        '2013-11-29': '-',
                        '2013-11-30': '80.35',
                        '2013-12-1': '30.25',
                        '2013-12-2': '6.45',
                        '2013-12-3': '4.35',
                        '2013-12-4': '8.25',
                        '2013-12-5': '40.45',
                        '2013-12-6': '55.35',
                        '2013-12-7': '50.25',
                        '2013-12-8': '40.45',
                        '2013-12-9': '20.35',
                        '2013-12-10': '50.25',
                        '2013-12-11': '80.45',
                        '2013-12-12': '90.35',
                        '2013-12-13': '60.25',
                        '2013-12-14': '50.45',
                        '2013-12-15': '40.35',
                        '2013-12-16': '30.25',
                        '2013-12-17': '20.45'
                    }
                },
                {
                    'showurl': 'www.xxxx1.com',
                    'values': {
                        '2013-11-17': '67.45',
                        '2013-11-18': '44.55',
                        '2013-11-19': '55.65',
                        '2013-11-20': '99.15',
                        '2013-11-21': '97.95',
                        '2013-11-22': '0',
                        '2013-11-23': '96',
                        '2013-11-24': '0.45',
                        '2013-11-25': '0.25',
                        '2013-11-26': '99.35',
                        '2013-11-27': '23.45',
                        '2013-11-28': '0.95',
                        '2013-11-29': '0.75',
                        '2013-11-30': '94.45',
                        '2013-12-1': '0.25',
                        '2013-12-2': '0.45',
                        '2013-12-3': '0.45',
                        '2013-12-4': '0',
                        '2013-12-5': '0.95',
                        '2013-12-6': '0.05',
                        '2013-12-7': '0.05',
                        '2013-12-8': '0.45675',
                        '2013-12-9': '0.25',
                        '2013-12-10': '0.15',
                        '2013-12-11': '0.65',
                        '2013-12-12': '0.75',
                        '2013-12-13': '0.85',
                        '2013-12-14': '0.95',
                        '2013-12-15': '0.05',
                        '2013-12-16': '0.35',
                        '2013-12-17': '0.45'
                    }
                },
                {
                    'showurl': 'www.xxxx2.com',
                    'values': {
                        '2013-11-17': '0.35',
                        '2013-11-18': '0.25',
                        '2013-11-19': '0.45',
                        '2013-11-20': '0.35',
                        '2013-11-21': '0.15',
                        '2013-11-22': '0.25',
                        '2013-11-23': '0.45',
                        '2013-11-24': '0.35',
                        '2013-11-25': '0.25',
                        '2013-11-26': '0.45',
                        '2013-11-27': '0.35',
                        '2013-11-28': '0.25',
                        '2013-11-29': '0.45',
                        '2013-11-30': '0.35',
                        '2013-12-1': '0.25',
                        '2013-12-2': '0.45',
                        '2013-12-3': '0.35',
                        '2013-12-4': '0.25',
                        '2013-12-5': '0.45',
                        '2013-12-6': '0.35',
                        '2013-12-7': '0.25',
                        '2013-12-8': '0.45',
                        '2013-12-9': '0.35',
                        '2013-12-10': '0.25',
                        '2013-12-11': '0.45',
                        '2013-12-12': '0.35',
                        '2013-12-13': '0.25',
                        '2013-12-14': '0.45',
                        '2013-12-15': '0.35',
                        '2013-12-16': '0.25',
                        '2013-12-17': '0.45'
                    }
                },
                {
                    'showurl': 'www.chyaoshun.com',
                    'values': {
                        '2013-11-17': '0.35',
                        '2013-11-18': '0.25',
                        '2013-11-19': '0.45',
                        '2013-11-20': '0.35',
                        '2013-11-21': '0.15',
                        '2013-11-22': '0.25',
                        '2013-11-23': '0.45',
                        '2013-11-24': '0.35',
                        '2013-11-25': '0.25',
                        '2013-11-26': '0.45',
                        '2013-11-27': '0.35',
                        '2013-11-28': '0.25',
                        '2013-11-29': '0.45',
                        '2013-11-30': '0.35',
                        '2013-12-1': '0.25',
                        '2013-12-2': '0.45',
                        '2013-12-3': '0.35',
                        '2013-12-4': '0.25',
                        '2013-12-5': '0.45',
                        '2013-12-6': '0.35',
                        '2013-12-7': '0.25',
                        '2013-12-8': '0.45',
                        '2013-12-9': '0.35',
                        '2013-12-10': '0.25',
                        '2013-12-11': '0.45',
                        '2013-12-12': '0.35',
                        '2013-12-13': '0.25',
                        '2013-12-14': '0.45',
                        '2013-12-15': '0.35',
                        '2013-12-16': '0.25',
                        '2013-12-17': '0.45'
                    }
                },
                {
                    'showurl': 'www.chyaoshun.com',
                    'values': {
                        '2013-11-17': '0.35',
                        '2013-11-18': '0.25',
                        '2013-11-19': '0.45',
                        '2013-11-20': '0.35',
                        '2013-11-21': '0.15',
                        '2013-11-22': '0.25',
                        '2013-11-23': '0.45',
                        '2013-11-24': '0.35',
                        '2013-11-25': '0.25',
                        '2013-11-26': '0.45',
                        '2013-11-27': '0.35',
                        '2013-11-28': '0.25',
                        '2013-11-29': '0.45',
                        '2013-11-30': '0.35',
                        '2013-12-1': '0.25',
                        '2013-12-2': '0.45',
                        '2013-12-3': '0.35',
                        '2013-12-4': '0.25',
                        '2013-12-5': '0.45',
                        '2013-12-6': '0.35',
                        '2013-12-7': '0.25',
                        '2013-12-8': '0.45',
                        '2013-12-9': '0.35',
                        '2013-12-10': '0.25',
                        '2013-12-11': '0.45',
                        '2013-12-12': '0.35',
                        '2013-12-13': '0.25',
                        '2013-12-14': '0.45',
                        '2013-12-15': '0.35',
                        '2013-12-16': '0.25',
                        '2013-12-17': '0.45'
                    }
                },
                {
                    'showurl': 'www.xxxx5.com',
                    'values': {
                        '2013-11-17': '0.35',
                        '2013-11-18': '0.25',
                        '2013-11-19': '0.45',
                        '2013-11-20': '0.35',
                        '2013-11-21': '0.15',
                        '2013-11-22': '0.25',
                        '2013-11-23': '0.45',
                        '2013-11-24': '0.35',
                        '2013-11-25': '0.25',
                        '2013-11-26': '0.45',
                        '2013-11-27': '0.35',
                        '2013-11-28': '0.25',
                        '2013-11-29': '0.45',
                        '2013-11-30': '0.35',
                        '2013-12-1': '0.25',
                        '2013-12-2': '0.45',
                        '2013-12-3': '0.35',
                        '2013-12-4': '0.25',
                        '2013-12-5': '0.45',
                        '2013-12-6': '0.35',
                        '2013-12-7': '0.25',
                        '2013-12-8': '0.45',
                        '2013-12-9': '0.35',
                        '2013-12-10': '0.25',
                        '2013-12-11': '0.45',
                        '2013-12-12': '0.35',
                        '2013-12-13': '0.25',
                        '2013-12-14': '0.45',
                        '2013-12-15': '0.35',
                        '2013-12-16': '0.25',
                        '2013-12-17': '0.45'
                    }
                },
                {
                    'showurl': 'www.xxxx6.com',
                    'values': {
                        '2013-11-17': '0.35',
                        '2013-11-18': '0.25',
                        '2013-11-19': '0.45',
                        '2013-11-20': '0.35',
                        '2013-11-21': '0.15',
                        '2013-11-22': '0.25',
                        '2013-11-23': '0.45',
                        '2013-11-24': '0.35',
                        '2013-11-25': '0.25',
                        '2013-11-26': '0.45',
                        '2013-11-27': '0.35',
                        '2013-11-28': '0.25',
                        '2013-11-29': '0.45',
                        '2013-11-30': '0.35',
                        '2013-12-1': '0.25',
                        '2013-12-2': '0.45',
                        '2013-12-3': '0.35',
                        '2013-12-4': '0.25',
                        '2013-12-5': '0.45',
                        '2013-12-6': '0.35',
                        '2013-12-7': '0.25',
                        '2013-12-8': '0.45',
                        '2013-12-9': '0.35',
                        '2013-12-10': '0.25',
                        '2013-12-11': '0.45',
                        '2013-12-12': '0.35',
                        '2013-12-13': '0.25',
                        '2013-12-14': '0.45',
                        '2013-12-15': '0.35',
                        '2013-12-16': '0.25',
                        '2013-12-17': '0.45'
                    }
                },
                {
                    'showurl': 'www.xxxx7.com',
                    'values': {
                        '2013-11-17': '0.35',
                        '2013-11-18': '0.25',
                        '2013-11-19': '0.45',
                        '2013-11-20': '0.35',
                        '2013-11-21': '0.15',
                        '2013-11-22': '0.25',
                        '2013-11-23': '0.45',
                        '2013-11-24': '0.35',
                        '2013-11-25': '0.25',
                        '2013-11-26': '0.45',
                        '2013-11-27': '0.35',
                        '2013-11-28': '0.25',
                        '2013-11-29': '0.45',
                        '2013-11-30': '0.35',
                        '2013-12-1': '0.25',
                        '2013-12-2': '0.45',
                        '2013-12-3': '0.35',
                        '2013-12-4': '0.25',
                        '2013-12-5': '0.45',
                        '2013-12-6': '0.35',
                        '2013-12-7': '0.25',
                        '2013-12-8': '0.45',
                        '2013-12-9': '0.35',
                        '2013-12-10': '0.25',
                        '2013-12-11': '0.45',
                        '2013-12-12': '0.35',
                        '2013-12-13': '0.25',
                        '2013-12-14': '0.45',
                        '2013-12-15': '0.35',
                        '2013-12-16': '0.25',
                        '2013-12-17': '0.45'
                    }
                }
            ],
    
            'errorCode': null
        };
        return rel;
    };
});