/**
 * Copyright (C) 2014 All rights reserved.
 *
 * @file 修改计划
 * @author Pride Leong(liangjinping@baidu.com)
 */

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');

    module.exports = function (path, param) {
        var rel = tpl.success();

        rel.status = 200;
        rel.data = {};
        var pid;
        var dataGetter = require('../../materialData/plan').data;
        var planstate = dataGetter.planstat();
        var pausestat = dataGetter.pausestat();
        for (var i = 0, l = param.planid.length; i < l; i++) {
            pid = param.planid[i];
            rel.data[pid] = {
                'planid': pid,
                'pausestat': pausestat,
                'planstat': planstate
            };
        }

        // 错误信息
        // TODO(liangjinping@baidu.com)
        // 搞一个动态生成物料错误信息的公共方法，在需要的时候根据状态返回
        rel.error = {};
        param.planid.forEach(function (planid) {
            rel.error[planid] = {};
            Object.keys(param.items).forEach(function (field) {
                rel.error[planid][field] = {
                    code: 400,
                    detail: null,
                    message: 'planname is exist'
                };
            });
        });

        // 模拟数据请求延迟
        rel._timeout = 1000;
        return rel;
    };
});
