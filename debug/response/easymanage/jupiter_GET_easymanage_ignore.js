/**
 * @fileOverview  账户诊断忽略优化项目
 * 
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports, module) {

    module.exports = function (path, param) {
        var result = {
            status: 200,
            data: {
                aostatus: 0,
                ignoreitems: []
            },
            errorCode: null
        };

        result.data.ignoreitems = [2006, 2007, 2008];
        return result;
    };
});
