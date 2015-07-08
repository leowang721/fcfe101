/**
 * 获取我的报告列表
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), i, max = 20, data = [];
    
        for (i = 0; i < max; i++) {
            data.push({
                        reportid : i,
                        fileid : 1,
                        reportname : '报告名称<button>&@^%#$_' + i,
                        reporttag : (i % 2 + 1), // 0 即时待发送 1 循环报告 2 预约报告
                        reportstatus : i % 6, // 0 未生成 1 生成中 2 已生成 3 生成异常
                        /**
                         * 如果是绝对时间：yyyy-MM-dd 至 yyyy-MM-dd 如果是相对时间：每周/每天/每月初
                         */
                        timerange : (i % 2 == 1) ? '每天' : 'yyyy-MM-dd至yyyy-MM-dd',
                        reportlevel : (i % 3 + 1) * 100, // 查看权限 100 用户报告 200
                        // 推广顾问报告 300 管理员报告
                        createtime : 'yyyy-MM-dd HH:mm:ss'
                    });
        }
    
        rel.data = data;
        rel.error = {};
    
        return rel;
    };
});