/**
 * @file fc-view主入口文件
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    'use strict';

    var _ = require('underscore');

    /**
     * fc-view 模块
     * @module view
     */
    var view = {
        version: '0.0.1-alpha.18'
    };

    // 在此直接屏蔽掉er.View的dispose，它会让container内容清空
    require('er/View').prototype.dispose = _.noop;

    return view;
});
