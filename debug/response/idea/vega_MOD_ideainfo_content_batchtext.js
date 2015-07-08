
/**
 * 修改创意文本
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel = {
            status: 300,
            data: {
                oklist: [3, 5],
                errorlist: [1, 2]
            },
            errorCode: {
                code: 716,
                detail:{
                    title: 'xxURL主域名和注册网站不一致',
                    desc1: '描述错误了'
                }
            }
        }
        return rel;
    };
});