/**
 * @file fcui extension - RangeCalendar - 凤巢定制版
 * @author Wang Yi(wangyi25@baidu.com)
 * @date Wed Jun 04 2014
 */

define(function (require) {
    var fcui = require('../main');
    var u = require('underscore');
    var moment = require('moment');
    var lib = require('../lib');
    var helper = require('../controlHelper');
    var RangeCalendar = require('../FcRangeCalendar');
    var Extension = require('../Extension');

    /**
     * 目前可以支持的全部快捷日历选项
     *
     * @const
     * @type {Array}
     */
    var SHORT_CUT = [
        '昨天', '过去7天', '上周',
        '本月', '上个月', '上个季度',
        '今天', '前天', '过去14天', '过去30天'
    ];

    /**
     * 快捷日期与对应的索引值
     *
     * @const
     * @type {Object}
     */
    var DATE = {
        /**
         * 昨天
         *
         * @const
         * @type {number}
         */
        YESTERDAY: 0,
        /**
         * 过去7天
         *
         * @const
         * @type {number}
         */
        LAST_SEVEN_DAYS: 1,
        /**
         * 上周
         *
         * @const
         * @type {number}
         */
        LAST_WEEK: 2,
        /**
         * 本月
         *
         * @const
         * @type {number}
         */
        THIS_MONTH: 3,
        /**
         * 上个月
         *
         * @const
         * @type {number}
         */
        LAST_MONTH: 4,
        /**
         * 上个季度
         *
         * @const
         * @type {number}
         */
        LAST_QUARTER: 5,
        /**
         * 今天
         *
         * @const
         * @type {number}
         */
        TODAY: 6,
        /**
         * 前天
         *
         * @const
         * @type {number}
         */
        DAY_BEFORE_YESTERDAY: 7,
        /**
         * 过去14天
         *
         * @const
         * @type {number}
         */
        LAST_FOURTEEN_DAYS: 8,
        /**
         * 过去30天
         *
         * @const
         * @type {number}
         */
        LAST_THIRTY_DAYS: 9
    };

    /**
     * 提示信息配置项
     *
     * @const
     * @type {Object}
     */
    var WARNING_MSG = {
        /**
         * 时间跨度限制提示信息
         *
         * @const
         * @type {string}
         */
        EXCEED_TIME_SPAN: '时间选择跨度不能超过一年'
    };

    /**
     * 将快捷日历项索引转为名称序列
     *
     * @param {string} miniOption 快捷日历项索引，以','分隔
     * @return {Array} 快捷日历项名称序列
     */
    function formatShortCut(miniOption) {
        var index = miniOption.split(',');
        var shortCut = [];
        u.each(index, function (value, i) {
            shortCut.push(SHORT_CUT[+value]);
        });
        return shortCut.join(',');
    }

    /**
     * 合并快捷日历配置项信息
     *
     * @param {Array} baseItems 基础项信息
     * @param {Array} extraItems 扩展项信息
     * [
     *     {
     *         name: {string} 快捷日历项名称
     *         value: {number} 快捷日历项索引
     *         getValue: {Function} 时间范围获取函数
     *     }
     * ]
     */
    function mergeShortCurItems(baseItems, extraItems) {
        var itemsMap = {};
        u.each(baseItems, function (item, i) {
            itemsMap[item.value] = i;
        });
        u.each(extraItems, function (item, i) {
            if (!itemsMap[item.value]) {
                // 基础项中没有的则追加
                baseItems.push(item);
                itemsMap[item.value] = baseItems.length - 1;
            }
            else {
                // 基础项中有的则替换
                baseItems[item.value] = item;
            }
        });
    }

    /**
     * 获取日期范围的文本
     *
     * @param {Object} calendar RangeCalendar控件
     * @return {string} 日期范围文本
     */
    function getDateValueText(calendar) {
        var value = calendar.getRawValue();
        var begin = value.begin;
        var end = value.end;
        var format = calendar.dateFormat;
        var formatter = lib.date.format;
        if (begin && end) {
            var beginDate = formatter(begin, format);
            var endDate = formatter(end, format);
            if (beginDate === endDate) {
                // 开始和结束日期相同则只显示一个
                return beginDate;
            }
            return beginDate + ' 至 ' + endDate;
        }
        else if (!end) {
            return formatter(begin, format) + ' 起 ';
        }
        return '';
    }

    /**
     * 获取日历框要显示的文本
     *
     * @param {Object} calendar RangeCalendar控件
     * @return {string} 要显示的文本
     */
    function getValueText(calendar) {
        var shortCutItems = calendar.shortCutItems;
        var shownShortCut = calendar.shownShortCut.split(',');
        if (!calendar.curMiniName
            && calendar.miniMode !== null
            && calendar.miniMode >= 0
            && calendar.miniMode < shortCutItems.length) {
            calendar.curMiniName = shortCutItems[calendar.miniMode].name;
        }
        if (calendar.curMiniName
            && u.indexOf(shownShortCut, calendar.curMiniName) !== -1) {
            // 显示对应的快捷日历项
            return calendar.curMiniName;
        }
        return getDateValueText(calendar);
    }

    /**
     * 修改日历框中的显示文本
     *
     * @param {Object} calendar RangeCalendar控件
     */
    function modifyMainText(calendar) {
        var textId = helper.getId(calendar, 'text');
        var dateText = getValueText(calendar);
        if (lib.g(textId)) {
            lib.g(textId).innerHTML = dateText;
        }
    }

    /**
     * 修改快捷日历
     *
     * @param {Object} calendar RangeCalendar控件
     */
    function modifyMiniCalendarHtml(calendar) {
        var tplItem = ''
            + '<span data-index="${shortIndex}" class="${shortClass}"'
            + ' id="${shortId}">${shortName}</span>';
        var shownShortCut = calendar.shownShortCut.split(',');
        var shortItems = calendar.shortCutItems;
        var itemSelectedClass = helper.getPartClasses(
            calendar, 'shortcut-item-selected'
        );
        var itemDisabledClass = helper.getPartClasses(
            calendar, 'shortcut-item-disabled'
        );
        var html = [];
        u.each(shownShortCut, function (shortCut, i) {
            var shortCutIndex = u.indexOf(SHORT_CUT, shortCut);
            var shortItem = shortItems[shortCutIndex];
            var shortName = shortItem.name;
            var shortClasses = helper.getPartClasses(
                calendar, 'shortcut-item'
            );
            if (i === 0) {
                shortClasses = shortClasses.concat(
                    helper.getPartClasses(
                        calendar, 'shortcut-item-first'
                    )
                );
            }
            var shortId = helper.getId(
                calendar, 'shortcut-item' + shortCutIndex
            );
            // 设置默认的选中项
            // var selected = lib.hasClass(shortId, itemSelectedClass);
            if (calendar.miniMode === shortCutIndex) {
                shortClasses = shortClasses.concat(itemSelectedClass);
            }
            var disabled = lib.hasClass(shortId, itemDisabledClass);
            if (disabled) {
                shortClasses = shortClasses.concat(itemDisabledClass);
            }
            html.push(
                lib.format(
                    tplItem,
                    {
                        shortIndex: shortCutIndex,
                        shortClass: shortClasses.join(' '),
                        shortId: shortId,
                        shortName: shortName
                    }
                )
            );
        });
        var shortCutId = helper.getId(calendar, 'shortcut');
        lib.g(shortCutId).innerHTML = html.join('');
    }

    /**
     * 更新日历上显示的日期文本
     *
     * @param {Object} calendar RangeCalendar控件
     * @param {Object} monthView MonthView控件
     * @param {string} type 日历类型，begin | end
     */
    function updateTitleDate(calendar, monthView, type) {
        var date = monthView.getRawValue();
        var format = 'YYYY年MM月DD日';
        var formatter = lib.date.format;
        var text = formatter(date, format);
        var textSpanId = helper.getId(calendar, type + '-date-text');
        var dom = lib.g(textSpanId);
        dom.innerHTML = text;
    }

    /**
     * 为日历绑定日期文本更新的事件处理函数
     *
     * @param {Object} calendar RangeCalendar控件
     */
    function bindUpdateTitleHandler(calendar) {
        var calendarType = ['begin', 'end'];
        var shortCutId = helper.getId(calendar, 'shortcut');
        var shortCut = lib.g(shortCutId);
        var calendarBody = lib.dom.next(shortCut);
        var subCalendars = lib.getChildren(calendarBody);
        u.each(calendarType, function (type, i) {
            var dateLabel = lib.dom.first(subCalendars[i]);
            var dateTextNode = lib.dom.first(dateLabel);
            var splitSpan = document.createElement('span');
            splitSpan.innerHTML = ' : ';
            var textSpan = document.createElement('span');
            textSpan.id = helper.getId(calendar, type + '-date-text');
            dateTextNode.appendChild(splitSpan);
            dateTextNode.appendChild(textSpan);
            var monthView = calendar.getChild(type + 'Cal');
            updateTitleDate(calendar, monthView, type);
            monthView.on(
                'change',
                lib.bind(updateTitleDate, null, calendar, monthView, type)
            );
        });
    }

    /**
     * 在用户点击快捷日历以后，自动触发确定按钮事件。
     * 此方法必须在layer已经被创建后调用
     *
     * @param {Object} calendar RangeCalendar控件
     */
    function bindShortcutSubmit(calendar) {
        if (calendar.layer) {
            var shortcutDom = lib.g(helper.getId(calendar, 'shortcut'));
            // 给快捷日历的click队列添加一个事件。以实现在设置好快捷日期后，直接触发确定事件
            helper.addDOMEvent(calendar, shortcutDom, 'click', function (e) {
                // 以下验证逻辑必须跟RangeCalendar的shortcutClick方法中保持一致。
                // 以确保只在真正点击了快捷日历选项时才触发确定。
                if (calendar.isEndless) {
                    return;
                }
                var tar = e.target || e.srcElement;
                var classes = helper.getPartClasses(calendar, 'shortcut-item');
                var disableClasses = helper.getPartClasses(calendar, 'shortcut-item-disabled');
                while (tar && tar !== document.body) {
                    if (lib.hasClass(tar, classes[0]) && !lib.hasClass(tar, disableClasses[0])) {
                        // 触发确认按钮的点击事件
                        calendar.getChild('okBtn').fire('click');
                        return;
                    }
                    tar = tar.parentNode;
                }
            });
        }
    }

    /**
     * 点击展开日历的事件处理函数
     *
     * @param {Event} e 点击事件
     */
    function mainClick(e) {
        modifyMiniCalendarHtml(this);
        if (!this.hasLayer) {
            bindUpdateTitleHandler(this);
            addWarningMessage(this);
            if (this.isShortcutSubmit) {
                bindShortcutSubmit(this);
            }
            this.hasLayer = true;
        }
        initAfterLayerRender(this);
    }

    /**
     * afterrender事件处理函数
     *
     * @param {Event} event afterrender事件
     */
    function afterRenderHandler(event) {
        var target = event.target;
        modifyMainText(target);
        helper.addDOMEvent(target, target.main, 'mousedown', mainClick);
    }

    /**
     * 判断选择的时间范围是否超过限制
     *
     * @param {Object} value 选择的时间范围对象
     * @param {Date} value.begin 起始时间
     * @param {Date} value.end 结束时间
     * @return {boolean} 是否超过时间跨度限制
     */
    function isExceedTimeSpan(value) {
        var begin = value.begin;
        var end = value.end;
        var startDate = moment(
            [begin.getFullYear(), begin.getMonth(), begin.getDate()]
        );
        var endDate = moment(
            [end.getFullYear(), end.getMonth(), end.getDate()]
        );
        var daySpan = 365;
        return endDate.diff(startDate, 'days') + 1 > daySpan;
    }

    /**
     * 添加时间跨度提示信息
     *
     * @param {Object} calendar RangeCalendar控件
     */
    function addWarningMessage(calendar) {
        var warningMsg = document.createElement('div');
        warningMsg.id = helper.getId(calendar, 'warning-message');
        warningMsg.innerHTML = WARNING_MSG.EXCEED_TIME_SPAN;
        warningMsg.className = 'skin-ui-fc-rangecalendar-warning-message';
        var layer = lib.g(helper.getId(calendar, 'layer'));
        var layerChildren = lib.getChildren(layer);
        var footClasses = helper.getPartClasses(calendar, 'foot');
        var foot = u.find(layerChildren, function (child) {
            return lib.hasClass(child, footClasses[0]);
        });
        foot.appendChild(warningMsg);
    }

    /**
     * beforechange事件处理函数
     *
     * @param {Event} event beforechange事件
     */
    function beforeChangeHandler(event) {
        var target = event.target;
        var value = event.value;
        var warningMsgId = helper.getId(target, 'warning-message');
        var warningMsg = lib.g(warningMsgId);
        if (isExceedTimeSpan(value)) {
            event.preventDefault();
            lib.removeClass(warningMsg, 'hide');
        }
        else {
            lib.addClass(warningMsg, 'hide');
        }
    }

    /**
     * 日历浮层渲染完毕后的初始化
     *
     * @param {Object} calendar RangeCalendar控件
     */
    function initAfterLayerRender(calendar) {
        var warningMsgId = helper.getId(calendar, 'warning-message');
        var warningMsg = lib.g(warningMsgId);
        lib.addClass(warningMsg, 'hide');
    }

    /**
     * change事件处理函数
     *
     * @param {Event} event change事件
     */
    function changeHandler(event) {
        var target = event.target;
        modifyMainText(target);
    }

    /**
     * 凤巢定制版时间范围选择日历的扩展
     *
     * @constructor
     * @param {Object} options 扩展选项
     *     @param {boolean} options.hasLayer 日历浮层是否已经存在
     *     @param {string} options.miniMode 默认的快捷日历项索引
     *     @param {string} options.miniOption 可选的快捷日历项索引
     *     @param {string|boolean=} options.isShortcutSubmit 是否点击快捷日历后自动触发确定事件，默认值为true
     * @extends Extension
     */
    function FcRangeCalendar(options) {
        options = options || {};
        u.defaults(options, {
            miniMode: DATE.TODAY,
            miniOption: [
                DATE.TODAY,
                DATE.YESTERDAY,
                DATE.LAST_SEVEN_DAYS,
                DATE.LAST_FOURTEEN_DAYS,
                DATE.LAST_THIRTY_DAYS,
                DATE.LAST_MONTH
            ].join(','),
            // 默认点击快捷日历自动触发确定事件
            isShortcutSubmit: true
        });
        options.hasLayer = false;
        // 修正isShortcutSubmit,兼容字符串设置.
        if (options.isShortcutSubmit === 'false') {
            options.isShortcutSubmit = false;
        }
        Extension.apply(this, arguments);
    }

    /**
     * 指定扩展类型为FcRangeCalendar
     *
     * @type {string}
     */
    FcRangeCalendar.prototype.type = 'FcRangeCalendar';

    /**
     * 快捷日历扩展项信息
     *
     * @type {Array}
     */
    FcRangeCalendar.prototype.extraShortCutItems = [
        {
            name: '过去7天',
            value: 1,
            getValue: function () {
                var now = this.now;
                var begin = new Date(now.getTime());
                var end = new Date(now.getTime());
                end.setDate(end.getDate() - 1);
                begin.setDate(begin.getDate() - 7);
                return {
                    begin: begin,
                    end: end
                };
            }
        },
        {
            name: '今天',
            value: 6,
            getValue: function () {
                var now = this.now;
                return {
                    begin: now,
                    end: now
                };
            }
        },
        {
            name: '前天',
            value: 7,
            getValue: function () {
                var now = this.now;
                var beforeYesterday = new Date(now.getTime());
                beforeYesterday.setDate(beforeYesterday.getDate() - 2);
                return {
                    begin: beforeYesterday,
                    end: beforeYesterday
                };
            }
        },
        {
            name: '过去14天',
            value: 8,
            getValue: function () {
                var now = this.now;
                var begin = new Date(now.getTime());
                var end = new Date(now.getTime());
                end.setDate(end.getDate() - 1);
                begin.setDate(begin.getDate() - 14);
                return {
                    begin: begin,
                    end: end
                };
            }
        },
        {
            name: '过去30天',
            value: 9,
            getValue: function () {
                var now = this.now;
                var begin = new Date(now.getTime());
                var end = new Date(now.getTime());
                end.setDate(end.getDate() - 1);
                begin.setDate(begin.getDate() - 30);
                return {
                    begin: begin,
                    end: end
                };
            }
        }
    ];

    /**
     * 修改RangeCalendar控件的一些默认属性
     *
     * @param {Object} calendar RangeCalendar控件
     */
    FcRangeCalendar.prototype.modifyOptions = function (calendar) {
        calendar.hasLayer = this.hasLayer;
        calendar.shownShortCut = formatShortCut(this.miniOption);
        calendar.isShortcutSubmit = this.isShortcutSubmit;
        var shortCutItems = calendar.shortCutItems;
        mergeShortCurItems(shortCutItems, this.extraShortCutItems);
        if (calendar.miniMode !== null) {
            calendar.miniMode = this.miniMode;
            var shortCut = shortCutItems[calendar.miniMode];
            var defaultValue = shortCut.getValue.call(calendar, calendar.now);
            calendar.rawValue = defaultValue;
            calendar.view = defaultValue;
        }
    };

    /**
     * 激活当前扩展
     *
     * @override
     */
    FcRangeCalendar.prototype.activate = function () {
        var me = this;
        var target = me.target;
        // 只对RangeCalendar控件生效
        if (!(target instanceof RangeCalendar)) {
            return;
        }
        // 修改RangeCalendar控件的一些默认属性
        me.modifyOptions(target);
        // RangeCalendar控件渲染完毕后修改日历框中的文本
        // 并绑定日历浮层点击展开事件处理函数
        target.on('afterrender', afterRenderHandler);
        // 点击'确定'按钮后触发beforechange事件，判断时间跨度是否超过限制
        target.on('beforechange', beforeChangeHandler);
        // 点击'确定'按钮后触发change事件，并修改日历框中的文本
        target.on('change', changeHandler);
        // 重写RangeCalendar的getRawValue方法
        // 若选择的是快捷日历，那么返回值中将包含快捷日历项的索引
        target.getRawValue = function () {
            var value = this.rawValue;
            var miniMode = +this.miniMode;
            var miniOption = me.miniOption.split(',');
            if (miniMode !== -1
                && u.indexOf(miniOption, miniMode + '') !== -1) {
                value = u.extend({miniMode: miniMode}, value);
            }
            return value;
        };

        this._repaint = target.repaint;
        target.repaint = helper.createRepaint(
            this._repaint,
            {
                name: ['rawValue', 'range'],
                paint: function (calendar, rawValue, range) {
                    // 修正，当setRawValue重绘时，当rawValue前后时间相等时，
                    // 只显示一个时间
                    // 这样与afterrender的逻辑是一致的。
                    if (target.helper.isInStage('RENDERED')) {
                        modifyMainText(target);
                    }
                }
            }
        );
        Extension.prototype.activate.apply(me, arguments);
    };

    /**
     * 禁用当前扩展
     *
     * @override
     */
    FcRangeCalendar.prototype.inactivate = function () {
        Extension.prototype.inactivate.apply(this, arguments);
        this.target.repaint = this._repaint;
    };

    lib.inherits(FcRangeCalendar, Extension);
    fcui.registerExtension(FcRangeCalendar);

    return FcRangeCalendar;
});
