

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = [
            {
                alias: '王二小',
                mail: 'wangerxiao@baidu.com',
                phone: '12345678910',
                contactid: null
            },
            {
                alias: '王三小',
                mail: 'wangerxiao@baidu.com',
                phone: '12345678910',
                contactid: 1231
            }
        ];
    
        return rel;
    };
});