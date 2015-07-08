/**
 * @file 列表形式的MVC - Model
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var fc = require('fc-core');

    /**
     * 列表形式的MVC - Model
     */
    var overrides = {};

    var ListModel = fc.oo.derive(require('./EntryModel'), overrides);

    return ListModel;
});
