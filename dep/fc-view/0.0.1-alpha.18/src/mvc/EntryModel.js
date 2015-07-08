/**
 * @file EntryModel 入口级别基础类
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var _ = require('underscore');
    var fc = require('fc-core');

    var overrides = {};

    overrides.constructor = function (context) {

        var me = this;

        // fix context with defaultArgs
        var newContext = _.chain(context)
            .defaults(me.getDefaultArgs())
            .extend({
                context: require('./context').dump()
            })
            .value();
        // call super
        me.$super([newContext]);
    };

    overrides.resolveQuery = function (data) {
        var url = this.get('url');
        var query = url.getQuery();

        // 过滤掉没变的默认参数
        query = _.chain(query)
            .extend(data)
            .extend(this.getExtraQuery())
            .purify(this.getDefaultArgs())
            .value();

        var path = url.getPath();

        return require('er/URL').withQuery(path, query).toString();
    };

    overrides.loadingData = {
        loading: '<span class="view-loading">加载中，请稍候...</span>'
    };

    overrides.defaultArgs = {};

    overrides.getDefaultArgs = function () {
        return this.defaultArgs || {};
    };

    /**
     * 获取附加的请求参数
     *
     * @protected
     * @return {Object}
     */
    overrides.getExtraQuery = function () {
        return {};
    };

    /**
     * 对合并好的请求参数进行统一的后续处理
     *
     * @param {Object} query 需要处理的参数对象
     * @return {Object}
     * @protected
     */
    overrides.filterQuery = function(query) {
        return query;
    };

    return fc.oo.derive(require('./BaseModel'), overrides);
});
