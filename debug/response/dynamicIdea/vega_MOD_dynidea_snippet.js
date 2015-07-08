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
         var item = params.items;
         var error = validator.validate(item);
         if (error && error.message) {
               var detail = {};
               detail[item.ideaid || 'xxx'] = error.code;
               rel.error = {
                  message: error.message,
                  detail: detail
               };
               rel.status = 400;
         }
         return rel;
     };
 });