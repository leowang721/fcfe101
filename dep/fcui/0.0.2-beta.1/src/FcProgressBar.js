/**
 * @file ProgressBar进度条显示逻辑，提供一个模拟的进度条显示
 * @author Mahaina(mahaina@baidu.com)
 * @author Pride Leong(liangjinping@baidu.com)
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');

    var etpl = require('etpl');
    var Control = require('./Control');
    var ui = require('./main');
    var lib = require('./lib');

    /**
     * 默认配置
     *
     * @type {Object}
     * @const
     */
    var DEFAULT_OPTION = {
        fakePausePercent: '85%',
        fakeProcessTime: 20000
    };

    /**
     * 事件名
     * @type {Object.<string, string>}
     * @const
     */
    var EVENT_NAMES = {
        /**
         * 进度条已经达到预定的比例，参见DEFAULT_OPTION.fakePausePercent
         */
        TARGET_REACHED_EVENT: 'targetreached',
        /**
         * 暂停等待事件，此时除非发生外界干预，进度条不再前进
         */
        PAUSE_EVENT: 'progressbarpaused',
        /**
         * 结束绘制完成事件
         */
        FINISH_EVENT: 'progressbarfinished',
        /**
         * 进度条修改位置绘制完成事件
         */
        CHANGE_EVENT: 'progressbarchanged'
    };

    /**
     * 不同阶段的事件关键字定义，将不同阶段映射到EVENT_NAMES的key上
     * @type {Object.<string, string>}
     */
    var STAGE_EVENT = {
        TARGET_REACHED: 'TARGET_REACHED_EVENT',
        PAUSED: 'PAUSE_EVENT',
        FINISHED: 'FINISH_EVENT',
        CHANGED: 'CHANGE_EVENT'
    };

    /**
     * 生成进度条id的前缀
     *
     * @type {string}
     * @const
     */
    var ID_PREFIX = 'view-progress-bar-';

    /**
     * 默认的变化速度
     * @type {string}
     * @cosnt
     */
    var DEFAULT_CHANGE_SPEED = 'normal';

    /**
     * 默认加载完成后的宽度比例
     * @type {string}
     * @const
     */
    var DEFAULT_FINISH_PERCENT = '100%';

    /**
     * 模板
     *
     * TODO （mahaina） nirvana加载tpl文件跨域问题解决后需要移出至独立文件
     * @type {string}
     */
    var TPL = ''
        + '<!-- target: library-framework-ui-progress-bar -->'
        + '<div class="${mainClass}">'
        +     '<div class="${chartClass}">'
        +     '</div>'
        + '</div>';

    etpl.compile(TPL);

    var proto = {};

    /**
     * ProgressBar 进度条
     *     进度条会按照container的宽高自适应
     *
     * @param {Object} option ProgressBar配置参数
     *     @param {string=} option.id ProgressBar的id
     *     @param {number=} option.fakePausePercent 模拟等待位置，百分比的分子，100以内
     *     @param {number=} option.fakeProcessTime 模拟处理时间，单位毫秒
     *
     * 对外暴露的调用接口
     * start 进度条开始
     * pause 暂停在当前位置
     * changeTo 改变进度至某一位置
     * finish 加载结束
     *
     * 暴露事件
     * 参考常量EVENT_NAMES定义
     *
     * @constructor
     */
    proto.constructor = function (option) {
        option = _.deepEextend({}, DEFAULT_OPTION, option);
        option.id = option.id || ID_PREFIX + fc.util.guid();
        Control.apply(this, arguments);
    };

    /**
     * 控件类型，始终为`"FcProgressBar"`
     *
     * @type {string}
     * @readonly
     * @override
     */
    proto.type = 'FcProgressBar';

    /**
     * 初始化，将模板插入html中
     *
     * @param {Object} options 初始化参数
     * @protected
     * @override
     */
    proto.initOptions = function (options) {
        var properties = _.deepExtend({}, DEFAULT_OPTION, options);
        this.setProperties(properties);
    };

    /**
     * 创建主元素，默认使用'<div>'元素
     *
     * @return {HtmlElement} 主元素
     * @protected
     * @override
     */
    proto.createMain = function () {
        return document.createElement('div');
    };

    /**
     * 初始化DOM结构
     *
     * @protected
     * @override
     */
    proto.initStructure = function () {
        // 子元素挂在皮肤class
        var helper = this.helper;
        var mainClass = helper.getPartClasses('main').join(' ');
        var chartClass = helper.getPartClasses('chart').join(' ');
        this.main.innerHTML = etpl.render(
            'library-framework-ui-progress-bar',
            {
                mainClass: mainClass,
                chartClass: chartClass
            }
        );

        /**
         * 进度条
         * @type {jQuery}
         * @private
         */
        this._progressBar = lib.find(this.main, '.ui-progressbar-chart');
    };

    /**
     * 动画实现
     * @param {number} width 进度条宽
     * @param {string|number} speed 动画速度
     * @param {Function=} callback 回调函数
     * @private
     */
    proto._animate = function (width, speed, callback) {
        var style = {width: width};
        var progressBar = this._progressBar;
        // 避免之前动画还未完成，先调用stop
        progressBar.stop();
        if (callback) {
            progressBar.animate(style, speed, callback);
        }
        else {
            progressBar.animate(style, speed);
        }
    };

    /**
     * 动画完成后的回调处理
     * @param {string} type 事件key
     * @return {Function} 回调函数
     * @private
     */
    proto._animateCallback = function (type) {
        var me = this;
        return function () {
            me._fireEvent(type);
        };
    };

    /**
     * fire事件
     * @param {string} type 事件类型
     * @private
     */
    proto._fireEvent = function (type) {
        var progressBar = this._progressBar;
        var currentWidth = progressBar.width();
        var eventData = {currentWidth: currentWidth};
        var eventName = EVENT_NAMES[type];
        this.fire(eventName, {data: eventData});
    };

    /**
     * ProgressBar进度条开始滚动
     */
    proto.start = function () {
        var pausePercent = this.fakePausePercent;
        this._animate(
            pausePercent,
            this.fakeProcessTime,
            this._animateCallback(STAGE_EVENT.TARGET_REACHED)
        );
    };

    /**
     * ProgressBar暂停在当前位置
     */
    proto.pause = function () {
        this._progressBar.stop();
        this._fireEvent(STAGE_EVENT.PAUSED);
    };

    /**
     * ProgressBar结束，完成全部进度
     */
    proto.finish = function () {
        this._animate(
            DEFAULT_FINISH_PERCENT,
            DEFAULT_CHANGE_SPEED,
            this._animateCallback(STAGE_EVENT.FINISHED)
        );
    };

    /**
     * 将进度修改为某一宽度
     * @param {number} percentWidth 设定的目标百分比
     * @param {string|number=} speed 动画速度，默认参见DEFAULT_CHANGE_SPEED
     *     string的可选项为'slow', 'fast', 'normal'；number单位为毫秒
     */
    proto.changeTo = function (percentWidth, speed) {
        speed = speed || DEFAULT_CHANGE_SPEED;
        this._animate(
            percentWidth,
            speed,
            this._animateCallback(STAGE_EVENT.CHANGED)
        );
    };

    var ProgressBar = fc.oo.derive(Control, proto);
    ui.register(ProgressBar);
    return ProgressBar;
});
