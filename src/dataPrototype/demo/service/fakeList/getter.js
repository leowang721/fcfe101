/**
 * @file
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');

    var ajax = require('fc-ajax');

    var getter = {
        getByCondition: function (param) {
            return ajax.request('vega/GET/mtl/planlist', _.defaults({}, param, {
                fields: ['planname']
            })).then(function (res) {
                return res.data.listData;
            }).catch(function () {
                return [];
            });
        }
    };

    return getter;
});
