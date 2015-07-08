/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 单数据集抽象类
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 */
 define(function (require) {
    var Control = require('esui/Control');
    var lib = require('esui/lib');
    var helper  = require('esui/controlHelper');
    var EventTarget = require('mini-event/EventTarget');

    /**
     * 一个空方法，用以标记虚方法。
     */
    var noop = function () {};

    /**
     * 默认的参数集。
     */
    var defaultOptions = {
        /**
         * 是否支持drop。可选。
         * @type {string} datSetName
         * @default false
         * @readonly
         */
        enableDrop: false
    };

    /**
     * 单数据集抽象类。
     * 单数据集是指UI上展现一种特定数据结构的组件。多个单数据集通过互相聚集、连接（wire）
     * 来实现数据在多个集合间转换的业务场景。如表格自定义列的选择，物料选择、人群选择等。
     * 单数据集抽象类没有对展现做任何定义。它只定义了单数据集连接（wire）这一行为。
     * 连接（wire）使得单数据集之间可以传递数据的能力，这是单数据集唯一重要的业务功能。
     * 相连接（wire）的两个单数据集，一方删除一个数据项后，这个数据项会自动加入另一方。
     * 连接（wire）是单向的。
     * 为了实现这个业务动作，单数据集也会定义增加数据项（addItems），
     * 删除数据项（removeItems）、全部删除数据项（removeAllItems）三种行为。
     * 为帮助实现连接dataSet的业务场景，子类可以在控件里某个节点上声明一些自定义属性，
     *      'data-ui-dataset-wired'
     *      'data-ui-dataset-wired-event'
     * 'data-ui-dataset-wired'的值为其他数据集的id。表示与这个数据项的这个动作
     * 连接的数据集。
     * data-ui-dataset-wired-event定义何种DOM event触发移动操作。目前可选的值为
     * click 和 drag。如果不声明则为click。如果声明为drag，则这个子节点将自动支持拖动。     
     * @extends Control
     * @constructor
     */
    function AbstractDataSet(options) {
        Control.apply(this, arguments);
        this.options = lib.extend({}, defaultOptions, options);
    };

    lib.inherits(AbstractDataSet, Control);    

    /**
     * 相关的事件名称常量定义
     */
    var EventName = AbstractDataSet.Event = {
        /**
         * 单数据集会fire的事件名字。表示需要添加items到数据集。
         * @type {string}
         * @const
         */
        ITEMS_ADD: 'itemsadd',
        /**
         * 单数据集会fire的事件名字。表示需要从数据集删除items。
         * @type {string}
         * @const
         */
        ITEMS_REMOVE: 'itemsremove',
        /**
         * 单数据集会fire的事件名字。表示需要从数据集删除全部items。
         * @type {string}
         * @const
         */
        ALL_ITEMS_REMOVE: 'allitemsremove',
        /**
         * 单数据集会fire的事件名字。表示已有items添加到数据集。
         * @type {string}
         * @constant
         */
        ITEMS_ADDED: 'itemsadded',
        /**
         * 单数据集会fire的事件名字。表示已有items从数据集删除。
         * @type {string}
         * @constant
         */
        ITEMS_REMOVED: 'itemsremoved'
    };

    /**
     * 做一个custom的event，将参数包裹在data域中。
     */
    function makeEvent(params) {
        return { data: params };
    };

    /**
     * 在数据集控件的子节点上挂上移动数据项需要的DOM event，处理除了'click'类型之外
     * 的event。目前只有drag。
     */
    AbstractDataSet.prototype.attachEvent = function () {
        // 从this.main查找[data-ui-dataset-wired]
        var wiredNodes = this.main.querySelectorAll(
            '[data-ui-dataset-wired-event]'
        );
        var len = wiredNodes.length;
        var me = this;
        for (var i = 0; i < len; i++) {
            var node = wiredNodes[i];
            if (lib.getAttribute(node,
                'data-ui-dataset-wired-attached') === true) {
                // 处理过了
                return;
            }
            var wired = getWiredDataSetByNode(this, node);
            var onEvent = lib.getAttribute(node, 'data-ui-dataset-wired-event');

            switch (onEvent) {
                case 'click':
                    // click在this.main代理掉了，这里不管
                    break;
                case 'drag':
                    // TODO 实现drag
                    break;
                default:
                    break;
            }
            // 处理完了标记一下
            lib.setAttribute(node, 'data-ui-dataset-wired-attached', true);
        }
    };    

    /**
     * 基本的Repaint方法。根据数据集数据项的添加、删除情况，调用子类的方法重绘。
     * 所有传进的change对象name属性规定为'items'。
     * 当参数changesIndex中含有addedItems时，其值的newValue属性为添加了的items数组，
     * 以items数组为参数调用子类repaintAddedItems方法。
     * 当参数changesIndex中含有removedItems时，其值的oldValue属性为删除了的items数组，
     * 以items数组为参数调用子类repaintRemovedItems方法。
     * 若没有提供参数changesIndex，调用子类的repaintAll方法。
     * @param {Array} changes 变更过的属性的集合
     * @param {Object} changesIndex 变更过的属性的索引
     * @protected
     */
    AbstractDataSet.prototype.repaint = helper.createRepaint(
        Control.prototype.repaint,
        function (changes, changesIndex) {
            if (typeof changesIndex === 'undefined') {
                // 没提供changesIndex，直接repaint
                this.repaintAllItems();
            } else {
                var change = changesIndex['addedItems'];
                if (typeof change !== 'undefined') {
                    // 重绘增加数据项
                    var items = change.newValue;
                    this.repaintAddedItems(items);
                }
                change = changesIndex['removedItems'];
                if (typeof change !== 'undefined') {
                    // 重绘删除数据项
                    var items = change.oldValue;
                    this.repaintRemovedItems(items);
                }
            }
        },
        // trick: 最后挂一个function这样每次repaint之后能刷一下子节点挂事件
        AbstractDataSet.prototype.attachEvent
    );

    /**
     * 借用mini-event的EventTarget实现一个deferred。
     * 它的callback方法会固定fire一个'callback'事件，将callback的参数放到事件的
     * data属性中。
     * 它的addCallback方法会on 'callback'事件。
     * @extends EventTarget
     * @constructor
     */
    function Deferred() {
        EventTarget.apply(this, arguments);
    }

    lib.inherits(Deferred, EventTarget);    

    /**
     * @param {Object=} opt_options
     */
    Deferred.prototype.callback = function (opt_options) {
        if (typeof opt_options === 'undefined') {
            this.fire('callback');
        } else {
            this.fire('callback', makeEvent(opt_options));
        }
    }

    /**
     * @param {Function} cb
     */
    Deferred.prototype.addCallback = function (cb) {
        this.on('callback', cb);
    }

    /**
     * 为itemsremove和allitemsremove构造deferred。子类可以扩展这个方法来给remove的
     * deferred挂更多callback。
     * @param {AbstractDataSet} context
     * @param {AbstractDataSet=} opt_moveToDataSet
     * @protected
     * @return {Deferred}
     */
    AbstractDataSet.prototype.makeAddDeferred = function () {
        var me = this;
        var deferred = new Deferred();
        deferred.addCallback(function (event) {
            var items = event.data.items;
            // 按照control repaint change的规则构造一个change对象。
            // newValue为添加了的items
            var change = {
                name: 'items',
                newValue: items
            };
            me.repaint(change, {
                addedItems: change
            });

            me.fire('itemsadded');
        });
        return deferred;
    };

    /**
     * 增加一个item。
     * @fires itemsadd
     * @param {*} item
     */
    AbstractDataSet.prototype.addItem = function (item) {
        this.addItems([item]);
    };

    /**
     * 增加一组item。
     * @fires itemsadd
     * @param {Array} items
     */
    AbstractDataSet.prototype.addItems = function (items) {
        /**
         * 发出事件表明有item需要添加。
         * @event itemsadd
         *      data: {
         *          items: 将要添加的item(s)。 
         *          deferred: 一个deferred。事件接收者必须callback
         *              这个deferred表示添加数据项处理完成。
         *              callback参数必须为添加完成的items。
         *      }
         */
        this.fire(EventName.ITEMS_ADD, makeEvent({
            items: items,
            deferred: this.makeAddDeferred()
        }));
    };

    /**
     * 为itemsremove和allitemsremove构造deferred。子类可以扩展这个方法来给remove的
     * deferred挂更多callback。
     * @param {abstractDataSet} context
     * @param {AbstractDataSet=} opt_moveToDataSet
     * @protected
     * @return {Deferred}
     */
    AbstractDataSet.prototype.makeRemoveDeferred =
        function (opt_moveToDataSet) {
        var me = this;
        var deferred = new Deferred();
        deferred.addCallback(function (event) {
            var items = event.data.items;
            // 按照control repaint change的规则构造一个change对象。
            // oldValue为删除了的items
            var change = {
                name: 'items',
                oldValue: items
            };
            me.repaint(change, {
                removedItems: change
            });

            me.fire('itemsremoved');
        });

        if (typeof opt_moveToDataSet !== 'undefined') {
            deferred.addCallback(function (event) {
                opt_moveToDataSet.addItems(event.data.items);
            });
        }

        return deferred;
    }

    /**
     * 删除一个item
     * @fires itemsremove
     * @param {object} item
     * @param {AbstractDataSet=} opt_moveToDataSet
     */
    AbstractDataSet.prototype.removeItem = function (item, opt_moveToDataSet) {
        this.removeItems([item], opt_moveToDataSet);
    };

    /**
     * 删除一组items
     * @fires itemsremove
     * @param {array} items
     * @param {AbstractDataSet=} opt_moveToDataSet
     */
    AbstractDataSet.prototype.removeItems =
        function (items, opt_moveToDataSet) {
        var deferred = this.makeRemoveDeferred(opt_moveToDataSet);

        /**
         * 发出事件表明有item需要删除。
         * @event itemsremove
         * @type object
         *      data: {
         *          items: 将要删除的item(s)。 
         *          deferred: 一个deferred。事件接收者必须callback
         *              这个deferred表示删除数据项处理完成。
         *              callback参数必须为删除了的items。
         *      }
         */
        this.fire(EventName.ITEMS_REMOVE, makeEvent({
            items: items,
            deferred: deferred
        }));
    };

    /**
     * 删除所有items。
     * @fires allitemsremove
     * @param {AbstractDataSet=} opt_moveToDataSet
     */
    AbstractDataSet.prototype.removeAllItems = function (opt_moveToDataSet) {
        var deferred = this.makeRemoveDeferred(opt_moveToDataSet);
      
        /**
         * 发出事件表明所有item都需要删除。
         * @event allitemsremove
         * @type object
         *      data: {
         *          items: 将要删除的item(s)。 
         *          deferred: 一个deferred。事件接收者必须callback
         *              这个deferred表示删除数据项处理完成。
         *              callback参数必须为删除了的items。
         *      }
         */
        this.fire(EventName.ALL_ITEMS_REMOVE, makeEvent({
            deferred: deferred
        }));
    };

    /**
     * 根据子节点和子节点上的属性，拿取与这个子节点关联的数据集。
     * @param {AbstractDataSet} context
     * @param {HTMLElement} node
     */
    function getWiredDataSetByNode(context, node) {
        var wiredId = lib.getAttribute(node, 'data-ui-dataset-wired');
        if (!wiredId) {
            return;
        }
        var wired = context.viewContext.get(wiredId);
        if (!wired) {
            return;
        }
        if (typeof wired.addItem !== 'function') {
            return;
        }

        return wired;
    }

    /**
     * 在控件render之后触发事件，处理控件的click事件。若click的event target声明了
     * data-ui-dataset-wired，则处理数据集连接。
     */
    AbstractDataSet.prototype.onafterrender = function () {
        var me = this;

        lib.on(this.main, 'click', function (event) {
            var node = event.target;
            var wired = getWiredDataSetByNode(me, node);
            if (!wired) {
                return;
            }
            var item = me.getItemByNode(node);
            if (item) {
                // 删掉item，然后传递到wired去
                me.removeItem(item, wired);
            }
            lib.event.preventDefault(event);
        });

        // TODO 实现drop taget
    };

    /**
     * 根据一个声明了wired自定义属性的DOM节点，返回一个数据项。
     * @param {object} element DOM节点
     * @return {object} item对象
     */
    AbstractDataSet.prototype.getItemByNode = noop;

    /**
     * 由子类实现的方法，绘制所有的items。
     * @abstract
     */
    AbstractDataSet.prototype.repaintAllItems = noop;

    /**
     * 由子类实现的方法，绘制增加的items。
     * @abstract
     * @param {array} items 增加了的items
     */
    AbstractDataSet.prototype.repaintAddedItems = noop;

    /**
     * 由子类实现的方法，绘制删除的items。
     * @abstract
     * @param {array} items 删除了的items
     */
    AbstractDataSet.prototype.repaintRemovedItems = noop;

    return AbstractDataSet;
 });