/**
 * @file 模块 `entry/demo/hello/interactive` - View定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var $ = require('jquery');
    var DemoView = require('entry/demo/View');

    // 加载tpl
    require('etpl/tpl!./tpl.html');

    // 加载样式
    require('css!./style.less');

    require('fc-component-ria/component!component/uc/navigator');
    require('fc-component-ria/component!component/fc/header');
    require('fc-component-ria/component!account/component/overview');
    require('fc-component-ria/component!account/component/datatrend');

    require('fc-component-ria/component!ao/package/entry');

    /**
     * 模块 `entry/demo/hello/interactive` - View定义
     *
     * @class
     * @extends {er.View}
     */
    var overrides = {};

    /**
     * @property {string} template 所使用的模板，entry-demo-hello-interactive-loading就是加载时的模板，require它来自动使用
     */
    overrides.template = 'entry-demo-hello-interactive';

    /**
     * 渲染时额外的数据替换配置
     * key为完整路径，例如@sth.a，路径就是sth.a
     * value可以为方法，也可以为值
     * @type {?Object}
     */
    overrides.templateDataReplacer = null;

    /**
     * 配置UI属性
     */
    // overrides.uiProperties = null;

    /**
     * 配置UI事件
     */
    // overrides.uiEvents = null;

    /**
     * 界面渲染完成之后的事件处理，enterDocument已被占用
     */
    overrides.customDocument = function () {
        this.$super();
    };

    // 使用get获取UI，使用getComponent获取component
    // 使用waitAlert和waitConfirm方法来进行交互，并且使用promise链式处理

    overrides.updateCurrentPanel = function (newPanel) {
        $('#current-ao-package').html(newPanel);
    };

    var View = require('eoo').create(DemoView, overrides);

    return View;
});
