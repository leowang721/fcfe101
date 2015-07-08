/**
 * @file FCUI extension - 使InputControl支持Rule Check的异步结果
 * @author Han Bing Feng
 * @param {Function} require require
 * @return {Object} main
 */

define(function (require) {
    var oo = require('fc-core/oo');
    var Promise = require('fc-core/Promise');
    var u = require('underscore');
    var ui = require('../main');
    var Extension = require('../Extension');
    var Validity = require('../validator/Validity');

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
     * 指定扩展类型，始终为`"PromisedValidity"`
     * @type {string}
     */
    proto.type = 'PromisedValidityInputControl';

    /**
     * 获取验证结果的{@link validator.Validity}对象
     * 派生自ESUI 3.1.0-beta.4
     * @return {validator.Validity}
     * @fires beforevalidate
     * @fires aftervalidate
     * @fires invalid
     */
    function getValidationResult() {
        var validity = new Validity();
        var eventArg = {
            validity: validity
        };

        /**
         * @event beforevalidate
         *
         * 在验证前触发
         *
         * @param {validator.Validity} validity 验证结果
         * @member InputControl
         */
        eventArg = this.fire('beforevalidate', eventArg);

        // 验证合法性
        var rules = ui.createRulesByControl(this);
        for (var i = 0, len = rules.length; i < len; i++) {
            var rule = rules[i];
            validity.addState(
                rule.getName(),
                rule.check(this.getValue(), this)
            );
        }

        function fireInvalid() {
            /**
             * @event invalid
             *
             * 在验证结果为错误时触发
             *
             * @param {validator.Validity} validity 验证结果
             * @member InputControl
             */
            eventArg = this.fire('invalid', eventArg);
        }

        function fireAfterValidate() {
            /**
             * @event aftervalidate
             *
             * 在验证后触发
             *
             * @param {validator.Validity} validity 验证结果
             * @member InputControl
             */
            this.fire('aftervalidate', eventArg);
        }

        // 触发invalid和aftervalidate事件
        // 这两个事件中用户可能会对validity进行修改操作
        // 所以validity.isValid()结果不能缓存
        Promise.cast(validity.isValid()).then(
            function (valid) {
                if (!valid) {
                    fireInvalid();
                }
                fireAfterValidate();
            },
            function () {
                fireInvalid();
                fireAfterValidate();
            }
        );

        return validity;
    }

    /**
     * 验证控件，仅返回`true`或`false`
     * 派生自ESUI 3.1.0-beta.4
     * @return {boolean}
     * @fires beforevalidate
     * @fires aftervalidate
     * @fires invalid
     */
    function checkValidity() {
        var validity = this.getValidationResult();
        return validity.isValid();
    }

    /**
     * 验证控件，当值不合法时显示错误信息
     * 派生自ESUI 3.1.0-beta.4
     * @return {boolean}
     * @fires beforevalidate
     * @fires aftervalidate
     * @fires invalid
     */
    function validate() {
        var validity = this.getValidationResult();
        var show = u.bind(this.showValidity, this, validity);
        show();
        var p = validity.isValid();
        if (p.then) {
            p.then(show, show);
        }
        return p;
    }


    /**
     * 显示验证信息
     * 派生自ESUI 3.1.0-beta.4
     * @param {validator.Validity} validity 验证结果
     */
    function showValidity(validity) {
        if (this.validity) {
            this.removeState(
                'validity-' + this.validity.getValidState());
        }
        this.validity = validity;
        this.addState('validity-' + validity.getValidState());

        var label = this.getValidityLabel();

        if (!label) {
            return;
        }

        // 重绘validity需要一个不同的实例，有可能不重绘
        var needRepaint = (label.validity === validity);

        var properties = {
            target: this,
            focusTarget: this.getFocusTarget(),
            validity: validity
        };
        label.setProperties(properties);
        needRepaint && label.repaint();
    }

    /**
     * 激活扩展
     * @override
     */
    proto.activate = function () {
        this.$super(arguments);

        if (typeof this.target.getValidationResult !== 'function') {
            // duck type，只处理InputControl
            return;
        }

        this.target.getValidationResult = getValidationResult;
        this.target.validate = validate;
        this.target.checkValidity = checkValidity;
        this.target.showValidity = showValidity;
    };

    /**
     * 取消扩展的激活状态
     * @override
     */
    proto.inactivate = function () {
        this.$super(arguments);
    };

    var PromisedValidity = oo.derive(Extension, proto);

    ui.registerExtension(PromisedValidity);
    ui.attachExtension('PromisedValidityInputControl', {});

    return PromisedValidity;
});
