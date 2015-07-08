/**
 * @file Component - `fc-code-editor`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    require('css!./editor.less');

    // require ui
    require('fcui/FcTab');

    /**
     * Component - `fc-code-editor`
     * @class
     * @constructor
     */
    var overrides = {};

    overrides.initialize = function () {
        var type;
        if (this.container) {
            type = $(this.container).prop('type');
        }


        var model = this.getModel();
        model.set('type', type || 'html');
    };

    /**
     * 渲染之前的数据准备工作
     * 可以直接返回一个{@link Promise}对象来延续异步状态
     */
    // overrides.prepare = function () {};

    /**
     * 配置UI属性
     */
    overrides.uiProperties = {
        'fc-code-editor-type': {
            
        }
    };

    /**
     * 配置UI事件
     */
    overrides.uiEvents = {
        'fc-code-editor-type': {
            'activate': function (e) {
                this.type = e.tab.panel;
            }
        }
    };

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {
        var codingMain = this.find('#fc-code-editor-main');
        this.editor = ace.edit(codingMain);
        this.editor.setTheme('ace/theme/monokai');
        this.editor.$blockScrolling = Infinity;
        // this.editor.setReadOnly(true);
        this.editor.getSession().setMode('ace/mode/' + this.type);
    };

    return fc.oo.derive(BaseComponent, overrides);
});
