/**
 * @file EntryView 入口级别基础类
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var fc = require('fc-core');

    /**
     * EntryView 入口级别基础类
     */
    var overrides = {};

    var EntryView = fc.oo.derive(require('./BaseView'), overrides);

    return EntryView;
});
