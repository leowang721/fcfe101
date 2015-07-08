/**
 * @file 模块 `entry/demo/hello/dialog` - View定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var _ = require('underscore');
    var DemoView = require('entry/demo/View');

    // 加载tpl
    require('etpl/tpl!./tpl.html');

    // 加载样式
    require('css!./style.less');

    require('fcui/FcButton');

    require('fc-component-ria/component!component/demo/hello/ajax');

    /**
     * 模块 `entry/demo/hello/dialog` - View定义
     *
     * @class
     * @extends {er.View}
     */
    var overrides = {};

    /**
     * @property {string} template 所使用的模板，entry-demo-hello-dialog-loading就是加载时的模板，require它来自动使用
     */
    overrides.template = 'entry-demo-hello-dialog';

    overrides.getUIEvents = function () {
        return _.extend(this.uiEvents, {
            'code-preview-show-dialog:click': function (e) {
                var HelloAjax = require('component/demo/hello/Ajax');
                var dialog = new HelloAjax({
                    dialogOptions: {
                        title: '浮出的Ajax'
                    }
                });
                dialog.enter();
            }
        });
    };


    var View = require('eoo').create(DemoView, overrides);

    return View;
});
