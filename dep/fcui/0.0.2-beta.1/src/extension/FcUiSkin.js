/**
 * @file esui3 extension - 凤巢皮肤样式定制
 * @author Leo Wang(wangkemiao@baidu.com)
 * @param {Function} require require
 * @return {Object} main
 */
define(function (require) {
    var lib = require('../lib');
    var Extension = require('../Extension');
    var ui = require('../main');

    /**
     * 凤巢皮肤定制
     * @constructor
     * @extends {Extension}
     */
    function FcUiSkin() {
        Extension.apply(this, arguments);
    }
    lib.inherits(FcUiSkin, Extension);

    /**
     * 指定扩展类型，始终为`"FcUiSkin"`
     *
     * @type {string}
     */
    FcUiSkin.prototype.type = 'FcUiSkin';

    /**
     * 激活扩展
     *
     * @override
     */
    FcUiSkin.prototype.activate = function () {
        // 重设皮肤
        if (!this.target.skin) {
            this.target.skin = 'ui-fc';
        }
        Extension.prototype.activate.apply(this, arguments);
    };

    /**
     * 取消扩展的激活状态
     *
     * @override
     */
    FcUiSkin.prototype.inactivate = function () {
        Extension.prototype.inactivate.apply(this, arguments);
    };

    ui.registerExtension(FcUiSkin);
    ui.attachExtension('FcUiSkin', {});

    return FcUiSkin;
});
