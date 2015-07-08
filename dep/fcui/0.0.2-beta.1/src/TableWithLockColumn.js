/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 有锁定列功能的表格控件，未完成
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Table} 表格控件类
 */
define(function (require) {
    var u = require('underscore');
    var eoo = require('eoo');
    var etpl = require('etpl');
    var lib = require('./lib');
    var Control = require('./Control');

    var engine = new etpl.Engine();

    var tableTemplate = require('./text!./TableWithLockColumn.tpl.html');
    engine.compile(tableTemplate);

    var proto = {};

    /**
     * FCUI 有锁定列功能的表格控件构造函数。
     * @param  {Object} options 构建参数
     * @property {etpl/Engine} options.templateEngine
     *         自定义的ETPL engine。如不提供将使用默认的模板引擎。
     * @constructor
     */
    proto.constructor = function (options) {
        this.$super(arguments);

        this.helper.setTemplateEngine(options.templateEngine || engine);
    };

    /**
     * 初始化参数
     *
     * @param {Object} options 构造函数传入的参数
     * @override
     * @protected
     */
    proto.initOptions = function (options) {
        var properties = {};

        this.extendedProperties = u.extend(
            properties, this.defaultProperties, options
        );

        this.setProperties(this.extendedProperties);
    };

    /**
     * 默认属性值。其余属性值参考Table
     *
     * @type {Object}
     * @protected
     */
    proto.defaultProperties = {
        /**
         * 从某一列开始锁定列。给定列的index，从0开始。小于0则没有
         * 锁定列功能。
         * 不可通过setProperties修改
         * @type {number}
         * @default 1
         */
        lockAtColumn: 1,
        /**
         * 锁定列区域的宽度，单位为px。
         * 不可通过setProperties修改
         * @type {number}
         * @default '50%'
         */
        lockedAreaWidth: '50%'
    };

    /**
     * 初始化DOM结构
     *
     * @override
     * @protected
     */
    proto.initStructure = function() {
        this.$super(arguments);
        var id = this.id;

        this.main.innerHTML = this.helper.renderTemplate('table', {
            id: id
        });

        var properties = {};
        var foot = this.extendedProperties.foot;

        properties[id + 'Left'] = u.extend({}, this.extendedProperties, {
            fields: this.extendedProperties.fields.slice(0, this.lockAtColumn),
            isLockedLeft: true,
            width: this.lockedAreaWidth,
            childName: 'left',
            foot: foot ?
                (this.select ?
                    foot.slice(0, this.lockAtColumn + 1)
                    : foot.slice(0, this.lockAtColumn)
                )
                : null
        });

        properties[id + 'Right'] = u.extend({}, this.extendedProperties, {
            fields: this.extendedProperties.fields.slice(this.lockAtColumn),
            isLockedRight: true,
            childName: 'right',
            foot: foot ?
                (this.select ?
                    foot.slice(this.lockAtColumn + 1)
                    : foot.slice(this.lockAtColumn)
                )
                : null
        });

        this.helper.initChildren(this.main, {
            properties: properties
        });

        this.resize();
        this.syncRows();
    };

    /**
     * 初始化与DOM元素、子控件等的事件交互，仅在第一次渲染时调用
     *
     * @protected
     */
    proto.initEvents = function () {
        this.$super(arguments);

        var left = this.getChild('left');
        var right = this.getChild('right');
        this.helper.delegateEventsFromChild(left);
        this.helper.delegateEventsFromChild(right);

        left.on('headchanged', this.syncRows, this);
        left.on('bodychanged', this.syncRows, this);
        left.on('columnswidthchanged', this.syncRows, this);

        right.on('headchanged', this.syncRows, this);
        right.on('bodychanged', this.syncRows, this);
        right.on('columnswidthchanged', this.syncRows, this);

        left.on('rowselected', this.syncRowSelected, this);
        left.on('rowunselected', this.syncRowUnselected, this);
        left.on('rowallselected', this.syncRowSelected, this);
        left.on('rowallunselected', this.syncRowUnselected, this);
    };

    /**
     * 右侧表格标记已选行
     * @param  {Event} e rowselected事件
     */
    proto.syncRowSelected = function (e) {
        var right = this.getChild('right');
        if (e.type === 'rowallselected') {
            right.set('selectedRowIndex', -1);
        }
        else {
            right.selectRow(e.selectedIndex);
        }
    };

    proto.syncRowUnselected = function (e) {
        var right = this.getChild('right');
        if (e.type === 'rowallunselected') {
            right.set('selectedRowIndex', []);
        }
        else {
            right.unselectRow(e.selectedIndex);
        }
    };


    /**
     * 重置表格大小
     */
    proto.resize = function () {
        var rightWidth;
        var lockedAreaWidth = this.lockedAreaWidth;
        if (lockedAreaWidth.indexOf && lockedAreaWidth.indexOf('%') > -1) {
            // 设置了'%'形式的宽度
            rightWidth = (100 - parseInt(lockedAreaWidth, 10)) + '%';
        }
        else {
            rightWidth = (lib.measureWidth(this.main) - lockedAreaWidth) + 'px';
        }
        this.getChild('right').main.style.width = rightWidth;
    };

    /**
     * 同步左右两个子表格所有行的高度
     */
    proto.syncRows = function () {
        var left = this.getChild('left');
        var right = this.getChild('right');
        // 同步head
        syncRow(lib.dom.first(left.getHead()), lib.dom.first(right.getHead()));
        // 同步body
        var ltrs = lib.getChildren(left.getBody());
        var rtrs = lib.getChildren(right.getBody());
        u.each(ltrs, function (tr, index) {
            syncRow(tr, rtrs[index]);
        });
        // 同步foot
        if (this.foot) {
            syncRow(
                lib.dom.first(left.getFoot()),
                lib.dom.first(right.getFoot())
            );
        }
    };

    /**
     * 同步两个TR元素的高度
     * @param  {HTMLElement} tr1 TR元素
     * @param  {HTMLElement} tr2 TR元素
     */
    function syncRow(tr1, tr2) {
        if (tr1.offsetHeight === tr2.offsetHeight) {
            return;
        }
        if (tr1.style.height || tr1.style.height !== 'auto') {
            tr1.style.height = '';
        }

        if (tr2.style.height || tr2.style.height !== 'auto') {
            tr2.style.height = '';
        }

        var h1 = tr1.offsetHeight;
        var h2 = tr2.offsetHeight;

        if (h1 > h2) {
            tr2.style.height = h1 + 'px';
        }
        else if (h1 < h2) {
            tr1.style.height = h2 + 'px';
        }
    }

    /**
     * 事件处理
     * @type {Object}
     */
    proto.eventHandlers = {
        /**
         * 表格行的mouse-over和mouse-out
         */
        'row-hover': {
            eventType: 'mouseover',
            query: '.ui-table-row',
            handler: function (e, el) {
                var index = lib.getAttribute(el, 'data-row');
                var left = this.getChild('left');
                lib.addClasses(left.getRow(index),
                    left.helper.getPartClasses('row-hover'));
                var right = this.getChild('right');
                lib.addClasses(right.getRow(index),
                    right.helper.getPartClasses('row-hover'));
            }
        },
        'row-out': {
            eventType: 'mouseout',
            query: '.ui-table-row',
            handler: function (e, el) {
                var index = lib.getAttribute(el, 'data-row');
                var left = this.getChild('left');
                var right = this.getChild('right');
                var ltr = left.getRow(index);
                var rtr = right.getRow(index);
                if (!lib.match(ltr, ':hover') && !lib.match(rtr, ':hover')) {
                    // 左右两边的row都没有hover的时候，才都去掉左右两边的class
                    lib.removeClasses(ltr,
                        left.helper.getPartClasses('row-hover'));
                    lib.removeClasses(rtr,
                        left.helper.getPartClasses('row-hover'));
                }
            }
        },
        /**
         * 表格尾行的mouse-over和mouse-out
         */
        'foot-row-hover': {
            eventType: 'mouseover',
            query: '.ui-table-foot-row',
            handler: function (e, el) {
                var left = this.getChild('left');
                lib.addClasses(lib.dom.first(left.getFoot()),
                    left.helper.getPartClasses('foot-row-hover'));
                var right = this.getChild('right');
                lib.addClasses(lib.dom.first(right.getFoot()),
                    right.helper.getPartClasses('foot-row-hover'));
            }
        },
        'foot-row-out': {
            eventType: 'mouseout',
            query: '.ui-table-foot-row',
            handler: function (e, el) {
                var left = this.getChild('left');
                var right = this.getChild('right');
                var ltr = lib.dom.first(left.getFoot());
                var rtr = lib.dom.first(right.getFoot());
                if (!lib.match(ltr, ':hover') && !lib.match(rtr, ':hover')) {
                    // 左右两边的row都没有hover的时候，才都去掉左右两边的class
                    lib.removeClasses(ltr,
                        left.helper.getPartClasses('foot-row-hover'));
                    lib.removeClasses(rtr,
                        left.helper.getPartClasses('foot-row-hover'));
                }
            }
        },
        /**
         * 改变大小的事件
         */
        'window-resized': {
            eventType: 'resize',
            el: window,
            enable: function () {
                return false;
            },
            handler: function () {
            }
        },
        /**
         * 锁表头的事件：在window上锁定表头和在表格wrapper内锁定表头
         */
        'main-scroll': {
            eventType: 'scroll',
            enable: function () {
                return this.tableMaxHeight > 0;
            },
            handler: function (e, el) {
                var scrollTop = el.scrollTop;
                var cover = this.getCoverTable();
                cover.style.top = scrollTop + 'px';
            }
        },
        'window-scroll': {
            eventType: 'scroll',
            el: document,
            enable: function () {
                return this.fixHeadAtTop;
            },
            handler: function (e, el) {
                var pageScrollTop = lib.page.getScrollTop();
                var wrapper = this.getCoverTableWrapper();

                if (this.fixTop < pageScrollTop) {
                    if (!this._headFixing) {
                        this._headFixing = true;
                        lib.addClasses(
                            wrapper,
                            this.helper.getStateClasses('cover-table-fixing')
                        );
                        if (this.fixAtDom) {
                            this.fixAtDom.style.position = 'absolute';
                        }
                        wrapper.style.left =
                            lib.getOffset(this.getTable()).left + 'px';
                    }
                    if (this.fixAtDom) {
                        this.fixAtDom.style.top = pageScrollTop + 'px';
                        wrapper.style.top =
                            (pageScrollTop + this.fixHeight) + 'px';
                    }
                    else {
                        wrapper.style.top = pageScrollTop + 'px';
                    }
                }
                else {
                    if (this._headFixing) {
                        this._headFixing = false;
                        lib.removeClasses(
                            wrapper,
                            this.helper.getStateClasses('cover-table-fixing')
                        );
                        if (this.fixAtDom) {
                            this.fixAtDom.style.position = 'inherit';
                        }
                    }
                }
            }
        }
    };

    /**
     * 控件类型
     *
     * @type {string}
     */
    proto.type = 'TableWithLockColumn';

    var Table = eoo.create(Control, proto);
    require('./main').register(Table);

    return Table;
});
