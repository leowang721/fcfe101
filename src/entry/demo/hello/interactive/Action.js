/**
 * @file 模块 `entry/demo/hello/interactive` - Action定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoAction = require('entry/demo/Action');

    /**
     * 模块 `entry/demo/hello/interactive` - Action定义
     *
     * @class
     * @extends {fc-view.EntryAction}
     */
    var overrides = {};

    overrides.modelType = require('./Model');
    overrides.viewType = require('./View');

    overrides.initBehavior = function () {
        this.$super(arguments);
        var model = this.model;
        var view = this.view;
        model.on('change:ao-package', function (e) {
            var newValue = e.newValue;
            if (newValue.currentPanel) {
                view.updateCurrentPanel(newValue.currentPanel);
            }
        }, view);
    };

    var Action = require('eoo').create(DemoAction, overrides);

    return Action;
});
