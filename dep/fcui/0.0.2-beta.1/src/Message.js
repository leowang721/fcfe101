/**
 * @file Message显示逻辑
 * ```
 * 提供一套加载提示、成功提示、失败提示的显示和隐藏等功能的组件
 * 能够显示三种Loading样式，包含：仅文字、gif图提示、进度条提示
 * 能够显示成功、失败提示，支持提示内容可配置，是否自动隐藏可配置
 * ```
 * ```
 * 当前已定义消息类型：
 * loading 正在加载提示，支持text、normal、progress三种，详见Loading.js
 * success 成功类型
 * fail 失败类型
 * ```
 * 一、 使用方法如下：
 * ```
 * 1. new一个Message实例。var message = new Message(option);
 *     option的配置详见构造函数说明，必须有container。
 *     其他参数可选，不传采用默认，@see DEFAULT_OPTION
 * 2. 自定义显示。message.show()。
 * 3. 封装好的loading显示。message.loading()。
 * 4. 封装好的成功提示。message.success()。
 * 5. 封装好的失败提示。message.fail()。
 * 6. 隐藏Message区域，message.hide()。
 * 7. 销毁实例。message.dispose()。
 * ```
 * 二、 对外暴露的调用接口
 * ```
 * 1. show 自定义显示。支持临时传入区域样式msgClass、自定义fcIcon图标样式fcIconClass、
 *     内容content，自动隐藏相关配置，loading类型下可以配置加载类型loadingType
 *     _建议_：对于已经定义的loading success fail类型有限使用对应方法，他们更加简洁。
 *     当需要自定义类型时，时再使用show方法。
 * 2. loading 支持临时传入loadingText和loadingType，当前生效一次
 *     如果不传入参数，采用创建时的配置
 * 3. success 支持临时传入提示内容successText和自动关闭配置autoHideOption。
 *     当前生效一次。如果不传入参数，采用创建时的配置
 *     （autoHideOption包括 是否自动隐藏isAutoHideTip 和 隐藏时间 autoHideTipTime）
 * 4. fail 支持临时传入failText和autoHideOption，原理同showSuccess
 * 5. hide 隐藏Message区域
 * 6. dispose 销毁Message
 * 注：如果需要最基础的功能，只用在初始化的时候传入配置参数，按需调用即可。
 *     不必理会调用函数时的形参。
 * ```
 * 三、暴露事件
 * ```
 * 1. 状态切换事件，事件data域中会包含当前Message的type
 *     inited
 *     showed
 *     hided
 *     closed
 *     disposed
 * 2. 用户交互事件，事件data域中会包含被点击的targetPart
 *     click 点击提示信息的文字区域时触发
 * ```
 * ```
 * TODO (mahaina) 如果需要集成回ESUI或作为FCUI组件发布，需要去掉jquery
 * TODO (mahaina) 如果需要集成回ESUI/FCUI，不能用etpl
 * ```
 * @author Mahaina(mahaina@baidu.com)
 * @author Pride Leong(liangjinping@baidu.com)
 */

define(function(require, exports, module) {
    var etpl = require('etpl');
    var fc = require('fc-core');
    var _ = require('underscore');
    var helper = require('./controlHelper');
    var lib = require('./lib');
    var eventTarget = require('mini-event/EventTarget');
    var Loading = require('./Loading');

    /**
     * loading id的前缀
     *
     * @type {string}
     * @const
     */
    var ID_PREFIX = 'view-message-';

    /**
     * loading的显示类型，紧影响loading时的类型，不影响提示消息（成功、失败）
     *
     * @type {Object.<string, string>}
     */
    var SHOW_TYPE = {
        INLINE: 'inline',
        BORDER: 'border'
    };

    /**
     * 支持的loading的类型
     *
     * @type {Object.<string, string>}
     * @const
     */
    var LOADING_TYPE = {
        TEXT: 'text',
        NORMAL: 'normal',
        PROGRESS: 'progress'
    };

    /**
     * 默认配置项
     *
     * @type {Object}
     * @const
     */
    var DEFAULT_OPTION = {
        showType: SHOW_TYPE.BORDER,
        loadingType: LOADING_TYPE.NORMAL,
        loadingText: '正在加载中...',
        successText: '数据下载成功！',
        failText: '数据下载失败,<a>点击刷新</a>',
        isAutoHideTip: false,
        autoHideTipTime: 3000
    };

    /**
     * 消息提示类型
     *
     * @type {Object.<string, string>}
     * @const
     */
    var MESSAGE_TYPE = {
        LOADING: 'loading',
        SUCCESS: 'success',
        FAIL: 'fail'
    };

    /**
     * 不同类型fcIcon图标的class
     *
     * @type {Object.<string, string>}
     */
    var FC_ICON_CLASS = {
        SUCCESS: 'font-icon font-icon-check-circle',
        FAIL: 'font-icon font-icon-times-circle'
    };

    /**
     * 生命周期状态定义
     *
     * @type {Object.<string, number>}
     * @const
     */
    var LIFE_STAGE = {
        INITED: 1,
        SHOWED: 2,
        HIDED: 4,
        CLOSED: 8,
        DISPOSED: 16
    };

    /**
     * 生命周期状态反向，值 -> key
     *
     * @type {Object.<number, string>}
     * @const
     */
    var LIFE_STAGE_KEY = {};
    (function () {
        for (var k in LIFE_STAGE) {
            if (LIFE_STAGE.hasOwnProperty(k)) {
                LIFE_STAGE_KEY[LIFE_STAGE[k]] = k;
            }
        }
    })();

    /**
     * 事件定义
     *
     * @type {string}
     * @const
     */
    var EVENTS = {
        CLICK: 'click'
    };

    /**
     * loading的事件
     *
     * @type {string}
     * @const
     */
    var LOADING_EVENT = {
        DISPOSED: 'disposed'
    };

    /**
     * 模板
     *
     * TODO （mahaina） nirvana加载tpl文件跨域问题解决后需要移出至独立文件
     * @type {string}
     */
    var TPL = ''
        + '<!-- target: library-framework-view-message -->'
        + '<div id="${id}" class="view-message-${typeClass} hide">'
        + '</div>'
        + '<!-- target: library-framework-view-message-msg -->'
        + '<div class="${msgClass}">'
        +     '<span class="view-message-icon ${fcIconClass}"></span>'
        +     '<div class="view-message-content">${content}</div>'
        +     '<span class="view-message-close font-icon font-icon-times"></span>'
        + '</div>';

    etpl.compile(TPL);

    var proto = {};

    /**
     * Message控件
     *
     * @param {Object} option Loading配置参数
     * @param {string} option.container 容器选择条件
     * @param {number=} option.id message的id
     *     不传时会自动生成唯一ID，（除非特殊场景）不推荐传入
     * @param {string=} option.showType loading展示类型，包括[`inline`|`border`]
     * @param {string=} option.loadingType loading的类型
     *     目前支持[`text`|`normal`|`progress`],@see ../loading/Loading.js
     * @param {string=} option.loadingText 加载中话术
     * @param {string=} option.successText 成功话术，可以是一段html
     * @param {string=} option.failText 失败话术，可以是一段html
     * @param {boolean=} option.isAutoHideTip 是否自动关闭成功、失败提示
     * @param {boolean=} option.autoHideTipTime 自动关闭成功、失败的等待时间；
     *     单位毫秒 isAutoHideTip === true时才有效
     * @constructor
     */
    proto.constructor = function (option) {
        if (!option || !option.container) {
            throw new Error('Message: container is not defined.');
        }
        option = this._getOption(option);
        /**
         * Message的配置项
         *
         * @type {Object}
         * @private
         */
        this._option = option;
        this._initMainHtml();
        this._changeToStage(LIFE_STAGE.INITED);
    };

    /**
     * 获得配置参数
     *
     * @param {Object} option 调用方传入的参数
     * @return {Object} 处理后的参数
     * @private
     */
    proto._getOption = function (option) {
        option.containerStr = option.container;
        option.container = lib.find(document, option.container);
        option = _.deepExtend({}, DEFAULT_OPTION, option);
        option.id = option.id || (ID_PREFIX + fc.util.guid());
        return option;
    };

    /**
     * 初始化主html
     *
     * @private
     */
    proto._initMainHtml = function () {
        var option = this._option;
        var id = option.id;
        var html = etpl.render(
            'library-framework-view-message',
            {id: id, typeClass: option.showType}
        );
        option.container.innerHTML = html;

        /**
         * message实例的主体
         *
         * @type {jQuery}
         * @private
         */
        this._main = lib.find(option.container, '#' + id);
    };

    /**
     * 更改状态
     *
     * @param {number} stage stage的键， 参数必须为LIFE_STAGE中指定常量值
     * @param {string=} optType 当前阶段的类型
     * @private
     */
    proto._changeToStage = function (stage, optType) {
        if (!(stage in LIFE_STAGE_KEY)) {
            throw new Error('不存在的life stage值: ' + stage);
        }
        var stageName = LIFE_STAGE_KEY[stage].toLowerCase();
        /**
         * 当前生命周期
         *
         * @type {number}
         * @public
         */
        this.stage = stage;
        optType = optType || this.type;
        if (optType) {
            /**
             * 当前类型
             *
             * @type {string}
             * @public
             */
            this.type = optType;
            this.fire(stageName, {data: {type: optType}});
        }
        else {
            this.fire(stageName);
        }
    };

    /**
     * 绑定事件
     *
     * @private
     */
    proto._bindCloseEvent = function () {
        var me = this;
        var closeDOM = lib.find(this._main, '.view-message-close');
        helper.addDOMEvent(
            me,
            closeDOM,
            'click',
            function () {
                lib.addClass(me._main, 'hide');
                me._changeToStage(LIFE_STAGE.CLOSED);
            }
        );
    };

    /**
     * 绑定提示（成功、失败）中的内容部分点击事件
     *
     * @private
     */
    proto._bindContentClickEvent = function () {
        var me = this;
        var option = this._option;
        var container = option.container;
        var content = lib.find(container, '.view-message-content');
        helper.addDOMEvent(
            me,
            content,
            'click',
            function (evt) {
                me.fire(EVENTS.CLICK, {
                    data: {
                        targetPart: evt.target
                    }
                });
            }
        );
    };

    /**
     * 渲染消息提示html
     *
     * @param {Object} options 渲染模板用的参数
     * @param {string} options.msgClass 消息区样式class
     * @param {string} options.fcIconClass fcIcon图标class
     * @param {string} options.content 消息内容
     * @private
     */
    proto._renderMessageHtml = function (options) {
        var msgHtml = etpl.render(
            'library-framework-view-message-msg',
            {
                msgClass: options.msgClass,
                fcIconClass: options.fcIconClass,
                content: options.content
            }
        );
        var main = this._main;
        main.innerHTML = msgHtml;
        this._bindCloseEvent();
        this._bindContentClickEvent();
    };

    /**
     * 设置提示消息自动定时关闭
     *
     * @param {Object} option 自动关闭配置
     * @param {boolean=} option.isAutoHideTip 是否自动隐藏提示信息
     * @param {number=} option.autoHideTipTime 默认隐藏时间
     *     仅在isAutoHideTip为true时生效
     * @private
     */
    proto._setAutoHide = function (option) {
        var me = this;
        var isAutoHideTip = option && option.isAutoHideTip;
        if (isAutoHideTip) {
            setTimeout(function () {
                me.hide();
            }, option.autoHideTipTime);
        }
    };

    /**
     * 获得消息类型对应的class
     *
     * @param {string=} msgType 消息类型，不传时，同时删除成功和失败的class
     * @return {string} 消息类型对应的class。如 view-message-border-success
     * @private
     */
    proto._buildMessageClass = function (msgType) {
        return ID_PREFIX + this._option.showType + '-' + msgType;
    };

    /**
     * 显示消息
     *
     * @param {string} type 消息类型。出了默认的MESSAGE_TYPE中的定义，支持自定义
     * @param {Object} renderOptions 渲染相关的参数配置
     * @param {string} renderOptions.msgClass 消息区的class，非loading类型生效
     * @param {string} renderOptions.fcIconClass 消息区的fcIcon的class
     *     非loading类型生效
     * @param {string} renderOptions.content 消息区内容
     *     loading仅支持纯文本，其他消息支持html片段
     * @param {boolean} renderOptions.isAutoHideTip 是否自动隐藏 非loading类型生效
     * @param {number} renderOptions.autoHideTipTime 隐藏等待时间 非loading类型生效
     * @param {string} renderOptions.loadingType loading类型
     *     包含[normal | text | progress] 仅type为loading时生效
     * @public
     */
    proto.show = function (type, renderOptions) {
        var stage = this.stage;
        if (!LIFE_STAGE_KEY[stage] || stage === LIFE_STAGE.DISPOSED) {
            throw new Error('Message is not inited');
        }
        var option = this._option;
        this._loadingInstance = null;
        if (type === MESSAGE_TYPE.LOADING) {
            this.loading(renderOptions.content, renderOptions.loadingType);
        }
        else {
            this._renderMessageHtml(renderOptions);
            lib.removeClass(this._main, 'hide');
            this._changeToStage(LIFE_STAGE.SHOWED, type);
            // 设置自动关闭
            this._setAutoHide({
                isAutoHideTip: renderOptions.isAutoHideTip
                    || option.isAutoHideTip,
                autoHideTipTime: renderOptions.autoHideTipTime
                    || option.autoHideTipTime
            });
        }
    };

    /**
     * 显示loading
     *
     * @param {string=} loadingText loading话术，优先级高于创建Message时传入的话术
     *     不传时，默认使用初始化时的loading类型
     * @param {string=} loadingType loading类型，优先级高于创建Message时传入的类型
     *     不传时，默认使用初始化时的loading类型
     * @public
     */
    proto.loading = function (loadingText, loadingType) {
        var option = this._option;
        loadingText = loadingText || option.loadingText;
        loadingType = loadingType || option.loadingType;
        /**
         * loading实例
         *
         * @type {Loading}
         * @private
         */
        this._loadingInstance = new Loading({
            container: '#' + option.id,
            type: loadingType,
            loadingText: loadingText
        });
        lib.removeClass(this._main, 'hide');
        this._changeToStage(LIFE_STAGE.SHOWED, MESSAGE_TYPE.LOADING);
        this._loadingInstance.init();
    };

    /**
     * 显示成功信息，会默认先结束loading
     *
     * @param {string=} successText 成功信息
     *     如果没有设置，默认采用初始化时的successText参数
     * @param {Object=} autoHideOption 自动隐藏选项设置，不传时按照初始化时参数执行
     * @param {boolean=} autoHideOption.isAutoHideTip 是否自动隐藏提示信息
     * @param {number=} autoHideOption.autoHideTipTime 隐藏时间
     *     仅在isAutoHideTip为true时生效
     * @public
     */
    proto.success = function (successText, autoHideOption) {
        var me = this;
        var option = this._option;
        successText = successText || option.successText;
        var type = MESSAGE_TYPE.SUCCESS;
        var msgOptions = {
            msgClass: me._buildMessageClass(type),
            fcIconClass: FC_ICON_CLASS.SUCCESS,
            content: successText
        };
        var loadingInstance = this._loadingInstance;
        // 如果loading未结束，需要先结束loading
        if (loadingInstance) {
            loadingInstance.on(
                LOADING_EVENT.DISPOSED,
                function () {
                    me._loadingInstance = null;
                    lib.addClass(me._main, 'hide');
                    me.show(type, _.extend(msgOptions, autoHideOption));
                }
            );
            // 需要先结束loading
            loadingInstance.done();
        }
        else {
            me.show(type, _.extend(msgOptions, autoHideOption));
        }
    };

    /**
     * 显示失败
     *
     * @param {string} failText 失败信息
     *     如果没有设置，默认采用初始化时的failText参数
     * @param {Object=} autoHideOption 自动隐藏选项设置，不传时按照初始化时参数执行
     * @param {boolean=} autoHideOption.isAutoHideTip 是否自动隐藏提示信息
     * @param {number=} autoHideOption.autoHideTipTime 隐藏时间
     *     仅在isAutoHideTip为true时生效
     * @public
     */
    proto.fail = function (failText, autoHideOption) {
        var me = this;
        var option = this._option;
        failText = failText || option.failText;
        var type = MESSAGE_TYPE.FAIL;
        this.show(
            type,
            _.extend(
                {
                    msgClass: me._buildMessageClass(type),
                    fcIconClass: FC_ICON_CLASS.FAIL,
                    content: failText
                },
                autoHideOption
            )
        );
    };

    /**
     * 隐藏Message区域
     *
     * @public
     */
    proto.hide = function () {
        var main = this._main;
        if (!lib.hasClass(main, 'hide')) {
            lib.addClass(this._main, 'hide');
            this._changeToStage(LIFE_STAGE.HIDED);
        }
    };

    /**
     * 销毁Message区域
     *
     * @public
     */
    proto.dispose = function () {
        this._loadingInstance = null;
        this._option.container.html('');
        this._changeToStage(LIFE_STAGE.DISPOSED);
    };

    var Message = fc.oo.derive(eventTarget, proto);

    return Message;
});
