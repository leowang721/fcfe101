/**
 * @file 模块 `entry/demo/hello/project1` - Action定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 * @date 2015-7-8
 */

define(function (require) {

    var EntryAction = require('fc-view/mvc/EntryAction');

    /**
     * 模块 `entry/demo/hello/project1` - Action定义
     *
     * @class
     * @extends {fc-view.EntryAction}
     */
    var overrides = {};

    overrides.modelType = require('./Model');
    overrides.viewType = require('./View');

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {

    };

    var Action = require('eoo').create(EntryAction, overrides);

    return Action;
});
