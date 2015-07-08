/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 提示信息控件，派生自ESUI 3.1.0-beta.3
 * @author lisijin, dbear, otakustay
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Tip} 提示消息控件
 */

define(
    function (require) {
        var u = require('underscore');
        var oo = require('fc-core/oo');
        var Control = require('./Control');
        var ui = require('./main');
        var lib = require('./lib');

        require('./FcTipLayer');

        /**
         * 提示信息控件
         *
         * `Tip`控件是一个小图标，当鼠标移到图标上时，会出现一个层显示提示信息
         *
         * @extends Control
         * @requires TipLayer
         * @constructor
         */
        var proto = {};

        proto.constructor = function (options) {
            Control.apply(this, arguments);
        };

        /**
         * 控件类型，始终为`"Tip"`
         *
         * @type {string}
         * @readonly
         * @override
         */
        proto.type = 'FcTip';

        /**
         * 初始化参数
         *
         * @param {Object} [options] 构造函数传入的参数
         * @protected
         * @override
         */
        proto.initOptions = function (options) {
            // 默认选项配置
            var properties = {
                title: '',
                /**
                 * 供给TipLayer的content。
                 * 当传入一个string时，内容直接渲染在TipLayer内。
                 * 当传入一个Function时，内容渲染延迟至TipLayer show的时候开始。
                 * 此时接受2种返回：若为string，则直接渲染在TipLayer内。若为Promise，则先loading，
                 * resolve后渲染在TipLayer中。
                 *
                 * @type {string | Function}
                 */
                content: '',
                /**
                 * @property {string} showMode
                 *
                 * 指定信息浮层的显示方案，
                 * 具体参考{@link TipLayer#attachTo}方法的`showMode`参数的说明
                 */
                showMode: 'over',

                /**
                 * @property {number} delayTime
                 *
                 * 指定信息浮层的显示的延迟时间，以毫秒为单位，
                 * 具体参考{@link TipLayer#attachTo}方法的`delayTime`参数的说明
                 */
                delayTime: 500,
                /**
                 * @property {number} positionOpt
                 * @see {dom~DockPosition}
                 * @default lib.DockPosition.BOTTOM_TOP_LEFT_RIGHT
                 *
                 * 信息浮层的位置。
                 */
                positionOpt: lib.DockPosition.BOTTOM_TOP_LEFT_RIGHT,
                /**
                 * 作为提示的icon类型。可选为"?", "!", "i"三种
                 * @property {string} iconType
                 */
                iconType: '?'
            };

            extractDOMProperties(this.main, properties);

            u.extend(properties, options);

            this.setProperties(properties);
        };

        /**
         * 从DOM中抽取`title`和`content`属性，如果有的话优先级低于外部给定的
         *
         * @param {HTMLElement} main 主元素
         * @param  {Object} options 构造函数传入的参数
         * @ignore
         */
        function extractDOMProperties(main, options) {
            options.title = options.title || main.getAttribute('title');
            main.removeAttribute('title');
            options.content = options.content || main.innerHTML;
            main.innerHTML = '';
        }

        /**
         * 初始化DOM结构
         *
         * @protected
         * @override
         */
        proto.initStructure = function () {
            var main = document.createElement('div');
            document.body.appendChild(main);
            switch (this.iconType) {
                case '?':
                    this.helper.addPartClasses('question');
                    break;
                case '!':
                    this.helper.addPartClasses('warn');
                    break;
                case 'i':
                    this.helper.addPartClasses('info');
                    break;
                default:
                    break;

            }
            var tipLayer = ui.create(
                'FcTipLayer',
                {
                    main: main,
                    childName: 'layer',
                    content: this.content,
                    title: this.title,
                    /**
                     * FCUI Tip不支持arrow，始终为false
                     * @type {Boolean}
                     */
                    arrow: false,
                    /**
                     * @property {number} [layerWidth=200]
                     *
                     * 指定信息浮层的宽度，具体参考{@link TipLayer#width}属性
                     */
                    width: this.layerWidth || 200,
                    viewContext: this.viewContext
                }
            );
            this.addChild(tipLayer);
            tipLayer.render();

            this.helper.addStateClasses(this.showMode);

            var attachOptions = {
                showMode: this.showMode,
                delayTime: this.delayTime,
                targetControl: this,
                positionOpt: this.positionOpt
            };
            tipLayer.attachTo(attachOptions);
        };

        /**
         * 重渲染
         *
         * @method
         * @protected
         * @override
         */
        proto.repaint = require('./painters').createRepaint(
            Control.prototype.repaint,
            {
                name: 'title',
                paint: function (tip, value) {
                    var layer = tip.getChild('layer');
                    if (layer) {
                        layer.setTitle(value);
                    }
                }
            },
            {
                name: 'content',
                paint: function (tip, value) {
                    var layer = tip.getChild('layer');
                    if (layer) {
                        layer.setContent(value);
                    }
                }
            }
        );

        var Tip = oo.derive(Control, proto);
        ui.register(Tip);
        return Tip;
    }
);
