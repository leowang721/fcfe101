/**
 * @ignore
 * @file 发送请求的主接口方法
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var _ = require('underscore');
    var fc = require('fc-core');
    var globalData = require('./globalData');
    var config = require('./config');
    var AjaxRequest = require('./AjaxRequest');

    /**
     * 发送请求的主接口方法
     *
     * @class fc.ajax.request
     *
     * @param  {string} path 请求的path字段，不是url，这个字段会分别置于请求的url和发送的数据中
     * @param  {?Object} data 携带的数据
     * @param  {?Object} options 额外的参数
     * @return {meta.Promise} 请求的Promise
     */
    function request(path, data, options) {
        var ajaxOption = adjustOption.apply(this, arguments);

        var req = new AjaxRequest(ajaxOption);
        req.on('error', fc.util.processError);
        return req.request();
    }

    function adjustOption(path, data, options) {

        if (_.isObject(path)) {
            options = data;
            data = path;
            path = data.path;
            delete data.path;
        }

        var ajaxOption = {
            url: config.url,
            urlParam: {
                path: path
            }
        };

        // 如果指定了options，则进行额外的覆盖
        // 在这里执行可以覆盖url
        _.extend(ajaxOption, options);

        // 强制取消自动携带的_字段
        ajaxOption.cache = true;  // 如果为假则ajax执行每次请求的url都会携带参数`_`

        // 增加reqId
        var reqId = fc.util.uid();
        ajaxOption.urlParam.reqId = reqId;

        // 补充data
        ajaxOption.data = _.deepExtend({}, globalData, {
            reqId: reqId,
            path: path
        });

        // 处理eventId
        if (!ajaxOption.data.eventId) {
            ajaxOption.data.eventId = fc.util.guid();
        }

        // 补充params
        ajaxOption.data.params = JSON.stringify(data || {});

        return ajaxOption;
    }

    return request;
});
