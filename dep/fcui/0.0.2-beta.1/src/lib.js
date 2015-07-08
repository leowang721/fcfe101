/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file UI基础库适配层
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} UI基础库适配层
 */
define(function (require) {
    var u = require('underscore');
    var eLib = require('esui/lib');

    var lib = {};

    u.extend(
        lib,
        require('esui/lib'),
        require('./lib/template'),
        require('./lib/dom'),
        require('./lib/uiControl')
    );

    lib.ie = eLib.ie;

    return lib;
});
