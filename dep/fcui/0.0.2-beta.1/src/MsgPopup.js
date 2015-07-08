/**
 * @file 消息弹窗
 * @author Feixiang Yuan(yuanfeixiang@baidu.com)
 * @date 2014-12-28
 */
define(function (require, exports, module) {
    var _ = require('underscore');
    var etpl = require('etpl');
    var Control = require('./Control');
    var lib = require('./lib');
    var paint = require('./painters');
    var helper = require('./controlHelper');

    /**
     * 默认选项
     *
     * @const
     * @type {Object}
     */
    var DEFAULT_OPTION = {
        height: 300,
        width: 300,
        position: {
            right: 0,
            bottom: 0
        },
        duration: 1000
    };

    /**
     * 消息弹窗
     *
     * @extends {Control}
     * @constructor
     * @param {Object} options 选项
     */
    function MsgPopup(options) {
        var args = [].slice.call(arguments);
        args[0] = _.deepExtend({}, DEFAULT_OPTION, options);
        Control.apply(this, args);
    }

    /**
     * 控件类型，始终为`"MsgPopup"`
     *
     * @type {string}
     * @readonly
     * @override
     */
    MsgPopup.prototype.type = 'MsgPopup';

    var MAIN_TEMPLATE = [
        '<div class="ui-msgpopup-content">',
        '<div class="ui-msgpopup-head">',
        '<div class="ui-msgpopup-title">${title}</div>',
        '<div class="ui-msgpopup-close"></div>',
        '</div>',
        '<div class="ui-msgpopup-body">${content}</div>',
        '</div>'
    ].join('');

    /**
     * 创建主元素，默认使用'<div>'元素
     *
     * @return {HtmlElement} 主元素
     * @protected
     * @override
     */
    MsgPopup.prototype.createMain = function () {
        return document.createElement('div');
    };

    /**
     * 初始化DOM结构
     *
     * @protected
     * @override
     */
    MsgPopup.prototype.initStructure = function () {
        this.main.innerHTML = etpl.compile(MAIN_TEMPLATE)({
            title: this.title,
            content: this.content
        });
        this.main.style.height = 0;
        if (!this.main.parentNode) {
            document.body.appendChild(this.main);
        }
        helper.addDOMEvent(
            this,
            lib.find(this.main, '.ui-msgpopup-close'),
            'click',
            _.bind(this.close, this)
        );
    };

    /**
     * 关闭
     */
    MsgPopup.prototype.close = function () {
        this.hide();
        this.fire('close');
    };

    /**
     * 显示
     */
    MsgPopup.prototype.hide = function () {
        var me = this;
        lib.stop(me.main);
        lib.animate(
            me.main,
            {
                height: 0
            },
            me.duration,
            function () {
                me.main.style.display = 'none';
            }
        );
    };

    /**
     * 隐藏
     */
    MsgPopup.prototype.show = function () {
        var me = this;
        lib.stop(me.main);
        me.main.style.display = 'block';
        lib.animate(
            me.main,
            {
                height: me.height
            },
            me.duration
        );
    };

    /**
     * 重渲染
     *
     * @protected
     * @override
     */
    MsgPopup.prototype.repaint = paint.createRepaint(
        /**
         * @property {number} width
         *
         * 宽度
         */
        paint.style('width'),

        {
            /**
             * @property {Object} position
             *
             * position
             */
            name: 'position',
            paint: function (ctrl) {
                for (var k in ctrl.position) {
                    if (ctrl.position.hasOwnProperty(k)) {
                        var v = ctrl.position[k];
                        ctrl.main.style[k] = v
                            + (/^\d+$/.test(v) ? 'px' : '');
                    }
                }
            }
        },

        {
            /**
             * @property {string} title
             *
             * title
             */
            name: 'title',
            paint: function (ctrl) {
                lib.find(ctrl.main, '.ui-msgpopup-title')
                    .innerHTML = ctrl.title;
            }
        },

        {
            /**
             * @property {string} content
             *
             * content
             */
            name: 'content',
            paint: function (ctrl) {
                lib.find(ctrl.main, '.ui-msgpopup-body')
                    .innerHTML = ctrl.content;
            }
        }
    );

    /**
     * 销毁控件
     *
     * @override
     */
    MsgPopup.prototype.dispose = function () {
        Control.prototype.dispose.apply(this, arguments);
    };

    lib.inherits(MsgPopup, Control);
    require('./main').register(MsgPopup);
    return MsgPopup;
});
