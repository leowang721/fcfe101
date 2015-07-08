/**
 * @file 数字判断
 * @author Lingling Yan (yanlingling@baidu.com)
 */
define(
    function (require) {
        var Rule = require('esui/validator/Rule');
        var ValidityState = require('esui/validator/ValidityState');

        /**
         * 数字验证规则，值必须为数字类型
         *
         * @extends validator.Rule
         * @class validator.NumberRule
         * @constructor
         */
        function IsNumberRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型
         *
         * @type {string}
         * @override
         */
        IsNumberRule.prototype.type = 'isNumber';


        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        IsNumberRule.prototype.errorMessage = '请输入数字';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        IsNumberRule.prototype.check = function (value, control) {
            var valueOfNumber = +value;
            var mustNumber = this.getLimitCondition(control);
            var isValidNumber = !mustNumber || (!isNaN(valueOfNumber));
            return new ValidityState(
                !value || isValidNumber,
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(IsNumberRule, Rule);
        require('esui/main').registerRule(IsNumberRule, 101);
        return IsNumberRule;
    }
);
