/**
 * @file fc-component-ria 提供可以跟RIA整合的component模式 主入口文件
 * Basic support：Chrome、Firefox3.5+、Opera10+、Safari3.2+、IE8+
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    'use strict';

    var _ = require('underscore');
    var fc = require('fc-core');
    var Promise = require('fc-core/Promise');

    /**
     * fc-component-ria 提供可以跟RIA整合的component模式
     */
    var component = {
        version: '0.0.1.alpha.7',

        /**
         * 已经注册了的Components
         */
        registeredComponents: [],

        /**
         * 初始化某个区域的component
         * @param {HtmlElement | string=} container 容器
         * @param {Object=} options 配置
         * @param {meta.Model} options.model 模板的数据
         * @param {boolean} options.includeContainer 是否包括容器自身
         * @return {Promise} 异步执行状态
         */
        init: function (container, options) {
            if (typeof container === 'string') {
                container = document.querySelector(container);
            }
            if (!container) {
                container = document.documentElement;
            }

            options = options || {};

            var componentList = require('./analyser').analyse(container, options.includeContainer);
            var state = [];
            // 模板替换
            _.each(componentList, function (component) {

                var domList = _.toArray(container.querySelectorAll(component.name));
                if (options.includeContainer && container.tagName === component.name.toUpperCase()) {
                    // Array.prototype.unshift.call(domList, container);
                    domList.unshift(container);
                }
                if (component.action) {
                    state.push(
                        initCustomedComponent(component, domList, options)
                    );
                }
                else {
                    initBasicComponent(component, domList, options);
                }
            });

            if (state.length > 0) {
                var counter = state.length;
                return new Promise(function (resolve, reject) {
                    _.each(state, function (eachState) {
                        eachState.ensure(function () {
                            counter--;
                            if (counter === 0) {
                                resolve();
                            }
                        });
                    });
                });
                // return Promise.all(state);
            }
            return Promise.resolve();
        }
    };

    function initCustomedComponent(component, domList, options) {
        return require('fc-core/Promise').require([component.action]).then(
            function (ComponentAction) {
                var state = [];
                _.each(domList, function (eachDom) {
                    if (options.componentContext && options.componentContext.get(component.name)) {
                        var exist = options.componentContext.get(component.name);
                        options.componentContext.remove(exist);
                        exist.dispose();
                        exist = null;
                    }

                    var instance = new ComponentAction(
                        _.chain({})
                            .extend(options)
                            .extend({
                                container: eachDom,
                                template: component.template,
                                name: component.name
                            })
                            .value()
                    );

                    state.push(instance.enter());
                });
                return Promise.all(state);
            }
        ).catch(function (e) {
            fc.util.processError(e);
        });
    }

    function initBasicComponent(component, domList, options) {
        _.each(domList, function (target) {
            target.innerHTML = component.renderer(options.model.dump ? options.model.dump() : {});
        });
    }

    return component;
});
