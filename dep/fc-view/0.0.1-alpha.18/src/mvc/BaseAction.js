/**
 * @file fc-view BaseAction
 * 基于er.Action
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var fc = require('fc-core');
    /**
     * @class meta.BaseAction
     * @constructor
     * @extends er.Action
     */
    var overrides = {};
    overrides.constructor = function () {
        // call super
        this.$super(arguments);
    };

    overrides.handleError = function (errors) {
        fc.util.processError(errors);
    };

    var BaseAction = fc.oo.derive(require('er/Action'), overrides);
    return BaseAction;
});
