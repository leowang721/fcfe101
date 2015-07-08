/**
 * @file Component - `demo-hello-ajax`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    var Promise = require('fc-core/Promise');

    var FakeList = require('dataPrototype/demo/FakeList');

    require('css!./ajax.less');

    // require ui
    // require('fcui/TextBox');

    /**
     * Component - `demo-hello-ajax`
     * @class
     * @constructor
     */
    var overrides = {};

    overrides.initialize = function () {
        var me = this;
        var model = me.getModel();
        me.fakeList = new FakeList();
        model.addDataLoader('loadFakeList', me.fakeList.getDataLoader());
    };

    overrides.templateName = 'demo-hello-ajax';  // for Dialog 模式

    /**
     * 配置 loading 的模板
     *
     * @type {string}
     */
    overrides.loadingTemplateName = 'demo-hello-ajax-loading';

    /**
     * 渲染之前的数据准备工作
     * 可以直接返回一个{@link Promise}对象来延续异步状态
     *
     * @return {Promise}
     */
    overrides.prepare = function () {
        var me = this;
        // return me.model.dataLoaderSet.loadFakeList.load();
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                me.model.dataLoaderSet.loadFakeList.load().then(function () {
                    resolve();
                });
            }, 3000);
        });
    };

    /**
     * 配置UI属性
     */
    overrides.uiProperties = {
        'btnFootOk': {
            content: '保存'
        },
        'btnFootCancel': {
            content: '关闭'
        }
    };

    /**
     * 配置UI事件
     */
    overrides.uiEvents = {
        'btnFootOk:click': function () {
            alert('saved ok!');
        },
        'btnFootCancel:click': 'hide'
    };

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {
        this.model.on('change:fakeList', this.repaint, this);
    };

    return fc.oo.derive(BaseComponent, overrides);
});
