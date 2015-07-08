/**
 * @file 动态创意 获取可抓取url
 * 
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 define(function (require, exports, module) {
     var tpl = require('lib/tpl');
     var random = require('random');
     
     var domains = [
        'baidu',
        'alibaba',
        'tengcent',
        'mi',
        'jd',
        '360'
     ];
     
     domains = domains.concat(domains).concat(domains);
     
     var urls = domains.map(function (item) {
         return 'http://www.' + item + '.com/' + random.chars(1000, 2000) + '.html';
     });
     
     /**
      * 服务接口
      *
      * @param {string} path 请求路径
      * @param {Object} params 请求参数
      */
     module.exports = function (path, params) {
         var rel = tpl.success();
         rel.data = {
             urls: random.getFrom(urls, random.int(10, 25))
         };
         return rel;
     };
 });