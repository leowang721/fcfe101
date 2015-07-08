define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return {
            status: 200,
            data: {
                signature : 'IU！%RUHA',
                aostatus : 0,
                totalnum : 120,
                returnnum :  param.endindex - param.startindex,
                timestamp : 127831067988222,
                listData : []    
            }
        }    
    };
});