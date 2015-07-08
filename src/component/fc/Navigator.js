/**
 * @file Component - `fc-navigator`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var $ = require('jquery');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    require('css!./navigator.less');

    // require ui
    // require('fcui/TextBox');

    /**
     * Component - `fc-navigator`
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
    overrides.initBehavior = function () {
        var me = this;

        var path = window.location.hash.split('~')[0];
        var target = $(this.container).find('[href="' + path + '"]');
        target && this.setActive(target);

        $(me.container).on('click', function (e) {
            if (e.target.tagName === 'A') {
                me.setActive(e.target);
            }
        });
    };

    overrides.setActive = function (target) {
        $('.fc-navigator .actived', this.container).removeClass('actived');
        $(target).addClass('actived');
    };

    return fc.oo.derive(BaseComponent, overrides);
});
