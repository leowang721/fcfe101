/**
 * @file 点击按钮出浮出层组件
 * 请在其外层套个relitive的div
 * eg：
 * <div style="position: relative">
 *     <div data-ui="type:DropLayerButton;id:xxx;"></div>
 * </div>
 * option：
 * {
 *     displayText: 按钮上的文本
 *     width: 按钮宽，
 *     autoClose：是否自动关闭，
 *     dockPosition: layer的位置，参考dom.dock()
 *     dockOptions: layer的位置其他参数，参考dom.dock()
 *     title: layer的title，
 *     hideTitle: true时，隐藏title，
 *     hideFooter: true时，隐藏footer，
 *     LayerType: 可以自定义的Layer实现，
 *     layerWidth：layer的宽，
 *     layerContent: layer的内容，
 *     layerTemplate：layer完全用template的内容,无需单独配置title、content等，
 *     layerClass: layer 的样式
 *     selfClass：button自定义样式
 * }
 * 事件
 * afterrender: layer渲染完毕后抛出的事件
 * layerok: 点击确定按钮
 * layercancle: 点击取消按钮
 *
 * @author Shiying Wang （wangshiying@baidu.com）
 * @author Han Bing Feng
 * @param {Function} require require
 * @return {Table} 表格控件类
 */
define(function (require) {
    var underscore = require('underscore');
    var fc = require('fc-core');
    var ui = require('../main');
    var lib = require('../lib');
    var CommandMenu = require('../FcCommandMenu');
    var Control = require('../Control');
    var DropLayer = require('./DropLayer');

    var _template = require('./template.tpl');

    /**
     * 点击按钮出浮层控件
     *
     * 类似HTML的`<select>`元素
     *
     * @param {Object} options options
     * @extends InputControl
     * @constructor
     */
    function DropLayerButton(options) {
        Control.apply(this, arguments);
        var engine;

        if (options.templateEngine) {
            engine = options.templateEngine;
        }
        else {
            engine = new fc.tpl.Engine();
            engine.compile(_template);
        }

        this.helper.setTemplateEngine(engine);
    }

    /**
     * 继承CommandMenu
     */
    lib.inherits(DropLayerButton, CommandMenu);

    /**
     * 初始化DOM结构
     *
     * @protected
     * @override
     */
    DropLayerButton.prototype.initStructure = function () {
        // 如果传入特殊样式，增加样式
        if (this.selfClass) {
            lib.addClass(this.main, this.selfClass);
        }
        // 一些特殊的layer，可以自己继承DropLayer，做特殊处理
        if (this.LayerType) {
            this.layer = new this.LayerType(this);
        }
        else {
            this.layer = new DropLayer(this);
        }
    };

    /**
     * 初始化事件交互
     *
     * @protected
     * @override
     */
    DropLayerButton.prototype.initEvents = function () {
        CommandMenu.prototype.initEvents.apply(this, arguments);
        this.helper.removeDOMEvent(this.main, 'click');
        this.helper.addDOMEvent(
            this.main,
            'click',
            underscore.bind(this.layer.toggle, this.layer)
        );
    };

    /**
     * 控件类型
     * @type {string}
     * @readonly
     * @override
     */
    DropLayerButton.prototype.type = 'DropLayerButton';

    ui.register(DropLayerButton);
    return DropLayerButton;
});
