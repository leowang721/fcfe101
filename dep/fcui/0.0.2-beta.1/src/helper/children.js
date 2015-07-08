/**
 * ESUI (Enterprise Simple UI library)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @file FCUI 子控件相关辅助方法
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} UI基础库适配层
 */
define(function (require) {
    var Event = require('mini-event');

    /**
     * @override Helper
     */
    var helper = {};

    /**
     * 代理一个child的所有事件
     * @param {Control|string} child child control本身，或者childName
     */
    helper.delegateEventsFromChild = function (child) {
        if (typeof child === 'string') {
            child = this.control.getChild(child);
        }
        child.on('*', function (e) {
            var event = Event.fromEvent(
                e,
                {preserveData: true, syncState: true}
            );
            // 增加标记是子Action过来的
            event.triggerSource = 'child';
            this.control.fire(event);
        }, this);
    };

    return helper;
});
