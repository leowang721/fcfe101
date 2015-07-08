/**
 * @file main entrance
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var _ = require('underscore');

    require('fc-component-ria/component!component/fc/navigator');

    require('er/config').indexURL = '#/entry/demo/hello/project';


    _.extend(require('fc-ajax/globalData'), {
        userid: 24678,
        token: 'userid的值，前面请填空'
    });
    require('fc-ajax/config').url = 'request.ajax';

    require('er/controller').registerAction(
        _.flatten(require('./actionConf'))
    );

    // init once before er start
    require('fc-component-ria').init(document.getElementById('wrapper'), {
        includeContainer: true
    });
    require('er').start();

});
