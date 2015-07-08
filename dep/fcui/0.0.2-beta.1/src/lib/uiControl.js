/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 控件辅助方法
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} 模板辅助方法
 */
define(function (require) {
    var u = require('underscore');
    var attr = require('esui/lib/attribute');
    var ViewContext = require('../ViewContext');
    var dom = require('./dom');

    var exports = {};

    /**
     * 销毁wrap之下所有的控件
     * @param {HTMLElement} wrap 查找UI控件的起点element
     */
    exports.disposeControls = function (wrap) {
        var ctrls = dom.findAll(wrap, '[data-ctrl-id]');
        u.each(ctrls, function (ctrlEl) {
            var id = attr.getAttribute(ctrlEl, 'data-ctrl-id');
            var vcid = attr.getAttribute(ctrlEl, 'data-ctrl-view-context');
            if (id && vcid) {
                var vc = ViewContext.get(vcid);
                if (vc) {
                    var ctrl = vc.get(id);
                    if (ctrl) {
                        ctrl.dispose();
                    }
                }
            }
        });
    };

    exports.disposeControlsInGroup = function (group) {
        var arrGroup = Array.prototype.slice.call(group);
        u.each(arrGroup, function (control) {
            control && control.dispose && control.dispose();
        });
    };

    return exports;
});
