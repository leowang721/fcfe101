/**
 * @ignore
 * @file fc-ajax主入口文件
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    'use strict';

    /**
     * fc-ajax 存储库
     * @class fc.ajax
     */
    var ajax = {
        version: '0.0.1-alpha.8',

        request: require('./request')
    };

    return ajax;
});
