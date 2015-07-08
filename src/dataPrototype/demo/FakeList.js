/**
 * @file
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

define(function (require) {
    var _ = require('underscore');
    var DataLoader = require('fc-view/mvc/DataLoader');

    var proto = {
        constructor: function (opts) {
            _.extend(this, _.pick(opts, ['pageSize', 'data']));
        }
    };

    proto.pageSize = 10;

    proto.load = function (param) {
        var me = this;
        return require('./service/fakeList/getter').getByCondition(
            _.extend(_.pick(me, ['pageSize']), param)
        ).then(function (data) {
            me.data = data;
            return me.data;
        });
    };

    proto.fill = function (data) {
        this.data = data;
    };

    proto.getDataLoader = function () {
        var me = this;
        var dataLoader = new DataLoader();
        dataLoader.put({
            fakeList: function () {
                return me.load();
            }
        });
        return dataLoader;
    };

    var FakeList = require('fc-core/oo').create(proto);

    return FakeList;
});
