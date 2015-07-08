/**
 * @file Component - `uc-navigator`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 * @date 
 */

define(function (require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    var ui = require('fcui');

    // require ui
    require('fcui/FcTip');
    require('fcui/FcTipLayer');

    require('css!./navigator.less');

    /**
     * Component - `uc-navigator`
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
        var ucTipLayer = ui.create('FcTipLayer', {
            title: 'uc-navigator',
            content: '外部链接直接使用 a 跳转即可！<p class="color-red">我的 click 事件是通过 jquery 处理的</p>'
        });
        ucTipLayer.appendTo(document.body);
        ucTipLayer.render();

        var links = this.findAll('a');
        _.each(links, function (item) {
            ucTipLayer.attachTo({
                targetDOM: item,
                showMode: 'over',
                delayTime: 200,
                positionOpt: {top: 'top', right: 'left'}
            });
        });

        $(links).on('click', function (e) {
            e.preventDefault();
        });
    };

    return fc.oo.derive(BaseComponent, overrides);
});
