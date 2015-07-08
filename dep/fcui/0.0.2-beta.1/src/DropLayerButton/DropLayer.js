/**
 * @file DropLayerButton的基础层
 * @author Shiying Wang （wangshiying@baidu.com）
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Table} 表格控件类
 */
define(function (require) {
    var underscore = require('underscore');
    var lib = require('../lib');
    var Layer = require('../Layer');

    require('../FcButton');

    /**
     * 像素单位
     *
     * @const
     * @type {string}
     */
    var PX = 'px';

    /**
     * 获得hidden样式
     *
     * @param {Object} layer DropLayer组件本身
     * @return {string} hidden的class样式
     */
    function getHiddenClasses(layer) {
        var classes = layer.control.helper.getPartClasses('layer-hidden');
        return classes;
    }

    /**
     * DropLayer控件使用的层类
     *
     * @extends Layer
     * @constructor
     */
    function DropLayer() {
        Layer.apply(this, arguments);
    }

    /**
     * 继承Layer
     */
    lib.inherits(DropLayer, Layer);

    /**
     * 获取浮层DOM元素，将element插入document，
     * 将其插入control.main的父元素,解决滚动框时，layer与主元素分离的问题
     *
     * @param {boolean} [isAutoCreate=true] 不存在时是否创建
     * @return {HTMLElement}
     * @override
     */
    DropLayer.prototype.getElement = function (isAutoCreate) {
        var me = this;
        var control = me.control;
        var element = control.helper.getPart('layer');

        if (element || isAutoCreate === false) {
            return element;
        }

        element = me.create();
        me.render(element);
        lib.addClasses(element, getHiddenClasses(me));
        if (control.layerClass) {
            lib.addClass(element, control.layerClass);
        }
        // 如果设置自动关闭为true
        if (control.autoClose) {
            // 点击document关掉layer
            control.helper.addDOMEvent(document, 'mousedown',
                /**
                 * @this control，DropLayer所附着的控件
                 */
                function (evt) {
                    if (this.hasState('active')) {
                        me.hide();
                    }
                }
            );
            // 点击layer自己不关掉，阻止冒泡到`document`
            control.helper.addDOMEvent(
                element,
                'mousedown',
                function (e) {
                    e.stopPropagation();
                }
            );
            // 点击contrl.main自己不关掉，阻止冒泡到`document`
            control.helper.addDOMEvent(
                control.main,
                'mousedown',
                function (e) {
                    if (control.hasState('active')) { // 只有layer在显示的时候，才阻止document的冒泡。
                        e.stopPropagation();
                    }
                }
            );
        }
        me.syncState(element);
        me.initBehavior(element);
        document.body.appendChild(element);
        control.fire('afterrender');
        return element;
    };

    /**
     * 渲染layer的内容
     *
     * @param {Object} element layer的主元素
     * @override
     */
    DropLayer.prototype.render = function (element) {
        var control = this.control;
        var helper = control.helper;
        var customTemplate = control.layerTemplate;

        // 传入template，表示完全用自己的模板
        if (customTemplate) {
            element.innerHTML = customTemplate;
            // 初始化html中的esui控件
            helper.initChildren(element);
            return;
        }
        var titleClass = helper.getPartClasses('title');
        var footerClass = helper.getPartClasses('footer');
        // 要隐藏title
        if (control.hideTitle) {
            titleClass = titleClass.concat(
                helper.getPartClasses('title-hidden')
            );
        }

        // 要隐藏footer
        if (control.hideFooter) {
            footerClass = footerClass.concat(
                helper.getPartClasses('footer-hidden')
            );
        }
        if (control.layerWidth) {
            element.style.width = control.layerWidth + PX;
        }
        element.innerHTML = helper.renderTemplate(
            'dropLayer',
            {
                titleClass: titleClass.join(' '),
                title: control.title || '',
                closeId: helper.getId('close'),
                closeIconClass: helper.getPartClasses('close-icon').join(' '),
                contentId: helper.getId('content'),
                contentClass: helper.getPartClasses('content').join(' '),
                content: control.layerContent || '',
                footerClass: footerClass.join(' ')
            }
        );
        helper.initChildren(element);
    };

    /**
     * 为layer内元素绑定事件
     *
     * @override
     */
    DropLayer.prototype.initBehavior = function () {
        this.bindCloseEvent();
        this.bindConfirmEvent();
        this.bindCancelEvent();
    };

    /**
     * 绑定关闭事件
     *
     */
    DropLayer.prototype.bindCloseEvent = function () {
        var control = this.control;
        var helper = control.helper;
        var closeElem = helper.getPart('close');
        if (closeElem) {
            helper.addDOMEvent(
                closeElem,
                'click',
                underscore.bind(this.hide, this)
            );
        }
    };

    /**
     * 绑定确认事件
     *
     */
    DropLayer.prototype.bindConfirmEvent = function () {
        var me = this;
        var control = me.control;
        var okBtn = control.getChild('confirmBtn');

        // 点击浮层的确定按钮，触发layerOk事件，并隐藏浮出层
        if (okBtn) {
            okBtn.on(
                'click',
                function () {
                    var e = control.fire('confirm');
                    if (!e.isDefaultPrevented()) {
                        me.hide();
                    }
                }
            );
        }
    };

    /**
     * 绑定取消事件
     *
     */
    DropLayer.prototype.bindCancelEvent = function () {
        var me = this;
        var control = me.control;
        var cancelBtn = control.getChild('cancelBtn');
        if (cancelBtn) {
            // 点击浮层的取消按钮，触发layerCancle事件，并隐藏浮出层
            cancelBtn.on('click', function () {
                control.fire('cancel');
                me.hide();
            });
        }
    };

    /**
     * 隐藏层
     */
    DropLayer.prototype.hide = function () {
        var control = this.control;
        var classes = getHiddenClasses(this);
        var element = this.getElement();
        lib.addClasses(element, classes);
        control.removeState('active');
        control.fire('hide');
    };

    /**
     * 显示层
     */
    DropLayer.prototype.show = function () {
        var element = this.getElement();
        var control = this.control;
        element.style.zIndex = this.getZIndex();
        this.position();
        var classes = getHiddenClasses(this);
        lib.removeClasses(element, classes);
        control.addState('active');
        control.fire('show');
    };

    /**
     * layer打开时做的一些处理
     *
     * @override
     */
    DropLayer.prototype.syncState = function (element) {
        this.control.fire('statesync', {ele: element});
    };

    /**
     * 设置layer的位置
     *
     * @override
     */
    DropLayer.prototype.position = function () {
        var dockPosition = this.control.dockPosition
            || lib.DockPosition.TOP_BOTTOM_LEFT_LEFT;
        lib.dock(this.control.main, this.getElement(), dockPosition, this.control.dockOptions);
    };

    return DropLayer;
});
