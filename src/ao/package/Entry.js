/**
 * @file Component - `ao-package-entry`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 * @date 
 */

define(function (require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');
    var Promise = require('fc-core/Promise');

    require('css!./entry.less');

    // require ui
    require('fcui/FcTab');

    require('fc-component-ria/component!ao/package/corewords/entry');

    /**
     * Component - `ao-package-entry`
     * @class
     * @constructor
     */
    var overrides = {};

    overrides.templateName = 'ao-package-entry';

    /**
     * 渲染之前的数据准备工作
     * 可以直接返回一个{@link Promise}对象来延续异步状态
     */
    overrides.prepare = function () {
        var model = this.getModel();
        model.set('ao-package', {
            currentPanel: 'corewords'
        });
    };

    /**
     * 配置UI属性
     */
    overrides.uiProperties = null;

    /**
     * 配置UI事件
     */
    overrides.uiEvents = {
        'ao-package-entry-navigator:activate': function (e) {
            var me = this;
            var panel = e.tab.panel;
            require(['fc-component-ria/component!ao/package/' + panel + '/entry'], function () {
                me.model.update('ao-package', {
                    currentPanel: panel
                });
            });
        }
    };

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {
        this.model.on('change:ao-package', function (e) {
            var newValue = e.newValue;
            if (newValue.currentPanel) {
                $('#ao-package-detail').html('<ao-package-' + newValue.currentPanel + '-entry />');
                this.initChildComponents(this.container);
            }
        }, this);
    };

    return fc.oo.derive(BaseComponent, overrides);
});
