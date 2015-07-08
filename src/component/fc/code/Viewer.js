/**
 * @file Component - `fc-code-viewer`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var $ = require('jquery');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    require('css!./viewer.less');

    // require ui
    // require('fcui/TextBox');

    /**
     * Component - `fc-code-viewer`
     * @class
     * @constructor
     */
    var overrides = {};

    overrides.initialize = function () {
        var type = 'javascript';

        var model = this.getModel();
        model.set('type', type || 'javascript');
    };

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
        var model = this.getModel();
        var codingMain = this.find('.fc-code-viewer');
        this.viewer = ace.edit(codingMain);
        this.viewer.setTheme('ace/theme/monokai');
        this.viewer.$blockScrolling = Infinity;
        this.viewer.setReadOnly(true);
        this.viewer.getSession().setMode('ace/mode/' + model.get('type'));

        model.on('change:codeFilePath', this.setCode, this);

    };

    overrides.setCode = function (e) {
        var me = this;
        var filePath = e.newValue;
        var type = determineType(filePath);

        me.viewer.getSession().setMode('ace/mode/' + type);

        $.get(filePath).done(function (code) {
            me.viewer.setValue(code);
        });
    };

    function determineType(filePath) {
        if (/\.html$/g.test(filePath)) {
            return 'html';
        }
        if (/\.js/g.test(filePath)) {
            return 'javascript';
        }
        if (/\.css/g.test(filePath)) {
            return 'css';
        }
        if (/\.less/g.test(filePath)) {
            return 'less';
        }
    }

    return fc.oo.derive(BaseComponent, overrides);
});
