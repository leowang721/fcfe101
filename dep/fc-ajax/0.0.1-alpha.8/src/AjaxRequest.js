/**
 * @ignore
 * @file 单个Ajax行为类
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var _ = require('underscore');
    var fc = require('fc-core');

    var Promise = require('fc-core/Promise');
    var EventTarget = require('fc-core/EventTarget');
    var hooks = require('./hooks');
    var status = require('./status');

    /**
     * 单个Ajax行为类
     * @class fc.ajax.AjaxRequest
     */
    var proto = {};

    /**
     * 单个Ajax行为类 - 构造函数
     * @constructor
     * @extends meta.EventTarget
     * @param {meta.AjaxOption} option 请求的参数
     */
    proto.constructor = function (option) {
        fc.assert.has(option);

        var me = this;

        /**
         * @property {meta.AjaxOption} [option] 请求的参数
         */
        me.option = option;

        /**
         * @property {meta.Promise} [promise] 异步状态标识
         */
        // me.promise = new Promise(function (resolve, reject) {
        //     me.resolve = resolve;
        //     me.reject = reject;
        // })
        // .then(
        //     _.bind(me.processXhrSuccess, me),
        //     _.bind(me.processXhrFailure, me)
        // )
        // .catch(
        //     _.bind(me.processXhrException, me)
        // );
        // me.promise.ensure(
        //     _.bind(hooks.afterEachRequest, me)
        // );
    };

    /**
     * 执行请求
     * @return {meta.Promise} 异步执行状态
     */
    proto.request = function () {
        var me = this;

        // 行为包裹，以便处理
        hooks.beforeEachRequest.call(me);

        me.promise = new Promise(function (resolve, reject) {
            me.resolve = resolve;
            me.reject = reject;
            var requesting = require('./ajax').request(me.option);
            requesting.then(
                _.bind(me.processXhrSuccess, me),
                _.bind(me.processXhrFailure, me)
            )
            .catch(_.bind(me.processXhrException, me))
            .ensure(_.bind(hooks.afterEachRequest, me));
        }).catch(function (e) {  // to catch running exception in constructor
            me.fire('error', {
                error: e
            });
            return Promise.reject(e);
        });

        return me.promise;
    };

    /**
     * 处理ajax请求成功，转为定制状态
     * @param {Object=} result ajax的执行结果
     * @return {meta.Promise} 定制状态
     */
    proto.processXhrSuccess = function (result) {
        var me = this;
        try {

            // 如果是转向行为，直接转向，整体转为reject
            if (result.redirect) {
                return Promise.reject({
                    status: status.REQ_CODE.REDIRECT,
                    desc: status.REQ_CODE_DESC.REDIRECT,
                    response: result
                });
            }

            if (_.isFunction(hooks.businessCheck)) {
                // 直接返回businessCheck的结果
                result = hooks.businessCheck.call(me, result);
            }

            // 如果是Promise状态，继续传递
            if (Promise.isPromise(result)) {
                return result.then(
                    function (response) {
                        hooks.eachSuccess.call(me, response);
                        // resolve整个状态
                        me.resolve(response);
                    },
                    function (response) {
                        return Promise.reject(response);
                    }
                );
            }

            // 调用成功的hook
            hooks.eachSuccess.call(me, result);
            // resolve整个状态
            me.resolve(result);
        }
        catch (e) {
            // 如果捕获到异常，是因为result的格式并非预期
            // 直接认为是CLIENT_SIDE_EXCEPTION
            // 不用fire error，因为在失败处理中会统一fire
            return Promise.reject({
                status: status.REQ_CODE.CLIENT_SIDE_EXCEPTION,
                error: e,
                response: result
            });
        }
    };

    /**
     * 处理ajax失败！
     * @param {Object} result 上一步的执行结果
     * @return {meta.Promise} rejected状态的Promise
     */
    proto.processXhrFailure = function (result) {

        // 先处理超时
        // HTTP 408: Request Timeout
        if (result.status === 408) {
            return Promise.reject({
                status: status.REQ_CODE.TIMEOUT,
                desc: status.REQ_CODE_DESC.TIMEOUT,
                response: null
            });
        }

        // 请求失败：HTTP status < 200 || (status >= 300 && status !== 304
        return Promise.reject({
            httpStatus: result.status,
            status: status.REQ_CODE.REQUEST_ERROR,
            desc: status.REQ_CODE_DESC.REQUEST_ERROR,
            response: null
        });
    };

    /**
     * 处理成功处理方法中手动转为失败状态的状况
     * @param {Object} result 上一步的执行结果
     */
    proto.processXhrException = function (result) {

        // 服务器返回的数据在后置处理时异常，认为请求失败，此时result.error存在
        // 并且是一个Error
        if (result && result.error instanceof Error) {
            // 先抛出去异常
            this.fire('error', result);
        }

        hooks.eachFailure.call(this, result);

        // 如果已经有了status定义，直接返回
        if (result.status) {

            if (result.status === status.REQ_CODE.REDIRECT) {
                fc.setImmediate(function () {
                    window.location.href = result.redirecturl
                        || require('./config').redirectUrl;
                });

                // leave hanging
                return;
            }

            this.reject(result);
            return;
        }

        // 走到这里，就认为是浏览器端执行的抛错
        // 在这里才置为reject
        this.reject({
            status: status.REQ_CODE.CLIENT_SIDE_EXCEPTION,
            desc: status.REQ_CODE_DESC.CLIENT_SIDE_EXCEPTION,
            response: result
        });
    };

    var AjaxRequest = fc.oo.derive(EventTarget, proto);

    return AjaxRequest;
});
