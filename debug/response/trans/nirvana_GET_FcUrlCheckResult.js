
/**
 * 查询搜索推广URL检查结果（转化跟踪工具-->全面检查-->推广访问URL）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = {
            progress : "processing", // processing
            last_check_time : "2010-10-20 15:55:01",
            listData : [{
                errorcode : -100,
                errornum : 15,
                urllist : [ {
                    url : "http://www.baidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidubaidu.com"
                }, {
                    url : "http://www.baidu.com"
                }]
            }, {
                errorcode : 262144,
                errornum : 10,
                urllist : [ {
                    url : 'http://www.baidu.com'
                }, {
                    url : 'http://www.baidu.com'
                }]
            }, {
                errorcode : 262144,
                errornum : 10,
                urllist : [ {
                    url : 'http://www.baidu.com'
                }, {
                    url : 'http://www.baidu.com'
                }]
            }, {
                errorcode : 262144,
                errornum : 10,
                urllist : [ {
                    url : 'http://www.baidu.com'
                }, {
                    url : 'http://www.baidu.com'
                }]
            }, {
                errorcode : 262144,
                errornum : 10,
                urllist : [ {
                    url : 'http://www.baidu.com'
                }, {
                    url : 'http://www.baidu.com'
                }]
            }]
        };
        
        return rel;
    };
});