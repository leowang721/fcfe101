/**
 * @file Component - `fc-header`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 * @date 
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    require('css!./header.less');

    // require ui
    var ui = require('fcui');
    require('fcui/FcLink');
    require('fcui/FcTip');
    require('fcui/FcTipLayer');

    /**
     * Component - `fc-header`
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
    overrides.uiEvents = {
        '@fc-header-links:click': function (e) {
            e.preventDefault();
        }
    };

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {
        var ucTipLayer = ui.create('FcTipLayer', {
            title: 'fc-header',
            content: '如果是path跳转，直接链接至对应的 hash 地址<p class="color-red">我的 click 事件是通过 ui group 处理的</p>'
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
    };

    return fc.oo.derive(BaseComponent, overrides);
});
