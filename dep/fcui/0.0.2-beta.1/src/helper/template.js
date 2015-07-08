/**
 * ESUI (Enterprise Simple UI library)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @file 模板相关辅助方法，派生自ESUI 3.1.0-beta.3
 * @see esui/helper/template
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} UI基础库适配层
 */
define(function (require) {
    var u = require('underscore');

    var FILTERS = {
        /**
         * 用作etpl中的filter，返回应配给控件部件的DOM ID。
         * @param  {string} part 控件部件名字
         * @this Control
         * @return {string} 控件部件DOM ID
         */
        'id': function (part) {
            return this.helper.getId(part);
        },
        /**
         * 用作etpl中的filter，返回应配给控件部件的class name。
         * @param  {string} part 控件部件名字
         * @this Control
         * @return {string} 控件部件class name
         */
        'class': function (part) {
            return this.helper.getPartClassName(part);
        },
        /**
         * 用作etpl中的filter，返回应配给控件部件的html标签。
         * @param  {string} part 控件部件名字
         * @param  {string} nodeName 控件部件的HTML标签名字
         * @this Control
         * @return {string} 控件部件HTML片段
         */
        'part': function (part, nodeName) {
            return this.helper.getPartHTML(part, nodeName);
        },
        /**
         * 用作etpl中的filter，调用Control上的任意function，并以其返回值作为
         * filter的结果。
         * 用法：
         *     ${<methodName> | call(<arguments>)}
         * 如：
         *     ${renderMe | call(${some})}
         * 将会在 Control 上调用 renderMe 函数，以 "some" 为参数。以renderMe
         * 的返回值作为这个 etpl 标签的结果。
         * @param  {[type]} methodName [description]
         * @return {[type]}            [description]
         */
        'call': function (methodName) {
            if (typeof this[methodName] !== 'function') {
                throw 'Render error: [' + methodName + '] in Control '
                    + 'is not a valid function.';
            }
            return this[methodName].apply(this,
                Array.prototype.slice.call(arguments, 1));
        },
        /**
         * 用作etpl中的filter。接收所有参数并将其作为字符串拼接并返回。
         * @return {string} 拼接字符串的结果
         */
        'append': function () {
            return Array.prototype.join.call(arguments, '');
        }
    };

    /**
     * @override Helper
     */
    var helper = {};

    /**
     * 设置模板引擎实例
     *
     * @param {etpl.Engine} engine 模板引擎实例
     */
    helper.setTemplateEngine = function (engine) {
        this.templateEngine = engine;

        if (!engine.esui) {
            this.initializeTemplateEngineExtension();
        }
    };

    /**
     * 初始化模板引擎的扩展，添加对应的过滤器
     *
     * @protected
     */
    helper.initializeTemplateEngineExtension = function () {
        var control = this.control;
        u.each(
            FILTERS,
            function (filter, name) {
                this.addFilter(name, u.bind(filter, control));
            },
            this.templateEngine
        );
    };

    /**
     * 通过模板引擎渲染得到字符串
     *
     * @param {string} target 模板名
     * @param {Object} data 用于模板渲染的数据
     * @return {string}
     */
    helper.renderTemplate = function (target, data) {
        data = data || {};

        var templateData = {
            /**
             * 定制一个模板数据的get方法。使得：
             * 1）若data有get方法，调用data的get
             * 2）若data有name属性，返回name属性的值，属性支持用"."。
             * 3）否则，直接返回name。若通过"."访问的属性任一环节找不到属性，
             *     同样直接返回name。
             * @param  {[type]} name [description]
             * @return {[type]}      [description]
             */
            get: function (name) {
                if (typeof data.get === 'function') {
                    return data.get(name);
                }

                var splittedPropertyName = name.split('.');
                var len = splittedPropertyName.length;
                var obj = data;
                for (var i = 0; i < len; i++) {
                    var propertyName = splittedPropertyName[i];
                    if (obj.hasOwnProperty(propertyName)) {
                        obj = obj[propertyName];
                    }
                    else {
                        obj = propertyName;
                        break;
                    }
                }

                return obj;
            }
        };

        if (!this.templateEngine) {
            throw new Error('No template engine attached to this control');
        }

        return this.templateEngine.render(target, templateData);
    };

    return helper;
});
