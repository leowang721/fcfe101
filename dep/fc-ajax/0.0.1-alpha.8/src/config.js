/**
 * @ignore
 * @file ajax的全局配置
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    /**
     * ajax的全局配置
     *
     * @class fc.ajax.config
     * @type {Object}
     */
    var config = {
        /**
         * 默认的请求方法：GET|POST
         *
         * @type {string}
         */
        method: 'POST',

        /**
         * 请求时默认携带的数据
         *
         * @type {Object}
         */
        data: {},

        /**
         * 是否使用缓存？当前主要是针对着请求时是否携带一个随机串
         *
         * @type {boolean}
         */
        cache: false,

        /**
         * 默认超时时间
         *
         * @type {number}
         */
        timeout: 0,

        /**
         * 默认的charset
         *
         * @type {string}
         */
        charset: '',

        /**
         * 默认的返回数据类型
         *
         * @type {string}
         */
        dataType: 'json'
    };

    return config;
});
