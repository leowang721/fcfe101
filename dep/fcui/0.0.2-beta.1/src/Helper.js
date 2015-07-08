/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file FCUI 控件类常用的方法辅助类，自ESUI 3.1.0-beta.3派生。
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} UI基础库适配层
 */
define(function (require) {
    var u = require('underscore');

    /**
     * 控件辅助类
     *
     * @constructor
     * @param {Control} control 关联的控件实例
     */
    function Helper(control) {
        this.control = control;
    }

    u.extend(
        Helper.prototype,
        require('esui/helper/children'),
        require('esui/helper/dom'),
        require('esui/helper/event'),
        require('esui/helper/html'),
        require('esui/helper/life'),
        require('./helper/template'),
        require('./helper/children')
    );

    return Helper;
});
