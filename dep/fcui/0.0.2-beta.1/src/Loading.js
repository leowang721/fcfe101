/**
 * @file loading显示逻辑
 *
 * 包含的模式：
 * `normal`：普通loading gif图加文字
 * `progress`：进度条加文字
 * `text`：纯文本模式
 *
 * 使用方法如下：
 * 1. new 一个Loading实例。 var loading = new Loading(option);
 *     option配置如下：
 *         【must】容器container
 *         【optional】container、id（不推荐传入）、type（'normal|progress|text'）、
 *             loadingText（自定义加载话术）
 * 2. 显示Loading。 loading.init();
 * 3. 关闭并销毁Loading。loading.done();
 *
 * 静态调用方法：
 * 1. 生成并显示Loading。Loading.init(options);
 *     options可以包含多个上面描述的option。该方法可以同时在多个容器中显示loading。并返回所有实例对象。
 * 2. 关闭Loading。Loading.done(containers);
 *     关闭并销毁所有传入的containers中的Loading，如果没有传contaners参数，则关闭所有Loading实例。
 *
 * 对外暴露事件：
 * 1. `show` 已显示loading
 * 2. `disposing` 即将销毁loading
 *
 * @author Mahaina(mahaina@baidu.com)
 * @author Pride Leong(liangjinping@baidu.com)
 */

define(function (require) {
    var etpl = require('etpl');
    var ui = require('./main');
    var _ = require('underscore');
    var fc = require('fc-core');
    var lib = require('./lib');
    var eventTarget = require('mini-event/EventTarget');

    require('./FcProgressBar');

    /**
     * 随机生成id的前缀
     *
     * @type {string}
     * @const
     */
    var ID_PREFIX = 'view-loading-';

    /**
     * 图片区域样式class名称前缀
     *
     * @type {string}
     * @const
     */
    var IMG_CLASS_PREFIX = ID_PREFIX + 'img-';

    /**
     * 进度条控件id的后缀
     *
     * @type {string}
     * @const
     */
    var PROGRESS_BAR_ID_SUFFIX = '-progress-bar';

    /**
     * 进度条结束事件
     *
     * @type {string}
     * @const
     */
    var PROGRESS_BAR_FINISH_EVENT = 'progressbarfinished';

    /**
     * loading的类型
     *
     * @type {Object.<string, number>}
     * @const
     */
    var LOADING_TYPE = {
        /**
         * 普通类型，同时显示标准gif和文字
         */
        NORMAL: 0,
        /**
         * 进度条类型，同时显示进度条和文字
         */
        PROGRESS: 1,
        /**
         * 仅文字提示
         */
        TEXT: 2
    };

    /**
     * loading类型的状态反向，值 -> key
     *
     * @type {Object.<number, string>}
     * @const
     */
    var LOADING_TYPE_KEY = {};
    (function () {
        for (var key in LOADING_TYPE) {
            if (LOADING_TYPE.hasOwnProperty(key)) {
                LOADING_TYPE_KEY[LOADING_TYPE[key]] = key.toLowerCase();
            }
        }
    })();

    /**
     * loading事件
     *
     * @type {string}
     * @const
     */
    var LOADING_EVENT = {
        SHOWED: 'showed',
        DISPOSING: 'disposing',
        DISPOSED: 'disposed'
    };

    /**
     * 默认配置项
     *
     * @type {Object}
     * @const
     */
    var DEFAULT_OPTION = {
        type: LOADING_TYPE_KEY[LOADING_TYPE.NORMAL],
        // 加载提示话术
        loadingText: '正在加载中...'
    };

    /**
     * 模板
     *
     * TODO （mahaina） nirvana加载tpl文件跨域问题解决后需要移出至独立文件
     * @type {string}
     */
    var TPL = ''
        + '<!-- target: library-framework-view-loading -->'
        + '<div id="${id}" class="view-loading hide">'
        +     '<!-- if: ${type} !== "TextOnly" -->'
        +     '<div class="view-loading-img ${imgClass}">'
        +         '<!-- if: ${type} === "progress" -->'
        +         '<div data-ui-id="${progressBarId}" data-ui-type="FcProgressBar"></div>'
        +         '<!-- /if -->'
        +     '</div>'
        +     '<!-- /if -->'
        +     '<span class="view-loading-text">${loadingText}</span>'
        + '</div>';

    etpl.compile(TPL);

    /**
     * 区域缓存的全部loading实例，格式如下
     *     {
     *         传入的container: 生成的loading instance
     *     }
     *
     * @type {Object}
     */
    var loadingCache = {};

    var proto = {};

    /**
     * Loading控件
     *
     * @param {Object} option Loading配置参数
     *     @param {string} option.container 容器
     *     @param {number=} option.id loading的id
     *         不传时会自动生成唯一ID，（除非特殊场景）不推荐传入
     *     @param {string=} option.type loading类型，有'normal|progress|text'
     *         'normal' 普通loading图片和话术提示
     *         'progress' 进度条类型
     *         'text' 仅文本
     *     @param {string=} option.loadingText 加载话术
     *
     * 对外暴露的调用接口
     * init 显示loading
     * hide 隐藏并销毁loading
     * dispose 销毁loading
     *
     * 静态接口
     * init 一次性生成多个Loading实例并显示它们
     * done 一次性结束并销毁所有Loading实例
     *
     * 对外fire事件
     * show 已显示loading
     * disposing 即将销毁loading
     *
     * @constructor
     */
    proto.constructor = function (option) {
        if (!option || !option.container) {
            throw new Error('Loading container is needed.');
        }
        /**
         * Loading的配置项
         *
         * @type {Object}
         * @private
         */
        this._option = this._getOption(option);
        this._initHtml();
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
        option = _.extend(true, {}, DEFAULT_OPTION, option);
        option.id = option.id || (ID_PREFIX + fc.util.guid());
        // 进度条esui的id
        option.progressBarId = option.id + PROGRESS_BAR_ID_SUFFIX;
        return option;
    };

    /**
     * 初始化，将模板插入html中
     *
     * @private
     */
    proto._initHtml = function () {
        var option = this._option;
        var imgClass = this.getImgClass();
        var tplHtml = etpl.render(
            'library-framework-view-loading',
            {
                id: option.id,
                type: option.type,
                loadingText: option.loadingText,
                imgClass: imgClass,
                progressBarId: option.progressBarId
            }
        );
        var container = option.container;
        container.innerHTML = tplHtml;
        this._initImg();
    };

    /**
     * 获得loading的图片区域样式class名称
     *
     * @return {string}
     */
    proto.getImgClass = function () {
        var option = this._option;
        var type = option.type;
        return IMG_CLASS_PREFIX + type.toLowerCase();
    };

    /**
     * 初始化加载提示图片
     *
     * @private
     */
    proto._initImg = function () {
        var option = this._option;
        var type = option.type;
        var progressType = LOADING_TYPE_KEY[LOADING_TYPE.PROGRESS];
        if (type === progressType) {
            this._initEsui();
            /**
             * 进度条引用
             * @type {Control}
             * @private
             */
            this._progressBar = ui.getSafely(option.progressBarId);
        }
    };

    /**
     * 切换生命周期阶段
     *
     * @param {string} stage 切换的目标阶段
     * @private
     */
    proto._changeToStage = function (stage) {
        this.fire(stage);
    };

    /**
     * 初始化进度条控件
     *
     * @private
     */
    proto._initEsui = function () {
        var container = this._option.container;
        ui.init(container);
    };

    /**
     * 显示loading
     */
    proto.init = function () {
        var option = this._option;
        lib.removeClass(lib.find('#' + option.id), 'hide');
        var progressBar = this._progressBar;
        // 如果是进度条形式，调用进度条的开始方法
        if (progressBar) {
            progressBar.start();
        }
        this._changeToStage(LOADING_EVENT.SHOWED);
    };

    /**
     * loading结束
     */
    proto.done = function () {
        var me = this;
        var progressBar = me._progressBar;
        // 如果是进度条形式，调用进度条的开始方法
        if (progressBar) {
            progressBar.on(PROGRESS_BAR_FINISH_EVENT, function () {
                me.dispose();
            });
            progressBar.finish();
        }
        else {
            me.dispose();
        }
    };

    /**
     * 销毁loading
     */
    proto.dispose = function () {
        var option = this._option;

        this._changeToStage(LOADING_EVENT.DISPOSING);
        option.container.innerHTML = '';
        // 如果在cache中也需要删除
        var cachedInstance = loadingCache[option.containerStr];
        if (cachedInstance) {
            delete loadingCache[option.containerStr];
        }
        this._changeToStage(LOADING_EVENT.DISPOSED);
    };

    var Loading = fc.oo.derive(eventTarget, proto);

    /**
     * 区域缓存的全部loading实例，格式如下
     *     {
     *         传入的container: 生成的loading instance
     *     }
     *
     * @type {Object}
     */
    Loading.loadingCache = loadingCache;

    /**
     * Loading静态工具方法，一次生成多个Loading实例，并依次显示它们
     *
     * @param {Array.<Object>} options 多个Loading实例的生成数组，内容参见Loading构造函数说明
     *     最简易使用方法为传入所有需要显示Loading位置的container组成的数组
     * @return {Object.<string, Object>} 返回当前所有loading实例
     */
    Loading.init = function (options) {
        if (!options || !options.length) {
            throw new Error(
                'At least one option(which containes `container`) is needed'
            );
        }
        _.each(options, function (option, key) {
            var container = option.container;
            var loadingInstance = new Loading(option);
            if (loadingInstance) {
                loadingCache[container] = loadingInstance;
                loadingInstance.init();
            }
        });
        return loadingCache;
    };

    /**
     * Loading静态工具方法，一次关闭并销毁若干或所有Loading实例
     * @param {Array.<string>=} containers 需要结束Loading的所有区域的container数组
     *     可选，不传入时结束所有Loading
     */
    Loading.done = function (containers) {
        if (containers && containers.length) {
            _.each(containers, function (container) {
                var loadingInstance = loadingCache[container];
                if (loadingInstance) {
                    loadingInstance.done();
                }
            });
        }
        else {
            _.each(loadingCache, function (loadingInstance) {
                loadingInstance.done();
            });
        }
    };

    return Loading;
});
