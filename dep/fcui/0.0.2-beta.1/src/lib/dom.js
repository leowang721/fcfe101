/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file DOM 辅助方法
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} DOM辅助方法
 */
define(function (require) {
    var u = require('underscore');
    var libDom = require('esui/lib/dom');
    var libPage = require('esui/lib/page').page;
    var libAttribute = require('esui/lib/attribute');

    var exports = {};

    /**
     * 从el起始，根据query查找元素。返回第一个match的。
     * 这个方法会直接依赖浏览器的querySelector方法。
     * 浏览器支持：IE8，FF3.5，Chrome1
     * @param {HTMLElement} el 查找的根元素
     * @param {string} query 符合CSS 2.1的查询串
     * @return {HTMLElement} 第一个match的元素
     */
    exports.find = function (el, query) {
        return el.querySelector(query);
    };

    /**
     * 从el起始，根据query查找元素。返回所有match的。
     * 这个方法会直接依赖浏览器的querySelectorAll方法。
     * 浏览器支持：IE8，FF3.5，Chrome1
     * @param {HTMLElement} el 查找的根元素
     * @param {string} query 符合CSS 2.1的查询串
     * @return {NodeList} 第一个match的元素
     */
    exports.findAll = function (el, query) {
        return el.querySelectorAll(query);
    };

    /**
     * 判断el是否match给定的query。
     * 这个方法会直接依赖浏览器的*matchSelector方法。
     * 浏览器支持：IE9，FF3.6，IE9
     * @param  {HTMLElement} el 查找的根元素
     * @param {string} query 符合CSS 2.1的查询串
     * @return {boolean} 是否match
     */
    exports.match = function (el, query) {
        var matches = // 兼容各个浏览器。额。。
            // w3c标准
            el.matches
            // Chrome, Opera 15+, Safari
            || el.webkitMatchesSelector
            // Mozilla
            || el.mozMatchesSelector
            // IE9+
            || el.msMatchesSelector
            // Opera
            || el.oMatchesSelector;

        return matches.call(el, query);
    };

    /**
     * 从el开始查找直到找到符合query的父元素。或直到endEl，或直到body为止。
     * 若query没提供，则直接返回endEl，或body。
     * 若没有找到匹配的，则返回null。
     * @param {HTMLElement} el 起始el
     * @param {string} query 符合CSS 2.1的查询串
     * @param {HTMLElement} endEl 查询截止的element
     * @return {HTMLElement} 符合query的父元素
     */
    exports.parent = function (el, query, endEl) {
        endEl = endEl || document.body;
        if (typeof query === 'undefined' || query.length === 0) {
            // 没给query，直接退出
            return endEl;
        }
        var cur = el;
        while (cur && cur !== endEl) {
            if (cur.nodeType === 1) {
                if (exports.match(cur, query)) {
                    return cur;
                }
            }
            cur = cur.parentNode;
        }
        return null;
    };

    /**
     * 拿取元素包括margin的高度
     * @param {HTMLElement} elm 元素
     * @return {number} 高度值
     */
    exports.getOuterHeight = function (elm) {
        var elmHeight;
        var elmMargin;

        elmHeight = elm.offsetHeight;

        if (document.all) {
            // IE
            elmMargin = parseInt(elm.currentStyle.marginTop, 10)
                + parseInt(elm.currentStyle.marginBottom, 10);
        }
        else {
            // Mozilla
            var cs = document.defaultView.getComputedStyle(elm, '');
            elmMargin = parseInt(cs.getPropertyValue('margin-top'), 10)
                + parseInt(cs.getPropertyValue('margin-bottom'), 10);
        }
        return (elmHeight + elmMargin);
    };

    /**
     * 拿取元素包括margin的宽度
     * @param {HTMLElement} elm 元素
     * @return {number} 高度值
     */
    exports.getOuterWidth = function (elm) {
        var elmWidth;
        var elmMargin;

        elmWidth = elm.offsetWidth;
        if (document.all) {
            // IE
            elmMargin = parseInt(elm.currentStyle.marginLeft, 10)
                + parseInt(elm.currentStyle.marginRight, 10);
        }
        else {
            // Mozilla
            var cs = document.defaultView.getComputedStyle(elm, '');
            elmMargin = parseInt(cs.getPropertyValue('margin-left'), 10)
                + parseInt(cs.getPropertyValue('margin-right'), 10);
        }
        return (elmWidth + elmMargin);
    };

    /**
     * 量取元素的宽度
     * @param  {HTMLElement} el 被量的元素
     * @return {number} 长度值
     */
    exports.measureWidth = function (el) {
        var rulerDiv = document.createElement('div');
        el.appendChild(rulerDiv);
        var width = rulerDiv.offsetWidth;
        rulerDiv.parentNode.removeChild(rulerDiv);

        return width;
    };

    /**
     * 描述停靠的位置。图示如下。
     * 一个九宫格，中间的格子是作为锚的anchor元素。横竖4条线的4个交点，每一侧
     * 都是一个可停靠位置。共16个。其中4，7，10，13这4种anchor会遮住锚元素。
     * 如下枚举中常量的命名，描述了停靠元素和锚元素的
     * 边线或边线延长线重合的情况。
     * <停靠元素边>_<锚元素边>_<停靠元素边>_<锚元素边>
     * 以停靠元素边上右下左的顺序。
     * 如RIGHT_LEFT_BOTTOM_TOP描述停靠点1。
     *    |     |
     *   1|2   5|6
     * ---+-----+---
     *   3|4   7|8
     *    |     |
     *   9|10 13|14
     * ---+-----+---
     *  11|12 15|16
     *    |     |
     * @enum {number} dom~DockPosition
     */
    exports.DockPosition = {
        RIGHT_LEFT_BOTTOM_TOP: 1,
        BOTTOM_TOP_LEFT_LEFT: 2,
        TOP_TOP_RIGHT_LEFT: 3,
        TOP_TOP_LEFT_LEFT: 4,
        RIGHT_RIGHT_BOTTOM_TOP: 5,
        BOTTOM_TOP_LEFT_RIGHT: 6,
        TOP_TOP_RIGHT_RIGHT: 7,
        TOP_TOP_LEFT_RIGHT: 8,
        RIGHT_LEFT_BOTTOM_BOTTOM: 9,
        BOTTOM_BOTTOM_LEFT_LEFT: 10,
        TOP_BOTTOM_RIGHT_LEFT: 11,
        TOP_BOTTOM_LEFT_LEFT: 12,
        RIGHT_RIGHT_BOTTOM_BOTTOM: 13,
        BOTTOM_BOTTOM_LEFT_RIGHT: 14,
        TOP_BOTTOM_RIGHT_RIGHT: 15,
        TOP_BOTTOM_LEFT_RIGHT: 16
    };

    /**
     * 当空间不够时，默认的翻转策略。
     * key为原位置，value为数组，分别排列：
     * 1，当水平空间不够时的翻转位置
     * 2，当垂直空间不够时的翻转位置
     * 3，当水平、垂直空间都不够时的翻转位置
     * 至少保证位置2和12的翻转符合目前Layer的定义。其他的暂时拍的。
     * 目前的策略是，
     * 水平：
     * 1，3，9，11翻到6，8，14，16
     * 2，4，10，12翻到5，7，13，15
     * 反过来同理
     * 垂直：
     * 1，2，5，6翻到11，12，15，16
     * 3，4，7，8翻到9，10，13，14
     * 反过来同理。
     * 对边（水平+垂直）
     * 1，2，5，6翻到16，15，12，11
     * 3，4，7，8翻到14，13，10，9
     * 反过来同理
     * @type {Object}
     */
    exports.defaultFlipStrategy = {
        1: [6, 11, 16],
        2: [5, 12, 15],
        3: [8, 9, 14],
        4: [7, 10, 13],
        5: [2, 15, 12],
        6: [1, 16, 11],
        7: [4, 13, 10],
        8: [3, 14, 9],
        9: [14, 3, 8],
        10: [13, 4, 7],
        11: [16, 1, 6],
        12: [15, 2, 5],
        13: [10, 7, 4],
        14: [9, 8, 3],
        15: [12, 5, 2],
        16: [11, 6, 1]
    };

    /**
     * 综合所有位置、尺寸信息，尝试翻转（或不翻转）position。
     * @param {number} width 要放置的元素宽度
     * @param {number} height 要放置的元素高度
     * @param {number} hSpace 水平可用空间
     * @param {number} vSpace 垂直可用空间
     * @param {number} position 想要的定位位置
     * @param {Array<number>} strategy 翻转策略
     * @return {number} 翻转后的定位位置，或者若没有翻转，则返回position
     */
    function flip (width, height, hSpace, vSpace, position, strategy) {
        if (hSpace < width && vSpace < height) {
            return strategy[2];
        }
        if (vSpace < height) {
            return strategy[1];
        }
        if (hSpace < width) {
            return strategy[0];
        }
        return position;
    }


    /**
     * 将el停靠在anchor元素旁。
     * 代码参考ESUI 3.1.0-beta.3的Layer和TipLayer
     * @param {HTMLElement} anchor 作为锚的元素
     * @param {HTMLElement} el 将要停靠的元素
     * @param {dom~DockPosition} position 方位描述值
     * @param {Object} options 选项
     * @param {Object} options.flipStrategy 当空间不够时，el的翻转策略
     *     默认为defaultFlipStrategy
     * @param {boolean} options.detectSpace 是否判断水平和垂直的空间，当
     *     不足时翻转el。默认为true
     */
    exports.dock = function (anchor, el, position, options) {
        options = u.extend({}, {
            flipStrategy: exports.defaultFlipStrategy,
            detectSpace: true
        }, options);

        // 获取锚元素的属性
        var anchorOffset = libDom.getOffset(anchor);

        // 浮层的存在会影响页面高度计算，必须先让它消失，
        // 但在消失前，又必须先计算到浮层的正确高度
        var previousDisplayValue = el.style.display;
        el.style.display = 'block';
        var elementHeight = exports.getOuterHeight(el);
        var elementWidth = exports.getOuterWidth(el);
        el.style.display = 'none';

        if (options.detectSpace) {
            // 准备好翻转策略
            var strategy = options.flipStrategy[position];
            // 计算页面水平和垂直的空间，空间有包含了锚元素的空间和
            // 不包含锚元素的空间两类
            var pageScrollTop = libPage.getScrollTop();
            var pageScrollLeft = libPage.getScrollLeft();

            var viewWidth = libPage.getViewWidth();
            var viewHeight = libPage.getViewHeight();

            var topSpaceWithAnchor = anchorOffset.bottom - pageScrollTop;
            var topSpace = anchorOffset.top - pageScrollTop;
            var bottomSpace = viewHeight - topSpaceWithAnchor;
            var bottomSpaceWithAnchor = viewHeight - topSpace;

            var leftSpace = anchorOffset.left - pageScrollLeft;
            var leftSpaceWithAnchor = anchorOffset.right - pageScrollLeft;
            var rightSpace = viewWidth - leftSpaceWithAnchor;
            var rightSpaceWithAnchor = viewWidth - leftSpace;

            switch (position) {
                case 1:
                    position = flip(elementWidth, elementHeight,
                        leftSpace, topSpace, position, strategy);
                    break;
                case 2:
                    position = flip(elementWidth, elementHeight,
                        rightSpaceWithAnchor, topSpace, position, strategy);
                    break;
                case 3:
                    position = flip(elementWidth, elementHeight,
                        leftSpace, bottomSpaceWithAnchor, position, strategy);
                    break;
                case 4:
                    position = flip(elementWidth, elementHeight,
                        rightSpaceWithAnchor, bottomSpaceWithAnchor,
                        position, strategy);
                    break;
                case 5:
                    position = flip(elementWidth, elementHeight,
                        leftSpaceWithAnchor, topSpace, position, strategy);
                    break;
                case 6:
                    position = flip(elementWidth, elementHeight,
                        rightSpace, topSpace, position, strategy);
                    break;
                case 7:
                    position = flip(elementWidth, elementHeight,
                        leftSpaceWithAnchor, bottomSpaceWithAnchor,
                        position, strategy);
                    break;
                case 8:
                    position = flip(elementWidth, elementHeight,
                        rightSpace, bottomSpaceWithAnchor, position, strategy);
                    break;
                case 9:
                    position = flip(elementWidth, elementHeight,
                        leftSpace, topSpaceWithAnchor, position, strategy);
                    break;
                case 10:
                    position = flip(elementWidth, elementHeight,
                        rightSpaceWithAnchor, topSpaceWithAnchor,
                        position, strategy);
                    break;
                case 11:
                    position = flip(elementWidth, elementHeight,
                        leftSpace, bottomSpace, position, strategy);
                    break;
                case 12:
                    position = flip(elementWidth, elementHeight,
                        rightSpaceWithAnchor, bottomSpace, position, strategy);
                    break;
                case 13:
                    position = flip(elementWidth, elementHeight,
                        leftSpaceWithAnchor, topSpaceWithAnchor,
                        position, strategy);
                    break;
                case 14:
                    position = flip(elementWidth, elementHeight,
                        rightSpace, topSpaceWithAnchor, position, strategy);
                    break;
                case 15:
                    position = flip(elementWidth, elementHeight,
                        leftSpaceWithAnchor, bottomSpace, position, strategy);
                    break;
                case 16:
                    position = flip(elementWidth, elementHeight,
                        rightSpace, bottomSpace, position, strategy);
                    break;
                default:
                    break;
            }
        }

        // 根据position定位
        el.style.top = '';
        el.style.right = '';
        el.style.bottom = '';
        el.style.left = '';

        switch (position) {
            case 1:
                el.style.top = (anchorOffset.top - elementHeight) + 'px';
                el.style.left = (anchorOffset.left - elementWidth) + 'px';
                break;
            case 2:
                el.style.top = (anchorOffset.top - elementHeight) + 'px';
                el.style.left = anchorOffset.left + 'px';
                break;
            case 3:
                el.style.top = anchorOffset.top + 'px';
                el.style.left = (anchorOffset.left - elementWidth) + 'px';
                break;
            case 4:
                el.style.top = anchorOffset.top + 'px';
                el.style.left = anchorOffset.left + 'px';
                break;
            case 5:
                el.style.top = (anchorOffset.top - elementHeight) + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width
                    - elementWidth) + 'px';
                break;
            case 6:
                el.style.top = (anchorOffset.top - elementHeight) + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width) + 'px';
                break;
            case 7:
                el.style.top = anchorOffset.top + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width
                    - elementWidth) + 'px';
                break;
            case 8:
                el.style.top = anchorOffset.top + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width) + 'px';
                break;
            case 9:
                el.style.top = (anchorOffset.top + anchorOffset.height
                    - elementHeight) + 'px';
                el.style.left = (anchorOffset.left - elementWidth) + 'px';
                break;
            case 10:
                el.style.top = (anchorOffset.top + anchorOffset.height
                    - elementHeight) + 'px';
                el.style.left = anchorOffset.left + 'px';
                break;
            case 11:
                el.style.top = (anchorOffset.top + anchorOffset.height) + 'px';
                el.style.left = (anchorOffset.left - elementWidth) + 'px';
                break;
            case 12:
                el.style.top = (anchorOffset.top + anchorOffset.height) + 'px';
                el.style.left = anchorOffset.left + 'px';
                break;
            case 13:
                el.style.top = (anchorOffset.top + anchorOffset.height
                    - elementHeight) + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width
                    - elementWidth) + 'px';
                break;
            case 14:
                el.style.top = (anchorOffset.top + anchorOffset.height
                    - elementHeight) + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width) + 'px';
                break;
            case 15:
                el.style.top = (anchorOffset.top + anchorOffset.height) + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width
                    - elementWidth) + 'px';
                break;
            case 16:
                el.style.top = (anchorOffset.top + anchorOffset.height) + 'px';
                el.style.left = (anchorOffset.left + anchorOffset.width) + 'px';
                break;
            default:
                break;
        }
        el.style.display = previousDisplayValue;
    };

    /**
     * 动画任务id保存key
     */
    var ANIMATE_TASK_ID_KEY = 'esui-animate-ids';

    /**
     * 动画 TODO(yuanfeixiang) 现只支持单位为px的
     * @param {HTMLElement} el 元素
     * @param {Object} styles 目标值
     * @param {number} duration 用时
     * @param {Function} callback 回调函数
     * @return {number} 动画id
     */
    exports.animate = function (el, styles, duration, callback) {
        var initedStyles = {};
        for (var k in styles) {
            if (!styles.hasOwnProperty(k)) {
                continue;
            }
            initedStyles[k] =
                +libDom.getComputedStyle(el, k).replace(/px/, '');
            styles[k] = +styles[k].toString().replace(/px/, '');
        }
        function setStyles(factor) {
            for (var k in styles) {
                if (!styles.hasOwnProperty(k)) {
                    continue;
                }
                el.style[k] = initedStyles[k]
                    + (styles[k] - initedStyles[k]) * factor + 'px';
            }
        }
        // 变换函数
        function transformFun(factor) {
            return factor;
        }
        var startTime = +new Date();
        var intervalId = setInterval(function () {
            var passed = +new Date() - startTime;
            if (passed >= duration) {
                exports.stop(el, intervalId);
                setStyles(1);
                callback && callback.apply(el);
            }
            else {
                setStyles(transformFun(passed / duration));
            }
        }, 13);
        var animateAttr =
            libAttribute.getAttribute(el, ANIMATE_TASK_ID_KEY) || '';
        var animateIds = u.map(
            animateAttr ? animateAttr.split(',') : [],
            function (item) {
                return +item;
            }
        );
        animateIds.push(intervalId);
        libAttribute
            .setAttribute(el, ANIMATE_TASK_ID_KEY, animateIds.join(','));
        return intervalId;
    };

    /**
     * 停止动画
     * @param {HTMLElement} el 元素
     * @param {?number} id 动画id
     */
    exports.stop = function (el, id) {
        var animateAttr =
            libAttribute.getAttribute(el, ANIMATE_TASK_ID_KEY) || '';
        var animateIds = u.map(
            animateAttr ? animateAttr.split(',') : [],
            function (item) {
                return +item;
            }
        );
        function clearId(id) {
            clearInterval(id);
            var idx = u.indexOf(animateIds, id);
            if (idx !== -1) {
                animateIds.splice(idx - 1, 1);
            }
        }
        if (id) {
            clearId(id);
        }
        else {
            for (var i in animateIds) {
                if (animateIds.hasOwnProperty(i)) {
                    clearId(animateIds[i]);
                }
            }
        }
        libAttribute
            .setAttribute(el, ANIMATE_TASK_ID_KEY, animateIds.join(','));
    };

    return exports;
});
