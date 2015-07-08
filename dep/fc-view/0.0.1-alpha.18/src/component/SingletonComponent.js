/**
 * @file 单例组件类
 * 本类提供一个单例组件类的支持
 * 使用模式是show之后绑定事件，hide或者下次show会自动清除期间的注册事件
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');

    var BaseComponent = require('./BaseComponent');

    var overrides = {};

    overrides.initOptions = function () {
        this.$super(arguments);
        this.dialogOptions.closeOnHide = false;  // 强制隐藏不关闭（不销毁）
    };

    /**
     * 展现，单例可以在展现时覆盖配置
     * @param {Object} options 配置
     * @param {ViewContext} options.viewContext ui环境
     * @param {BaseModel} options.model 数据Model
     * @param {HtmlElement | string} container 容器
     * @param {string} template 模板内容
     */
    overrides.show = function (options) {
        this.initOptions(options);
        this.$super(arguments);
        // 并且开始监听这时候开始所有注册的事件
        // 如果有未清理的会清理掉
        listenPostEvent.call(this);
    };

    overrides.hide = function () {
        this.control.hide();
        // 并且清除本次展现期间注册的事件
        clearPostEvent.call(this);
    };

    /**
     * @type {?Array.<Object>}
     * 元素的key为：type, handler, thisObject
     */
    overrides._postEvents = null;

    /**
     * 扩展的注册一个事件处理函数
     *
     * @param {string} type 事件的类型
     * @param {Function | boolean} fn 事件的处理函数，
     * 特殊地，如果此参数为`false`，将被视为特殊的事件处理函数，
     * 其效果等于`preventDefault()`及`stopPropagation()`
     * @param {Mixed} [thisObject] 事件执行时`this`对象
     * @param {Object} [options] 事件相关配置项
     * @param {boolean} [options.once=false] 控制事件仅执行一次
     */
    overrides._extendedOn = function (type, fn, thisObject, options) {
        this._postEvents.push({
            type: type,
            handler: fn,
            thisObject: thisObject
        });
        this._originalOn(type, fn, thisObject, options);
    };

    function listenPostEvent() {
        var me = this;

        clearPostEvent.call(me);

        // 开始监听
        me._originalOn = me.on;
        me.on = me._extendedOn;
    }

    function clearPostEvent() {
        var me = this;
        // 如果存在，则清理
        if (me._postEvents) {
            _.each(me._postEvents, function (item) {
                me.un(item.type, item.handler, item.thisObject);
            });
        }
        me._postEvents = [];
        me.on = me._originalOn || me.on;
    }

    var SingletonComponent = fc.oo.derive(BaseComponent, overrides);
    SingletonComponent.createInstance = function () {
        return new SingletonComponent();
    };

    return SingletonComponent;
});
