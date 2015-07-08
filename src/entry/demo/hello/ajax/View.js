/**
 * @file 模块 `entry/demo/hello/ajax` - View定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoView = require('entry/demo/View');

    // 加载tpl
    require('etpl/tpl!./tpl.html');

    // 加载样式
    require('css!./style.less');

    require('fc-component-ria/component!component/demo/hello/ajax');

    /**
     * 模块 `entry/demo/hello/ajax` - View定义
     *
     * @class
     * @extends {er.View}
     */
    var overrides = {};

    /**
     * @property {string} template 所使用的模板，entry-demo-hello-ajax-loading就是加载时的模板，require它来自动使用
     */
    overrides.template = 'entry-demo-hello-ajax';

    var View = require('eoo').create(DemoView, overrides);

    return View;
});
