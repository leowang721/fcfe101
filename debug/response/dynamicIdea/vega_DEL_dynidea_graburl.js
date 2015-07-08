/**
 * @file 动态创意 删除可抓取url
 * 
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 define(function (require, exports, module) {
     var tpl = require('lib/tpl');
     var random = require('random');
        
     /**
      * 服务接口
      *
      * @param {string} path 请求路径
      * @param {Object} params 请求参数
      */
     module.exports = function (path, params) {
         var rel = tpl.success();
         rel.status = 400;
         rel.error = {
             message: '',
             code: random.int(30401, 30409)
         };
         return rel;
     };
 });