/**
 * @file 动态创意 修改创意片段
 * 
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 define(function (require, exports, module) {
     var tpl = require('lib/tpl');
     var random = require('random');
     var validator = require('./ideaValidator');
     
     /**
      * 服务接口
      *
      * @param {string} path 请求路径
      * @param {Object} params 请求参数
      */
     module.exports = function (path, params) {
         var rel = tpl.success();
         rel._info = params;
         rel.data.dynIdeaCount = random.int(70, 105);

         return rel;
     };
 });