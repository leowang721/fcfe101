/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file FCUI 控件基类，由ESUI 3.1.0-beta.3派生。
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Control} FCUI 控件基类
 */
define(function (require) {
    var u = require('underscore');
    var eControl = require('esui/Control');
    var eoo = require('eoo');
    var Helper = require('./Helper');
    var lib = require('./lib');

    /**
     * @class Control
     *
     * Control类。
     *
     * @extends esui/Control
     * @constructor
     */
    var proto = {
        constructor: function () {
            this.$super(arguments);

            this.helper = new Helper(this);

            this.handlersMap = {};
        }
    };

    /**
     * 初始化事件handler。读取 this.eventHandlers 的配置，生成一组event
     * handlers。
     * @protected
     */
    proto.initEvents = function () {
        this.$super(arguments);
        u.each(this.eventHandlers, function (handler, id) {
            this.enableHandler(id);
        }, this);
    };

    /**
     * 从eventHandlers里找到id对应的handler并启用。
     * @param {string} id handler id
     * @param {boolean} isForce 是否无视enable设置直接启用
     */
    proto.enableHandler = function (id, isForce) {
        var handler = this.eventHandlers[id];
        if (!handler) {
            return;
        }
        var enable = handler.enable;
        if (typeof enable === 'function') {
            enable = !!enable.call(this);
        }
        if (handler && (typeof enable === 'undefined' || isForce || enable)) {
            var el = handler.el || this.main;
            if (el === this.main) {
                var handlersQueue = this.handlersMap[handler.eventType];
                if (typeof handlersQueue === 'undefined') {
                    handlersQueue = this.handlersMap[handler.eventType] = [];
                    // 第一次为这个类型的事件添加handler
                    this.helper.addDOMEvent(
                        el,
                        handler.eventType,
                        this.createHandler(handlersQueue),
                        handlersQueue.push(handler)
                    );
                }
                else {
                    handlersQueue.push(handler);
                }
            }
            else {
                handler.realHandler = u.bind(handler.handler, this);
                // global的就随他去吧
                this.helper.addDOMEvent(
                    el,
                    handler.eventType,
                    handler.realHandler
                );
            }
        }
    };

    /**
     * 取消一个handler的执行。
     * @param  {string} id handler id
     */
    proto.disableHandler = function (id) {
        var handler = this.eventHandlers[id];
        var el = handler.el || this.main;
        if (el === this.main) {
            var handlersQueue = this.handlersMap[handler.eventType];
            if (handlersQueue) {
                var index = u.indexOf(handlersQueue, handler);
                handlersQueue.splice(index, 1);
            }
        }
        else {
            if (handler && handler.realHandler) {
                this.helper.removeDOMEvent(
                    el,
                    handler.eventType,
                    handler.realHandler
                );
                handler.realHandler = undefined;
            }
        }
    };

    /**
     * 创建一个delegate handler，在this.main上监听处理eventType。
     * @param {Array<Control~eventHandler>} handlersQueue handler数组
     * @return {Function} delegate handler
     */
    proto.createHandler = function (handlersQueue) {
        return u.bind(function (event) {
            event = event || window.event;
            var main = this.main;
            u.each(handlersQueue, function (handler) {
                if (handler.query) {
                    var el = lib.parent(event.target, handler.query, main);
                    if (el) {
                        handler.handler.call(this, event, el);
                    }
                }
                else {
                    handler.handler.call(this, event, event.target);
                }
            }, this);
        }, this);
    };

    /**
     * 私有变量，所有的scroll handler。
     * @type {Array}
     */
    proto._scrollHandlers = null;

    /**
     * 用上面的handler创建global的scroll，性能会有问题，用原生的方法做scroll handler
     * @param {Function} handler handler
     */
    proto.addGlobalScrollHandler = function (handler) {
        if (this._scrollHandlers == null) {
            this._scrollHandlers = [handler];
            var me = this;
            var mainHandler = function (e) {
                u.each(me._scrollHandlers, function (h) {
                    h(e);
                });
            };
            window.addEventListener('scroll', mainHandler);
            this.on('afterdispose', function () {
                window.removeEventListener('scroll', mainHandler);
            });
        }
        else {
            this._scrollHandlers.push(handler);
        }
    };

    /**
     * 供子类填写的event handlers配置。id为event的名字，值为handler描述。
     * Event会delegate到this.main上。
     * 可以通过cssMatch和attrMatch锁定需要的event target。
     * @protected
     * @typedef {Object} Control~eventHandler
     * @property {string} id event handler的标识
     * @property {HTMLElement} el 事件的delegate target。
     *           非Global的事件，需要代理到this.main上。也即，这个属性可选值
     *           只有window，document，document.documentElement和document.body
     *           以及this.main。默认为this.main
     * @property {Function|boolean} enable handler是否生效。若为Function则
     *           需要返回一个boolean。Function将以Control为this调用。默认
     *           为true
     * @property {string} eventType event类型，为Element.addEventListener所能
     *           所能接收的type
     * @property {string} query 一个CSS 2.1的query，用于确定event target。
     *           第一个满足此query的将作为event target。
     * @property {Function} handler 事件handler。以Control为this。以event，
     *           符合matcher的element为参数。
     */
    proto.eventHandlers = {};

    var fControl = eoo.create(eControl, proto);

    return fControl;
});
