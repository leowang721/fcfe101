/**
 * @file 模块 `entry/demo/hello/page` - Action定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoAction = require('entry/demo/Action');

    /**
     * 模块 `entry/demo/hello/page` - Action定义
     *
     * @class
     * @extends {fc-view.EntryAction}
     */
    var overrides = {};

    overrides.modelType = require('./Model');
    overrides.viewType = require('./View');

    var Action = require('eoo').create(DemoAction, overrides);

    return Action;
});
