/**
 * @file Component - `account-overview`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 * @date 
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    // require ui
    // require('fcui/TextBox');

    /**
     * Component - `account-overview`
     * @class
     * @constructor
     */
    var overrides = {};

    /**
     * 渲染之前的数据准备工作
     * 可以直接返回一个{@link Promise}对象来延续异步状态
     */
    // overrides.prepare = function () {};

    /**
     * 配置UI属性
     */
    overrides.uiProperties = null;

    /**
     * 配置UI事件
     */
    overrides.uiEvents = null;

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {};

    return fc.oo.derive(BaseComponent, overrides);
});
