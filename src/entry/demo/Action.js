/**
 * @file 模块 `entry/demo` - 基础Action定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var EntryAction = require('fc-view/mvc/EntryAction');

    /**
     * 模块 `entry/demo` - 基础Action定义
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
        var model = this.model;
        var view = this.view;
        view.on('codepathchange', function (e) {
            var filePath = e.filePath;
            model.set('codeFilePath', filePath);
        });
    };

    var Action = require('eoo').create(EntryAction, overrides);

    return Action;
});
