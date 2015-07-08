/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 手风琴控件
 * @author Shaolong Zhang(zhangshaolong@baidu.com)
 */
define(function (require) {

    var lib = require('./lib');
    var Control = require('./Control');
    var helper  = require('./controlHelper');

    /**
     * item元素的模板，为了对齐，开始位置添加了一个空字符串
     */
    var ITEM_TEXT_TPL = ''
         + '<div class="item-text">'
             + '<span class="icon-space ${iconClass}">&nbsp;</span>'
             + '<span>${name}</span>'
         + '</div>';
    
    /**
     * Sidebar的title所占高度
     */
    var SIDEBAR_HEADER_HEIGHT = 39;
    
    /**
     * 处理修复Sidebar高度的延迟时间（ms）
     */
    var DELAY_GAP = 50;
    
    /**
     * 手风琴控件
     *
     * @extends Control
     * @constructor
     */
    function Accordion(options) {
        Control.apply(this, arguments);
    }

    lib.inherits(Accordion, Control);
    
    /**
     * 默认属性值
     *
     * @static
     * @type {Object} defaultOptions
     * defaultOptions.speed {number} 默认动画时间（ms）
     * defaultOptions.itemtype {string} 数据项展示类型（'single'、 'multiple'）
     */
    var defaultOptions = {
        speed: 0,
        itemtype: 'single'
    };
    
    /**
     * 控件类型，始终为`"Accordion"`
     *
     * @type {string}
     * @readonly
     * @override
     */
    Accordion.prototype.type = 'Accordion';

    /**
     * 初始化配置参数，会自动继承默认参数
     *
     * @param {Object=} options 配置参数信息
     * @readonly
     * @override
     */
    Accordion.prototype.initOptions = function (options) {
        
        options = lib.extend({}, defaultOptions, options);
        
        this.setProperties(options);
    }
    
    /**
     * 为window绑定事件
     *
     * @protected
     * @override
     */
    Accordion.prototype.render = function () {
        Control.prototype.render.apply(this, arguments);
        if (this.itemtype === 'single') {
            lib.on(window, 'resize', this.resetHeight.bind(this));
            lib.on(window, 'scroll', this.repairHeight.bind(this));
            this._mouseOverHandler = lib.bind(this.mouseOverHandler, this);
            lib.on(this.main, 'mouseover', this._mouseOverHandler);
        }
    };

    /**
     * mouseover事件
     */
    Accordion.prototype.mouseOverHandler = function () {
        // 当控件被隐藏时获取不了容器的高度，将产生挂起的重置高度需求
        // 在mouseover事件里检查这些
        this.checkAutoFixHeight();
    };

    /**
     * 检查是否需要修正高度
     */
    Accordion.prototype.checkAutoFixHeight = function () {
        if (this.autoFixHeight && this.pendingResetHeight) {
            this.resetHeight();
            this.pendingResetHeight = false;
        }
    };

    /**
     * 设置数据源，会自动完成对应的item节点的生成
     * 
     * @param {Array.<Object>} datasource 数据源
     *   [
     *      {id: 1, name: '文件夹1'},
     *      {id: 2, name: '<div>文件夹2</div>'}
     *   ]
     */
    Accordion.prototype.setDatasource = function (datasource) {
        this.setProperties({
            datasource: datasource || []
        });
    };
    
    /**
     * 重渲染，自动调用生成item的方法完成节点的生成
     *
     * @override
     */
    Accordion.prototype.repaint = helper.createRepaint(
        Control.prototype.repaint,
        {
            name: 'datasource',
            paint: function (accordion, datasource) {
                if (!datasource) {
                    return;
                }
                addItemNodes(accordion);
                if (accordion.itemtype === 'single') {
                    accordion.resetHeight();
                }
            }
        }
    );
    
    /**
     * 计算并设置内容区可用高度
     *
     */
    Accordion.prototype.resetHeight = function () {
        if (!this._itemsHeight) {
            var itemTexts = this.main.getElementsByClassName('item-text');
            var item = itemTexts[0];
            if (!item) {
                return ;
            }
            this._itemsHeight = item.offsetHeight * itemTexts.length;
            this._itemContents =
                this.main.getElementsByClassName('item-content');
        }
        var containerHeight = this.getContainerHeight();
        if (!isNaN(containerHeight) && containerHeight > 0) {
            var itemContentHeight = containerHeight  
                - SIDEBAR_HEADER_HEIGHT - this._itemsHeight;
            itemContentHeight = itemContentHeight > 0 ? itemContentHeight : 0;
            for (var i = 0, len = this._itemContents.length; i < len; i++){
                this._itemContents[i].style.height = itemContentHeight + 'px';
            }
        }
        if ((isNaN(containerHeight) || containerHeight == 0)
            && this.autoFixHeight
        ) {
            this.pendingResetHeight = true; 
        }
    };

    /**
     * 获取Accordion容器的可用高度
     * Accordion被影藏时，高度可能会获取不到
     * 
     * @protected
     * @override
     */
    Accordion.prototype.getContainerHeight = function () {
        var h = lib.getComputedStyle(this.main.parentNode, 'height')
            .replace('px', '');
        return !isNaN(h) ? +h : h;
    };
    
    /**
     * 获取Accordion的item的icon的class名称
     * 
     * @protected
     * @override
     */
    Accordion.prototype.setItemIconClass = function (id) {
        return 'ui-accordion-icon-' + id;
    };
    
    /**
     * 修复由于操作过快获取Sidebar的可用高度的问题
     * 
     */
    Accordion.prototype.repairHeight = function () {
        clearTimeout(this._timer);
        this._timer = setTimeout(this.resetHeight.bind(this), DELAY_GAP);
    };
    
    /**
     * 根据数据源，生成item的节点
     * 
     * @param {Accordion} accordion 当前Accordion实例
     */
    function addItemNodes(accordion) {
        var itemContainers = accordion.itemContainers = [];
        var data = accordion.datasource || [];
        var dataLen = data.length;
        var mainNode = accordion.main;
        mainNode.innerHTML = '';
        for (var i = 0; i < dataLen; i++) {
            var item = data[i];
            // 需要创建出dom结构，为生成的具体内容提供引用
            var itemContainer = accordion.createItemContainer(item.id);
            lib.addClass(itemContainer, 'item-container');
            itemContainer.setAttribute('item-id', item.id);
            item.iconClass = accordion.setItemIconClass(item.id);
            itemContainer.innerHTML = accordion.getItemHtml(item);
            var contentDiv = accordion.createItemContent(item.id);
            lib.addClasses(contentDiv, ['item-content', 'hide']);
            mainNode.appendChild(itemContainer);
            mainNode.appendChild(contentDiv);
            accordion.fire('contentcontainercreated',
                {
                    node: contentDiv,
                    data: item
                }
            );
            lib.on(itemContainer, 'click', function () {
                var id = this.getAttribute('item-id');
                accordion.fire('accordionselected', id);
                accordion.setCurrentItem(id);
            });
            itemContainers.push(itemContainer);
        }
    };
    
    /**
     * 获取每个数据项的容器元素
     * 
     * @protected
     * @override
     * @return {string}
     */
    Accordion.prototype.createItemContainer = function () {
        return document.createElement('div');
    };
    
    /**
     * 获取每个数据项的内容元素
     * 
     * @protected
     * @override
     * @return {string}
     */
    Accordion.prototype.createItemContent = function () {
        return document.createElement('div');
    };
    
    /**
     * 获取每个数据项的html
     * 
     * @protected
     * @override
     * @return {string}
     */
    Accordion.prototype.getItemHtml = function (item) {
        return lib.format(ITEM_TEXT_TPL, item);
    };
    
    /**
     * 显示指定的内容区
     * 
     * @param {string|number} itemId item对应的id
     * @protected
     * @override
     */
    Accordion.prototype.setCurrentItem = function (itemId) {
        var itemContainers = this.itemContainers;
        // 如果之前没有展开的itemId，设置当前参数为上一个itemId
        if (!this._oldItemId) {
            this._oldItemId = itemId;
        }
        // 循环遍历，获取到要展开的节点和要关闭的节点
        for (var i = 0, len = itemContainers.length; i < len; i++) {
            var itemContainer = itemContainers[i];
            var id = itemContainer.getAttribute('item-id');
            if (id == itemId) {
                var newItemContainer = itemContainer;
            }
            if (id == this._oldItemId) {
                var oldItemContainer = itemContainer;
            }
        }
        // 保存被展开的itemId
        this._oldItemId = itemId;
        // 找到item对应的content元素
        var newItemContent = lib.dom.next(newItemContainer);
        // 如果是single类型，需要把上一个content节点关闭
        if (this.itemtype === 'single') {
            var oldItemContent = lib.dom.next(oldItemContainer);
            // 如果有展开状态的节点，则关闭
            if (lib.hasClass(oldItemContainer, 'current-container')
                && oldItemContent !== newItemContent){
                lib.toggleClass(oldItemContent, 'hide');
                lib.toggleClass(oldItemContainer, 'current-container');
            }
        }
        // 处理新节点的显隐
        lib.toggleClass(newItemContent, 'hide');
        lib.toggleClass(newItemContainer, 'current-container');
    };
    
    /**
     * 释放绑定的事件
     * 
     * @override
     */
    Accordion.prototype.dispose = function () {
        if (this.itemtype === 'single') {
            lib.un(window, 'resize', this.resetHeight.bind(this));
            lib.un(window, 'scroll', this.repairHeight.bind(this));
            lib.un(this.main, 'mouseover', this._mouseOverHandler);
        }
        Control.prototype.dispose.apply(this, arguments);
    };
    
    require('./main').register(Accordion);
    return Accordion;
});
