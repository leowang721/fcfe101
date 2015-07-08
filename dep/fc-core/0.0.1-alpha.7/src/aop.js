/**
 * @ignore
 * @file AOP related modules.
 * Refer: http://en.wikipedia.org/wiki/Aspect-oriented_programming
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 * @author Pride Leong(liangjinping@baidu.com)
 */

define(function (require) {
    'use strict';

    /**
     * aop方法的namespace
     * @class fc.core.aop
     * @singleton
     */
    var aop = {};

    /**
     * Injects the method called before the core method.
     *
     * @param {Object} context The obj that the method belongs to.
     * @param {string} methodName The name of the method in the context.
     * @param {Function} aspectMethod The method to be injected before
     *     the core method.
     */
    aop.before = function (context, methodName, aspectMethod) {
        if (!aspectMethod) {
            // Do nothing if the aspectMethod is invalid.
            return;
        }
        var original = context[methodName];
        context[methodName] = function () {
            // 为了防止前置出错
            try {
                aspectMethod.apply(this, arguments);
            }
            finally {
                return original.apply(this, arguments);
            }
        };
    };

    /**
     * Injects the method called before the core method
     * If the return value of the injected method is true，execute the core method
     *
     * @param {Object} context The obj that the method belongs to.
     * @param {string} methodName The name of the method in the context.
     * @param {Function} aspectMethod The method to be injected before
     *     the core method.
     */
    aop.beforeReject = function (context, methodName, aspectMethod) {
        if (!aspectMethod) {
            // Do nothing if the aspectMethod is invalid.
            return;
        }
        var original = context[methodName];
        context[methodName] = function () {
            if (aspectMethod.apply(this, arguments)) {
                return original.apply(this, arguments);
            }
        };
    };

    /**
     * Injects the method called after the core method.
     *
     * @param {Object} context The obj that the method belongs to.
     * @param {string} methodName The name of the method in the context.
     * @param {Function} aspectMethod The method to be injected after
     *     the core method.
     */
    aop.after = function (context, methodName, aspectMethod) {
        if (!aspectMethod) {
            // Do nothing if the aspectMethod is invalid.
            return;
        }
        var original = context[methodName];
        context[methodName] = function () {
            var result = original.apply(this, arguments);
            // 为了防止后置出错
            try {
                aspectMethod.apply(this, arguments);
            }
            finally {
                return result;
            }
        };
    };

    /**
     * Injects the methods called before and after the core method respectively.
     *
     * @param {Object} context The obj that the method belongs to.
     * @param {string} methodName The name of the method in the context.
     * @param {Function} beforeMethod The method to be injected before the core
     *     method.
     * @param {Function} afterMethod The method to be injected after the core
     *     method.
     */
    aop.around = function (context, methodName, beforeMethod, afterMethod) {
        aop.before(context, methodName, beforeMethod);
        aop.after(context, methodName, afterMethod);
    };

    /**
     * 劫持原方法，在注入方法有返回结果的情况下终止原方法的执行
     *
     * 劫持${context}的${methodName}方法，并以${aspectMethod}的执行结果替代返回
     * 如果${aspectMethod}没有返回或者执行异常，则继续使用${context[methodName]}
     * 方法的结果返回
     *
     * @param {Object} context 注入方法的上下文
     * @param {string} methodName 方法名
     * @param {Function} aspectMethod 注入的方法
     */
    aop.hijack = function (context, methodName, aspectMethod) {
        if (!aspectMethod) {
            // Do nothing if the aspectMethod is invalid.
            return;
        }
        var original = context[methodName];
        context[methodName] = function () {
            var result;
            // 如果劫持方法返回undefined则正常返回原来的方法的执行结果
            // 否则返回劫持方法的执行结果
            try {
                result = aspectMethod.apply(context, arguments);
            }
            finally {
                if (undefined !== result) {
                    return result;
                }
            }
            return original.apply(context, arguments);
        };
    };

    return aop;
});
