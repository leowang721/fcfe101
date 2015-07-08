/**
 * @file Component - `demo-hello-ui`
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var fc = require('fc-core');
    var BaseComponent = require('fc-view/component/BaseComponent');

    // require ui
    require('fcui/FcSearchBox');

    /**
     * Component - `demo-hello-ui`
     * @class
     * @constructor
     */
    var overrides = {};

    /**
     * 渲染之前的数据准备工作
     * 可以直接返回一个{@link Promise}对象来延续异步状态
     */
    // overrides.prepare = function () {};

    /**
     * 配置UI属性
     */
    // overrides.uiProperties = null;

    /**
     * 配置UI事件
     */
    overrides.uiEvents = {
        'demo-hello-ui-searcher': {
            'search': function (e) {
                var query = _.trim(e.target.getValue());
                this.doSearch(query);
            }
        }
    };

    /**
     * 执行搜索
     *
     * @param {string} query 搜索的query
     */
    overrides.doSearch = function (query) {
        if (query) {
            window.open('//www.baidu.com/s?wd=' + query, null, 'searchWin');
        }
    };

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {};

    return fc.oo.derive(BaseComponent, overrides);
});
