/**
 * @file 模块 `entry/demo/hello/ui` - View定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoView = require('entry/demo/View');

    // 加载tpl
    require('etpl/tpl!./tpl.html');

    // 加载样式
    require('css!./style.less');

    require('fc-component-ria/component!component/demo/hello/ui');

    /**
     * 模块 `entry/demo/hello/ui` - View定义
     *
     * @class
     * @extends {er.View}
     */
    var overrides = {};

    /**
     * @property {string} template 所使用的模板，entry-demo-hello-ui-loading就是加载时的模板，require它来自动使用
     */
    overrides.template = 'entry-demo-hello-ui';

    var View = require('eoo').create(DemoView, overrides);

    return View;
});
