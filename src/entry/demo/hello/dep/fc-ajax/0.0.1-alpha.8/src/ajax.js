/**
 * @ignore
 * @file ajax请求底层方法
 * 鉴于原依赖的er/ajax有一点性能调度问题，因此在此重写
 * 依然基于er/ajax的实现方案
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    'use strict';

    var _ = require('underscore');
    var fc = require('fc-core');
    var hooks = require('./hooks');
    var config = require('./config');
    var Promise = require('fc-core/Promise');

    var REQID_PARAM_KEY = '_';

    /**
     * 这是一个比较纯粹的ajax行为类，但是依然挂载当前的{@link fc.ajax.config}和{@link fc.ajax.hooks}
     *
     * - `require('fc-ajax/ajax')`是该类的全局实例
     * - `require('fc-ajax/ajax').Ajax`则是访问该类的构造函数
     *
     * @class fc.ajax.Ajax
     * @extends meta.EventTarget
     * @constructor
     */
    var proto = {};
    proto.constructor = function () {
        this.config = config;
        this.hooks = hooks;
    };

    /**
     * 执行请求
     *
     * @param {meta.AjaxOption} options 相关配置
     * @return {meta.FakeXHR}
     */
    proto.request = function (options) {
        var me = this;

        if (typeof me.hooks.beforeExecute === 'function') {
            me.hooks.beforeExecute(options);
        }
        fc.assert.hasProperty(options, 'url', 'url property is required');

        options = _.deepExtend({}, me.config, options);

        // 创建xhr实例
        var xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new window.ActiveXObject('Microsoft.XMLHTTP');
        var fakeXHR;

        // 扩展fakeXHR，让它更像xhr对象
        var xhrWrapper = {
            // abort 在 racingPromise中处理
            setRequestHeader: function (name, value) {
                xhr.setRequestHeader(name, value);
            },
            getAllResponseHeaders: function () {
                return xhr.getAllResponseHeaders();
            },
            getResponseHeader: function (name) {
                return xhr.getResponseHeader(name);
            },
            getRequestOption: function (name) {
                return options[name];
            }
        };

        // 声明一个用于打断的Promise, for timeout or abort
        var timeoutTic = null;
        var racingPromise = new Promise(function (resolve, reject) {
            // 处理abort
            xhrWrapper.abort = function () {
                // 有些浏览器`abort()`就会把`readyState`变成4，
                // 这就会导致进入处理函数变成**resolved**状态，
                // 因此事先去掉处理函数，然后直接进入**rejected**状态
                xhr.onreadystatechange = null;
                try {
                    xhr.abort();
                }
                catch (ex) {}

                if (!fakeXHR.status) {
                    fakeXHR.status = 0;
                }

                fakeXHR.readyState = xhr.readyState;
                fakeXHR.responseText = '';
                fakeXHR.responseXML = '';
                reject(fakeXHR);
            };

            // 如果超时了，直接处理自己的状态，进而打断整个状态
            if (options.timeout > 0) {
                timeoutTic = setTimeout(function () {
                    fakeXHR.status = 408; // HTTP 408: Request Timeout
                    fakeXHR.abort();
                }, options.timeout);
            }
        });

        // 声明xhrPromise代表了真正的xhr对象的执行状态
        var xhrPromise = new Promise(function (resolve, reject) {
            // 执行beforeCreate hook
            if (typeof me.hooks.beforeCreate === 'function') {
                // 可以在hook中直接调用resolve和reject来改变状态
                // 或者去关联另外一个Promise
                var canceled = me.hooks.beforeCreate(options, resolve, reject);
                // 如果返回true，则中断执行
                if (canceled === true) {
                    return;
                }
            }

            // xhr状态变化处理
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var status = fakeXHR.status || xhr.status;
                    // IE9会把204状态码变成1223
                    if (status === 1223) {
                        status = 204;  // 这个是没有内容，不过开发者基本无需care
                    }

                    fakeXHR.status = fakeXHR.status || status;
                    fakeXHR.readyState = xhr.readyState;
                    fakeXHR.responseText = xhr.responseText;
                    fakeXHR.responseXML = xhr.responseXML;

                    if (typeof me.hooks.afterReceive === 'function') {
                        me.hooks.afterReceive(fakeXHR, options);
                    }

                    // 如果请求不成功，也就不用再分解数据了，直接丢回去就好
                    if (status < 200 || (status >= 300 && status !== 304)) {
                        reject(fakeXHR);
                        return;
                    }

                    var data = xhr.responseText;
                    if (options.dataType === 'json') {
                        try {
                            data = JSON.parse(data);
                        }
                        catch (ex) {
                            // 服务器返回的数据不符合JSON格式，认为请求失败
                            fakeXHR.error = ex;
                            reject(fakeXHR);
                            return;
                        }
                    }

                    if (typeof me.hooks.afterParse === 'function') {
                        try {
                            data = me.hooks.afterParse(data, fakeXHR, options);
                        }
                        catch (ex) {
                            fakeXHR.error = ex;
                            reject(fakeXHR);
                            return;
                        }
                    }

                    // 数据处理成功后，进行回调
                    resolve(data);
                }
            };

            var method = options.method.toUpperCase();
            var data = _.deepExtend({}, options.urlParam);
            if (method === 'GET') {
                _.deepExtend(data, options.data);
            }
            if (options.cache === false) {
                data[REQID_PARAM_KEY] = fc.util.uid();
            }

            var query = me.hooks.serializeData(
                '', data,'application/x-www-form-urlencoded'
            );
            var url = options.url;
            if (query) {
                var delimiter = url.indexOf('?') >= 0 ? '&' : '?';
                url += delimiter + query;
            }

            xhr.open(method, url, true);

            if (typeof me.hooks.beforeSend === 'function') {
                me.hooks.beforeSend(xhrWrapper, options);
            }

            if (method === 'GET') {
                xhr.send();
            }
            else {
                var contentType = options.contentType
                    || 'application/x-www-form-urlencoded';
                query = me.hooks.serializeData(
                    '', options.data, contentType, xhrWrapper
                );
                if (options.charset) {
                    contentType += ';charset=' + options.charset;
                }
                xhr.setRequestHeader('Content-Type', contentType);
                xhr.send(query);
            }
        });

        fakeXHR = Promise.race([xhrPromise, racingPromise]);
        _.deepExtend(fakeXHR, xhrWrapper);

        fakeXHR.ensure(function () {
            clearTimeout(timeoutTic);
        });

        return fakeXHR;
    };

    /**
     * 发起一个`GET`请求
     *
     * @param {string} url 请求的地址
     * @param {Object} [data] 请求的数据
     * @param {boolean} [cache] 决定是否允许缓存
     * @return {meta.FakeXHR}
     */
    proto.get = function (url, data, cache) {
        var options = {
            method: 'GET',
            url: url,
            data: data,
            cache: cache || this.config.cache
        };
        return this.request(options);
    };

    /**
     * 发起一个`GET`请求并获取JSON数据
     *
     * @param {string} url 请求的地址
     * @param {Object} [data] 请求的数据
     * @param {boolean} [cache] 决定是否允许缓存
     * @return {meta.FakeXHR}
     */
    proto.getJSON = function (url, data, cache) {
        var options = {
            method: 'GET',
            url: url,
            data: data,
            dataType: 'json',
            cache: cache || this.config.cache
        };
        return this.request(options);
    };

    /**
     * 发起一个`POST`请求
     *
     * @param {string} url 请求的地址
     * @param {Object} [data] 请求的数据
     * @param {string} [dataType="json"] 指定响应的数据格式
     * @return {meta.FakeXHR}
     */
    proto.post = function (url, data, dataType) {
        var options = {
            method: 'POST',
            url: url,
            data: data,
            dataType: dataType || 'json'
        };
        return this.request(options);
    };

    var Ajax = fc.oo.derive(require('fc-core/EventTarget'), proto);
    var instance = new Ajax();
    instance.Ajax = Ajax;
    return instance;
});
