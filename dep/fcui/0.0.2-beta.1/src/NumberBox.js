/**
 * @file 数字输入控件，支持值的上下调节，只允许输入数字
 * @author Lingling Yan(yanlingling@baidu.com)
 */

define(
    function (require) {
        var _ = require('underscore');
        var lib = require('esui/lib');
        var InputControl = require('esui/InputControl');
        var painters = require('esui/painters');
        var esui = require('esui');

        require('./validator/IsNumberRule');
        require('./validator/RequiredRule');
        require('./validator/MaxRule');
        require('./validator/MinRule');

        /**
         * 隐藏dom的样式
         *
         * @const
         * @type {string}
         */
        var HIDE_CLASS = 'state-hidden';

        /**
         * 箭头操作类型配置
         *
         * @const
         * @type {Object}
         */
        var ARROW_OPT = {
            ADD: 'add',
            MINUS: 'minus'
        };

        /**
         * 保留小数点后decimalPlace位数
         * @param {string|number} value 值 数字的string或者数字
         * @param {number} decimalPlace 截取的位数
         * @return {number} 修正后的小数
         */
        function fixNumber (value, decimalPlace) {
            return parseFloat(value).toFixed(decimalPlace);
        }

        /**
         * 只能输入数字的input
         * @param {Object} options 控件初始化参数
         * @param {number} options.stepValue 每次调节的变化值，默认为1
         * @param {number} options.scene 指定某种场景，提供默认配置，
         *      默认为default,比例因子stepValue为0.01，min为0.01,max为1,
         *      目前提供的还有money
         * @param {number} options.min value的最小值，
         *      默认为Number.NEGATIVE_INFINITY
         * @param {number} options.max value 的最大值，
         *      默认为Number.POSITIVE_INFINITY
         * @param {string} options.placeholder 文本框的placeholder
         * @param {number} options.value 当前控件的value值
         * @param {boolean} options.isShowTimelyTip 是否输入范围的即时提示
         *      提示为：有效范围：**~**,默认没有上下限，不会提示
         * @param {number} options.decimalPlace 取值保留几位小数点,默认不截断
         * @param {boolean} options.disabled 是否禁用
         * @param {boolean} options.hidden 是否隐藏
         * @extends InputControl
         * @requires TextBox
         * @constructor
         */
        function NumberBox(options) {
            InputControl.apply(this, arguments);
        }

        /**
         * 控件类型，始终为`"NumberBox"`
         *
         * @type {string}
         * @readonly
         * @override
         */
        NumberBox.prototype.type = 'NumberBox';

        /**
         * 初始化参数
         *
         * @param {Object} options 构造函数传入的参数
         * @protected
         * @override
         */
        NumberBox.prototype.initOptions = function (options) {
            // 默认选项配置
            var properties = {
                stepValue: 1,
                scene: 'default',
                min: Number.NEGATIVE_INFINITY,
                max: Number.POSITIVE_INFINITY,
                isShowTimelyTip: true,
                value: '',
                isNumber: true,
                required: true,
                placeholder: ''
            };
            if (options.scene) {
                properties.scene = options.scene;
            }
            var sceneOptions = this.getOptionsByScene(properties.scene);
            // 如果配置了场景的话，用场景的配置覆盖默认配置
            sceneOptions ? _.extend(properties, sceneOptions) : '';
            // options里面配置的优先级高于场景的
            _.extend(properties, options);
            this.setProperties(properties);
        };

        /**
         * 获取特定的场景配置，如money,factor
         * @param {string} name 场景名
         * @return {*}
         */
        NumberBox.prototype.getOptionsByScene = function (name) {
            return this.scene[name];
        };

        /**
         * 通过scene提供一些使用场景认配置
         */
        NumberBox.prototype.scene = {
            // 默认场景设置
            'default': {
                stepValue: 0.01,
                isShowTimelyTip: true,
                decimalPlace: 2,
                min: 0.01,
                max: 1
            },
            // money的默认设置
            'money': {
                stepValue: 0.01,
                isShowTimelyTip: true,
                decimalPlace: 2,
                min: 0
            }
        };

        /**
         * 获取placeholder的HTML片段
         * @return {string} HTML片段
         */
        NumberBox.prototype.getPlaceholderHTML = function () {
            var helper = this.helper;
            var html = ''
                + '<div id="' + helper.getId('input-placeholder')
                + '" class="' + this.getPartClasses('input-placeholder')
                + '">' + this.placeholder + '</div>';
            return html;
        };

        /**
         * 获取html片段
         *
         * @return {string} html片段
         */
        NumberBox.prototype.getMainHTML = function () {
            var helper = this.helper;
            var tipString = this.getTip();
            // 写这么多html是因为模板加载跨域的问题
            var htmlStr = ''
                + '<div id="' + helper.getId('wrapper')
                + '" class="' + this.getPartClasses('wrapper') + '">'
                +    '<div class="' + this.getPartClasses('main-content') + '">'
                +       this.getPlaceholderHTML()
                +       '<input id="' + helper.getId('input') + '" class="'
                +           this.getPartClasses('input') + '"/>'
                +       '<div id="' + helper.getId('arrow-wrapper')
                +           '" class="' + this.getPartClasses('arrow-wrapper')
                +               '">'
                +           '<div opt="add" id="' + helper.getId('arrow-up')
                +               '" class="'
                +               this.getPartClasses('arrow-up') + '">'
                +               '<i opt="add" class="font-icon '
                +                   'font-icon-caret-up"></i>'
                +           '</div>'
                +           '<div opt="minus" id="' + helper.getId('arrow-down')
                +               '" class="'
                +               this.getPartClasses('arrow-down') + '">'
                +               '<i opt="minus"  class="font-icon '
                +                   'font-icon-caret-down"></i>'
                +            '</div>'
                +        '</div>'
                +        '<div id="' + helper.getId('tip') + '" class="'
                +            this.getPartClasses('range-tip')
                +            ' ' + HIDE_CLASS + '">'
                +            tipString
                +        '</div>'
                +    '</div>'
                + '</div>';
            return htmlStr;
        };

        /**
         * 生成class
         *
         * @param {string} partName 指定名称
         * @return {string} 完整的class
         */
        NumberBox.prototype.getPartClasses = function (partName) {
            return this.helper.getPartClasses(partName).join(' ');
        };

        /**
         * 获取提示字符串
         *
         * @return {string} 提示信息
         */
        NumberBox.prototype.getTip = function () {
            // 没有最小值的时候
            var str = '有效范围:';
            if (this.min !== Number.NEGATIVE_INFINITY
                && this.max !== Number.POSITIVE_INFINITY) {
                str += this.min + '~' + this.max;
            }
            else if (this.min === Number.NEGATIVE_INFINITY
                && this.max === Number.POSITIVE_INFINITY) {
                str = '';
            }
            else if (this.min === Number.NEGATIVE_INFINIT) {
                str += '小于' + this.max;
            }
            else {
                str += '大于' + this.min;
            }
            return str;
        };


        /**
         * 初始化DOM结构
         *
         * @protected
         * @override
         */
        NumberBox.prototype.initStructure = function () {
            var helper = this.helper;
            this.main.innerHTML = this.getMainHTML();
            // 创建控件树
            helper.initChildren();
        };

        /**
         * 事件的初始化
         */
        NumberBox.prototype.initEvents = function () {
            var helper = this.helper;
            // 输入区变化监听
            var input = helper.getPart('input');
            var inputEvent = ('oninput' in input)
                ? 'input' : 'propertychange';
            helper.addDOMEvent(input, inputEvent, this.onInputChange());
            helper.addDOMEvent(input, 'focus', this.onInputFocus());
            helper.addDOMEvent(input, 'blur', this.onInputBlur());
            helper.addDOMEvent(
                helper.getPart('arrow-wrapper'),
                'click',
                this.onArrowClick()
            );
            helper.addDOMEvent(
                helper.getPart('input-placeholder'),
                'click',
                _.bind(this.onPlaceholderClick, this)
            );
            this.on('inputchange', this.enableOrDisableArrowHandler);
        };

        NumberBox.prototype.onPlaceholderClick = function () {
            this.hidePlaceholder();
            var input = this.helper.getPart('input');
            input.focus();
        };

        /**
         * 启用或禁用上下箭头按钮
         */
        NumberBox.prototype.enableOrDisableArrowHandler = function () {
            var helper = this.helper;
            var value = this.getValue();
            var arrowDown = helper.getPart('arrow-down');
            var arrowUp = helper.getPart('arrow-up');
            if (+value <= +this.min || isNaN(+value) || trim(value).length === 0) {
                helper.addPartClasses('arrow-down-disabled', arrowDown);
            }
            else {
                helper.removePartClasses('arrow-down-disabled', arrowDown);
            }
            if (+value >= +this.max || isNaN(+value) || trim(value).length === 0) {
                helper.addPartClasses('arrow-up-disabled', arrowUp);
            }
            else {
                helper.removePartClasses('arrow-up-disabled', arrowUp);
            }
        };

        /**
         * 箭头区块点击的处理函数
         *
         * @return {Function}
         */
        NumberBox.prototype.onArrowClick = function () {
            var me = this;
            return function (e) {
                var target = e.target;
                var opt = lib.getAttribute(target, 'opt');
                if (opt) {
                    me.changeValueByStepValue(opt);
                    me.fire(
                        opt === ARROW_OPT.ADD ? 'addbyarrow' : 'minusbyarrow'
                    );
                }
            };
        };

        /**
         * 隐藏placeholder
         */
        NumberBox.prototype.hidePlaceholder = function () {
            lib.addClasses(
                this.helper.getPart('input-placeholder'),
                [HIDE_CLASS]
            );
        };

        /**
         * 显示placeholder
         */
        NumberBox.prototype.showPlaceholder = function () {
            lib.removeClasses(
                this.helper.getPart('input-placeholder'),
                [HIDE_CLASS]
            );
        };

        /**
         * input变化时候的事件
         *
         * @return {Function} 事件处理函数
         */
        NumberBox.prototype.onInputChange = function () {
            var me = this;
            return function (e) {
                me.setValue(me.helper.getPart('input').value);
            };
        };

        /**
         * input 获取focus的事件
         *
         * @return {Function} focus处理事件
         */
        NumberBox.prototype.onInputFocus = function () {
            var me = this;
            return function () {
                me.fire('inputfocus');
                me.hidePlaceholder();
                if (me.isShowTimelyTip) {
                    if (me.validate()) {
                        me.showRangeTip();
                        // 否则提示跟错误会冲突
                        me.hideError();
                    }
                }
                me.isOnFocus = true;
            };
        };

        /**
         * 当前是否是合法状态
         *
         * @return {boolean} 是或否
         */
        NumberBox.prototype.isValide = function () {
            return this.validity.getValidState() !== 'invalid';
        };

        /**
         * @param {string} str 要处理的字符串
         * @return {sting} str 处理完的字符串
         */
        function trim(str) {
            return String(str).replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, '');
        }

        /**
         * input 获取blur的事件
         *
         * @return {Function} blur处理事件
         */
        NumberBox.prototype.onInputBlur = function () {
            var me = this;
            return function () {
                me.fire('inputblur');
                me.hideRangeTip();
                var val = trim(me.getValue());
                if (val.length === 0 && me.placeholder) {
                    me.showPlaceholder();
                }
                me.isOnFocus = false;
                me.setValue(me.fixValue(me.helper.getPart('input').value));
            };
        };

        /**
         * 对输入值进行验证
         */
        NumberBox.prototype.validateValue = function () {
            var isValide = this.validate();
            // 范围之类的合法以后，进行小数截断
            if (isValide) {
                // 合法的值变化时触发
                this.fire('valid');
            }
        };

        /**
         * 截取小数位数
         * @param {number} value 要截取的值
         * @return {number} 截取后的值
         */
        NumberBox.prototype.fixValue = function (value) {
            if (this.decimalPlace && !isNaN(value) && !/^ *$/.test(value)) {
                value = fixNumber(value, this.decimalPlace);
            }
            return value;
        };

        /**
         * 隐藏范围提示
         */
        NumberBox.prototype.hideRangeTip = function () {
            lib.addClasses(
                this.helper.getPart('tip'),
                [HIDE_CLASS]
            );
        };

        /**
         * 显示范围提示
         */
        NumberBox.prototype.showRangeTip = function () {
            lib.removeClasses(
                this.helper.getPart('tip'),
                [HIDE_CLASS]
            );
        };

        /**
         * 输入非法时候的处理
         */
        NumberBox.prototype.oninvalid = function () {
            this.hideRangeTip();
        };

        /**
         * 隐藏错误
         */
        NumberBox.prototype.hideError = function () {
            lib.addClasses(
                this.helper.getPart('validity'),
                [HIDE_CLASS]
            );
        };

        /**
         * 重新渲染
         *
         * @override
         */
        NumberBox.prototype.repaint = painters.createRepaint(
            InputControl.prototype.repaint,
            {
                /**
                 * 控件的原始值，为字符串数组，每行表示一个字符串
                 *
                 * @property {string[]} rawValue
                 * @override
                 */
                name: 'rawValue',
                paint: function (NumberBox, value) {
                    // 输入区
                    // 在输入框里即时输入的时候，不做小数截断
                    value = (isNaN(window.parseInt(value, 10))
                        || NumberBox.isOnFocus)
                        ? value : NumberBox.fixValue(value);
                    NumberBox.helper.getPart('input').value = value;
                    NumberBox.validateValue();
                }
            },
            {
                name: 'placeholder',
                paint: function (NumberBox, value) {
                    NumberBox.helper.getPart('input-placeholder').innerHTML = value;
                }
            },
            {
                name: 'disabled',
                paint: function (NumberBox, disabled) {
                    var input = NumberBox.helper.getPart('input');
                    input.disabled = !!disabled;
                    if (disabled) {
                        NumberBox.helper.addStateClasses('disabled');
                    }
                    else {
                        NumberBox.helper.removeStateClasses('disabled');
                    }
                }
            }
        );

        /**
         * 按stepValue的值的粒度变化input的值 加 或者 减
         *
         * @param {string} opt 取值 'add' 或者 'minus'
         */
        NumberBox.prototype.changeValueByStepValue = function (opt) {
            // 输入的不是数字的时候或者为空的时候
            if (this.validity.states[0].state === false) {
                return;
            }
            var newValue = parseFloat(this.getValue(), 10);
            if (opt === ARROW_OPT.ADD) {
                newValue += parseFloat(this.stepValue, 10);
            }
            else {
                newValue -= parseFloat(this.stepValue, 10);
            }
            newValue = this.fixValue(newValue);
            if ((opt === ARROW_OPT.ADD && newValue <= this.max)
                || (opt === ARROW_OPT.MINUS && newValue >= this.min)) {
                this.setValue(newValue);
            }
        };

        /**
         * 设置value的值
         *
         * @param {number|string} value 要设置的值
         * @pubic
         */
        NumberBox.prototype.setValue = function (value) {
            this.setProperties({value: '' + value});
            // 每次设置值的时候 都要validate一下，
            // repait里面只有只变化的时候才会validate
            this.validateValue();
            this.fire('inputchange');
        };

        /**
         * get value的值
         *
         * @override
         * @pubic
         */
        NumberBox.prototype.getValue = function () {
            return this.fixValue(this.getRawValue());
        };


        /**
         * 隐藏控件
         *
         * @override
         * @pubic
         */
        NumberBox.prototype.hide = function () {
            this.addState('hidden');
            var label = this.getValidityLabel();
            label && label.hide();
        };

        /**
         * 显示控件
         *
         * @override
         * @pubic
         */
        NumberBox.prototype.show = function () {
            this.removeState('hidden');
            var label = this.getValidityLabel();
            label && label.show();
        };

        lib.inherits(NumberBox, InputControl);
        esui.register(NumberBox);
        return NumberBox;
    }
);
