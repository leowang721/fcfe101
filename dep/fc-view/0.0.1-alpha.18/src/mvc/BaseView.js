/**
 * @file fc-view BaseView
 * 基于er.View，参考ef.UIView进行处理
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var fc = require('fc-core');
    var _ = require('underscore');

    /**
     * 基于er.View，参考ef.UIView进行处理
     * @class meta.BaseView
     * @constructor
     * @extends er.View
     */
    var overrides = {};
    overrides.constructor = function () {
        // 指定了名字，但是新实例应该有不同的名字
        this.name = this.name + '-' + fc.util.guid();
        // call super
        this.$super(arguments);
    };

    /**
     * name
     * @type {string}
     */
    overrides.name = 'fc-view-mvc-BaseView';

    function getProperty(target, path) {
        var value = target;
        for (var i = 0; i < path.length; i++) {
            value = value[path[i]];
        }

        return value;
    }

    /**
     * 替换元素属性中的特殊值
     *
     * @param {string} value 需要处理的值
     * @return {*} 处理完的值
     * @public
     */
    overrides.replaceValue = function (value) {
        if (typeof value !== 'string') {
            return value;
        }

        if (value === '@@' || value === '**') {
            return this.model;
        }

        var prefix = value.charAt(0);
        var actualValue = value.substring(1);

        if (prefix === '@' || prefix === '*') {
            var path = actualValue.split('.');
            var gValue = this.model.get(path[0]);
            return path.length > 1
                ? getProperty(gValue, path.slice(1))
                : gValue;
        }

        return value;
    };

    /**
     * 根据id获取当前视图下的控件
     * @protected
     *
     * @param {string} id 控件的id
     * @return {?fcui.Control} 对应的控件
     */
    overrides.get = function (id) {
        return this.viewContext.get(id);
    };

    /**
     * 根据id获取控件实例，如无相关实例则返回`esui.SafeWrapper`
     *
     * @param {string} id 控件id
     * @return {fcui.Control} 根据id获取的控件
     */
    overrides.getSafely = function (id) {
        return this.viewContext.getSafely(id);
    };

    /**
     * 根据name获取当前视图下的控件组
     *
     * @param {string} name 控件组的名称
     * @return {fcui.ControlGroup} 对应的控件组
     * @protected
     */
    overrides.getGroup = function (name) {
        return this.viewContext.getGroup(name);
    };

    /**
     * 创建一个控件实例
     *
     * @param {string} type 控件的类型
     * @param {Obejct=} options 创建控件时的选项
     * @return {fcui.Control}
     * @proceted
     */
    overrides.create = function (type, options) {
        options = options || {};
        if (!options.viewContext) {
            options.viewContext = this.viewContext;
        }
        return require('esui').create(type, options);
    };

    /**
     * 显示一条提示信息
     *
     * @param {string | Object} content 提示的内容或完整的配置项
     * @param {string=} title 提示框的标题，如`content`提供配置项则无此参数
     * @return {esui/Dialog}
     * @protected
     */
    overrides.alert = function (content, title) {
        var options = typeof content === 'string'
            ? {title: title || document.title, content: content}
            : _.clone(content);
        if (!options.viewContext) {
            options.viewContext = this.viewContext;
        }

        var Dialog = require('esui/Dialog');
        return Dialog.alert(options);
    };

    /**
     * 显示一条确认信息
     *
     * @param {string | Object} content 提示的内容或完整的配置项
     * @param {string=} title 提示框的标题，如`content`提供配置项则无此参数
     * @return {esui/Dialog}
     * @protected
     */
    overrides.confirm = function (content, title) {
        var options = typeof content === 'string'
            ? {title: title || document.title, content: content}
            : _.clone(content);
        if (!options.viewContext) {
            options.viewContext = this.viewContext;
        }

        var Dialog = require('esui/Dialog');
        return Dialog.confirm(options);
    };

    /*
     * 声明控件的事件。该属性有2种方式：
     *
     * - 以`id:eventName`为键，以处理函数为值。
     * - 以`id`为键，值为一个对象，对象中以`eventName`为键，处理函数为值。
     *
     * 在此处声明的事件，运行时的`this`对象均是`View`实例，而非控件的实例。
     *
     * 同时，在运行期，`UIView`会克隆该属性，将其中所有的处理函数都进行一次`bind`，
     * 将`this`指向自身，因此运行时的`uiEvents`与类声明时的不会相同。
     *
     * 如果需要解除某个事件的绑定，可以使用`.on('type', this.uiEvents.xxx)`进行。
     *
     * @type {Object}
     * @public
     */
    overrides.uiEvents = null;

    /*
     * 获取当前视图关联的控件事件声明。参考`uiEvents`属性
     *
     * @return {Object}
     * @public
     */
    overrides.getUIEvents = function () {
        return this.uiEvents || {};
    };

    /**
     * 声明控件的额外属性。
     *
     * 这个属性以控件的id为键，以一个对象为值。对象表示要额外附加到控件上的属性。
     * 当控件实例化时，会把DOM中声明的属性与此处声明的合并在一起，此处声明的为优先。
     *
     * @type {Object}
     * @public
     */
    overrides.uiProperties = null;

    /**
     * 声明当前视图关联的控件的额外属性，参考`uiProperties`属性
     *
     * @return {Object}
     */
    overrides.getUIProperties = function () {
        return this.uiProperties;
    };

    /**
     * 给指定的控件绑定事件
     *
     * @param {UIView} view View对象实例
     * @param {string} id 控件的id
     * @param {string} eventName 事件名称
     * @param {Function | string} handler 事件处理函数，或者对应的方法名
     * @return {Function} 绑定到控件上的事件处理函数，不等于`handler`参数
     * @inner
     */
    function bindEventToControl(view, id, eventName, handler) {
        if (typeof handler === 'string') {
            handler = view[handler];
        }

        // TODO: mini-event后续会支持`false`作为处理函数，要考虑下
        if (typeof handler !== 'function') {
            return handler;
        }

        var control = view.get(id);
        if (control) {
            control.on(eventName, handler, view);
        }

        return handler;
    }

    /**
     * 绑定控件的事件。
     *
     * @override
     * @protected
     */
    overrides.bindEvents = function () {
        var me = this;
        var events = me.getUIEvents();
        if (!events) {
            return;
        }

        for (var key in events) {
            if (!events.hasOwnProperty(key)) {
                // 下面逻辑太长了，在这里先中断
                continue;
            }

            // 可以用`uiid:click`的形式在指定控件上绑定指定类型的事件
            // 扩展增加，可以用`@groupid:click`的形式批量绑定指定类型的事件
            var segments = key.split(':');
            if (segments.length > 1) {
                var id = segments[0];
                var type = segments[1];
                var handler = events[key];

                if (id.indexOf('@') === 0) {
                    // group
                    var groupid = id.split('@')[1];
                    var group = me.getGroup(groupid);
                    group && group.each(function (item) {
                        bindEventToControl(me, item.id, type, handler);
                    });
                }
                else {
                    bindEventToControl(me, id, type, handler);
                }
            }
            // 也可以是一个控件的id，值是对象，里面每一项都是一个事件类型
            // 或者是`@groupid`的形式
            else {
                var map = events[key];

                if (typeof map !== 'object') {
                    return;
                }

                for (var hType in map) {
                    if (!map.hasOwnProperty(hType)) {
                        continue;
                    }
                    var hHandler = map[hType];
                    if (key.indexOf('@') === 0) {
                        // group
                        var hGroupid = key.split('@')[1];
                        var hGroup = me.getGroup(hGroupid);
                        hGroup && hGroup.each(function (item) {
                            bindEventToControl(me, item.id, hType, hHandler);
                        });
                    }
                    else {
                        bindEventToControl(me, key, hType, hHandler);
                    }
                }
            }
        }
    };

    /**
     * 创建当前`UIView`使用的`ViewContext`对象
     *
     * @return {ViewContext}
     * @public
     */
    overrides.createViewContext = function () {
        var ViewContext = require('esui/ViewContext');
        var name = this.name;

        return new ViewContext(name || null);
    };

    /**
     * 创建当前`UIView`使用的`ViewContext`对象
     *
     * @return {ViewContext}
     * @public
     */
    overrides.createComponentContext = function () {
        var ComponentContext = require('../component/ComponentContext');
        var name = this.name;

        return new ComponentContext(name || null);
    };

    /**
     * 根据name获取当前视图下的Component
     * @protected
     *
     * @param {string} name 控件的name
     * @return {?Component} 对应的Component
     */
    overrides.getComponent = function (name) {
        return this.componentContext.get(name);
    };

    /**
     * 当容器渲染完毕后触发，用于控制元素可见性及绑定事件等DOM操作
     *
     * @override
     * @protected
     */
    overrides.enterDocument = function () {
        var me = this;
        me.viewContext = me.createViewContext();
        me.componentContext = me.createComponentContext();

        var container = me.getContainerElement();
        var options = {
            viewContext: me.viewContext,
            properties: me.getUIProperties(),
            valueReplacer: _.bind(me.replaceValue, me)
        };

        var error;
        try {
            require('esui').init(container, options);
        }
        catch (ex) {
            error = new Error(
                'ESUI initialization error on view '
                + 'because: ' + ex.message
            );
            error.actualError = ex;
            throw error;
        }

        try {
            require('fc-component-ria').init(container, {
                model: me.model,
                viewContext: me.viewContext,
                componentContext: me.componentContext
            }).then(function () {
                me.bindEvents();
                me.customDocument();
            });
        }
        catch (ex) {
            error = new Error(
                'Component initialization error on view '
                + 'because: ' + ex.message
            );
            error.actualError = ex;
            throw error;
        }
    };

    /**
     * 获取要去渲染的数据，但是这里做一个扩充处理
     * 可以使用自定义的replacer来进行展现替换，不改变model的东西
     * @return {Object} 一个提供了get方法的数据获取器
     */
    overrides.getTemplateData = function () {
        var me = this;
        var result = me.$super(arguments);
        var oldVisit = result.get;
        result.get = function (propertyPath) {
            var value = oldVisit(propertyPath);
            if (me.templateDataReplacer
                && me.templateDataReplacer[propertyPath]) {
                var replacer = me.templateDataReplacer[propertyPath];
                if (_.isFunction(replacer)) {
                    return replacer.call(me, value, me.model);
                }
                // 否则是其他类型的，就直接覆盖
                return replacer;
            }
            return value;
        };
        return result;
    };

    /**
     * View的模板数据替换配置
     * @type {Object}
     */
    overrides.templateDataReplacer = null;

    /**
     * 在view的初始化阶段暴露给开发者的自定义处理
     */
    overrides.customDocument = function () {};

    /**
     * 增加repaint作为render的别名
     */
    overrides.repaint = function () {
        this.render();
    };

    /**
     * 销毁当前视图
     *
     * @override
     * @protected
     */
    overrides.dispose = function () {
        if (this.viewContext) {
            this.viewContext.dispose();
            this.viewContext = null;
        }
        if (this.components) {
            _.each(this.components, function (item) {
                item.dispose();
            });
            this.components = null;
        }
        this.$super(arguments);
    };

    var BaseView = fc.oo.derive(require('er/View'), overrides);
    return BaseView;
});
