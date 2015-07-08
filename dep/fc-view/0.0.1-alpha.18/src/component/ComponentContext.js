/**
 * @file ComponentContext Component环境类，学习自ViewContext
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var fc = require('fc-core');
    var EventTarget = require('fc-core/EventTarget');

    var pool = {};

    var overrides = {};

    overrides.constructor = function (id) {
        if (!id) {
            id = fc.util.guid();
        }

        // 如果已经有同名的，说明上次处理没有正确的dispose掉
        if (pool.hasOwnProperty(id)) {
            // throw new Error('the same id `' + id + '` ComponentContext exsited!');
            // 已经有了 不要再处理了
            // dispose之
            pool[id].dispose();
        }

        /**
         * 视图环境Components集合
         *
         * @type {Object}
         * @private
         */
        this.components = {};

        /**
         * 视图环境id
         *
         * @type {string}
         * @readonly
         */
        this.id = id;

        // 入池
        pool[this.id] = this;
    };

    /**
     * 通过name获取控件实例。
     *
     * @param {string} name Component的name
     * @return {Component} 对应的Component
     */
    overrides.get = function (name) {
        return this.components[name];
    };

    /**
     * 将实例添加到环境中
     *
     * @param {Component} component 待加Component
     */
    overrides.add = function (component) {
        var exists = this.components[component.name];

        // 已存在
        if (exists) {
            // 是同一控件，不做处理
            if (exists === component) {
                return;
            }

            // 不是同一控件，先覆盖原关联控件的componentContext
            exists.setComponentContext(null);
        }

        this.components[component.name] = component;

        component.setComponentContext(this);
    };

    /**
     * 将控件实例从环境中移除。
     *
     * @param {Component} component 待移除控件
     */
    overrides.remove = function (component) {
        component.setComponentContext(null);
        delete this.components[component.name];
    };

    /**
     * 清除视图环境中所有控件
     */
    overrides.clean = function () {
        for (var id in this.components) {
            if (this.components.hasOwnProperty(id)) {
                var component = this.components[id];
                component.dispose();
                // 如果控件销毁后“不幸”`componentContext`还在，就移除掉
                if (component.componentContext && component.componentContext === this) {
                    this.remove(component);
                }
            }
        }
    };

    /**
     * 销毁视图环境
     */
    overrides.dispose = function () {
        this.clean();
        delete pool[this.id];
        this.destroyEvents();
    };

    var ComponentContext = fc.oo.derive(EventTarget, overrides);

    /**
     * 根据id获取ComponentContext
     * @static
     * @param {string} id 视图环境id
     * @return {ComponentContext}
     */
    ComponentContext.get = function (id) {
        return pool[id] || null;
    };

    return ComponentContext;
});
