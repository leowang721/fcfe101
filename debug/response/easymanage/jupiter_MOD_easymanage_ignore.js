/**
 * @fileOverview  修改`账户诊断`优化项目
 * 
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports, module) {

    module.exports = function (path, param) {
        return {
            status: 200, 
            data: true, //修改成功true，失败false
            errorCode: {}
        };
    };
});
