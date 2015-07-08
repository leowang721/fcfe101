/**
 * @file FCUI extension - 使InputControl支持Rule Check的异步结果
 * @author Han Bing Feng
 * @param {Function} require require
 * @return {Object} main
 */
define(function (require) {
    var oo = require('fc-core/oo');
    var u = require('underscore');
    var ui = require('../main');
    var Extension = require('../Extension');
    var ValidityLabel = require('../Validity');

    /**
     * @class PromisedValidity
     * ESUI 扩展，使InputControl支持Rule Check的异步结果
     * 本该直接改掉InputControl的，但是改基类和一串子类代价太大，先
     * 写一个扩展，以后再迁移。
     * @extends Extension
     */
    var proto = {};

    /**
     * @constructor
     */
    proto.constructor = function () {
        this.$super(arguments);
    };

    /**
     * 指定扩展类型，始终为`"PromisedValidityLabel"`
     * @type {string}
     */
    proto.type = 'PromisedValidityLabel';

    /**
     * 激活扩展
     * @override
     */
    proto.activate = function () {
        this.$super(arguments);

        if (this.target.type !== 'Validity') {
            // 只处理Validity label
            return;
        }

        this.target.repaint = require('../painters').createRepaint(
            ValidityLabel.prototype.repaint,
            {
                /**
                 * @property {validator.Validity} validity
                 *
                 * 验证结果
                 */
                name: 'validity',
                paint: function (label, validity) {
                    var validState = validity && validity.getValidState();
                    if (validState !== 'pending') {
                        // 只处理pending状态
                        return;
                    }

                    // 已经有了 -pending的class，不用再放了
                    // 仅需要找出pending的message
                    if (validity) {
                        var message;
                        var pendingState = u.find(
                            validity.getStates(),
                            function (state) {
                                return state.getState() !== true &&
                                    state.getState() !== false;
                            }
                        );
                        message = pendingState && pendingState.getMessage();
                        label.display(pendingState, message || '', validity);
                        label.helper.initChildren();
                        if (message) {
                            label.show();
                        }
                        else {
                            label.hide();
                        }
                    }
                }
            }
        );
    };

    /**
     * 取消扩展的激活状态
     * @override
     */
    proto.inactivate = function () {
        this.$super(arguments);
    };

    var PromisedValidityLabel = oo.derive(Extension, proto);

    ui.registerExtension(PromisedValidityLabel);
    ui.attachExtension('PromisedValidityLabel', {});

    return PromisedValidityLabel;
});
