
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var now = new Date();
        rel.data = [
            {
                id: 23,
                name: '音像出版>音像>电影',
                percent: 0.1700,//投放该行业的同行占比
                hotBegin: now.getTime() + 5*24*3600*1000,
                hotEnd: now.getTime() + 11*24*3600*1000
            },
            {
                id: 23,
                name: '物流>快递>国际快递',
                percent: 0.1206,//投放该行业的同行占比
                hotBegin: now.getTime() - 51*24*3600*1000,
                hotEnd: now.getTime() - 35*24*3600*1000
            },
            {
                id: 20,
                name: '广播电视>广播>校园广播网',
                percent: 0.3130,
                hotBegin: now.getTime() - 2*24*3600*1000,
                hotEnd: now.getTime() + 71*24*3600*1000
            }
        ];
        
        return rel;
    };
});