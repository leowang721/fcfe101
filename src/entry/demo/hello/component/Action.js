/**
 * @file 模块 `entry/demo/hello/component` - Action定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoAction = require('entry/demo/Action');

    /**
     * 模块 `entry/demo/hello/component` - Action定义
     *
     * @class
     * @extends {DemoAction}
     */
    var overrides = {};

    overrides.modelType = require('./Model');
    overrides.viewType = require('./View');

    var Action = require('eoo').create(DemoAction, overrides);

    return Action;
});
