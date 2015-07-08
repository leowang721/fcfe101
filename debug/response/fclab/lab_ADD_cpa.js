
// 新建cpa的响应
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // console.log(param);
        // 此处的响应比较特殊
        return param.force == 0
            // 为0即为强制删除ab中的关键词
            ? {
            status: 200,
            errorCode: null
        }
            // 为1提示用户是否删除
            : {
            status: 400,
            errorCode: {
                code: 181000,
                message: '21',
                detail: null
            }
        };
    };
});