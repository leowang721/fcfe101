/**
 * @file oo 相关的 util
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

define(function (require) {
    var _ = require('underscore');

    var abstractProp = '虚类定义属性，请在具体子类中覆盖！';
    var abstractMethod = function () {
        throw new Error('虚类定义方法，请在具体子类中覆盖！');
    };

    var oo = {
        initAbstractProps: function (name) {
            var props = name;
            if (!_.isArray(name)) {
                props = _.toArray(arguments);
            }

            var clazz = this;
            _.each(props, function (eachProp) {
                clazz[eachProp] = abstractProp;
            });
        },

        initAbstractMethods: function (name) {
            var props = name;
            if (!_.isArray(name)) {
                props = _.toArray(arguments);
            }

            var clazz = this;
            _.each(props, function (eachProp) {
                clazz[eachProp] = abstractMethod;
            });
        }
    };

    return oo;
});
