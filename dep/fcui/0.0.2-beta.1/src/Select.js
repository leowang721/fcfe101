/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 对原有ESUI select直接扩展，支持下拉任意layer的内容。
 *
 * @file
 * @author Cory(kuanghongrui@baidu.com)
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');
    var helper = require('./controlHelper');
    var InputControl = require('./InputControl');
    var lib = require('./lib');
    var Select = require('esui/Select');
    var Layer = require('./Layer');

    /**
     * select的浮层类型。现已把select当成dropdown来使用了。
     * 这种方式很不好，但是esui的layer架构改变不了呀。需要从长计议。
     * @type {Object}
     */
    var LAYER_TYPE = {
        DEFAULT: 'default', // 默认的layer类型，则为正常的select交互。
        CUSTOM: 'custom' // 用户自定义layer类型，则可以自定义layer里面的内容。
    };

    /**
     * `Select`控件使用的自定义层类
     *
     * @extends Layer
     * @ignore
     * @constructor
     */
    function CustomLayer() {
        Layer.apply(this, arguments);
    }
    lib.inherits(CustomLayer, Layer);

    /**
     * 自定义的layer渲染方法。
     * @override
     */
    CustomLayer.prototype.render = function (element) {
        var customLayerHTML = this.control.customLayerHTML;
        if (customLayerHTML) {
            element.innerHTML = customLayerHTML;
            this.control.helper.initChildren(element);
            var layerControls = this.layerControls = this.control.children;
            if (layerControls && layerControls.length > 0) {
                _.each(layerControls, function (layerControl) {
                    layerControl.parentLayer = this;
                    layerControl.on('submit', _.bind(function (e) {
                        this.control.fire('layersubmit', fc.util.customData(e.data));
                        this.hide();
                    }, this));
                }, this);
            }
        }
    };

    /**
     * 同步控件状态到层。
     * @override
     */
    CustomLayer.prototype.syncState = function (element) {
        var layerControls = this.layerControls;
        if (layerControls && layerControls.length > 0) {
            _.each(layerControls, function (control) {
                if (control.setValue) {
                    control.setValue(this.control.get('rawValue'));
                }
            }, this);
        }
    };

    /**
     * 销毁
     * @override
     */
    CustomLayer.prototype.dispose = function () {
        _.each(this.layerControls, function (layerControl) {
            delete layerControl.parentLayer;
        }, this);
        delete this.layerControls;
        Layer.prototype.dispose.apply(this, arguments);
    };

    CustomLayer.prototype.dock = {
        strictWidth: true
    };

    /**
     * select的浮层类型.
     * 若该类型为空，则为默认的select交互浮层效果。
     * @type {string}
     */
    Select.prototype.layerType = LAYER_TYPE.DEFAULT;

    /**
     * 显示label及选中值的模板
     *
     * @type {string}
     */
    Select.prototype.labelTemplate = '<span class="${labelClass}">${label}</span>';

    /**
     * 原始初始化方法。
     * @inner
     * @type {function}
     */
    var initStructure = Select.prototype.initStructure;

    /**
     * 初始化DOM结构
     *
     * @protected
     * @override
     */
    Select.prototype.initStructure = function () {
        if (this.layerType === LAYER_TYPE.CUSTOM) {
            if (this.layer) {
                this.layer.dispose();
            }
            this.layer = new CustomLayer(this);
            this.layer.getElement(true);
            var layerContent = this.main.querySelector('.custom-layer-content').innerHTML.replace(/(^\s+)|(\s+$)/g, '');
            if (layerContent) {
                this.customLayerHTML = layerContent;
            }
        }
        initStructure.apply(this, arguments);
    };

    /**
     * 原始初始化事件交互方法。
     * @inner
     * @type {function}
     */
    var initEvents = Select.prototype.initEvents;

    /**
     * 初始化事件交互
     *
     * @protected
     * @override
     */
    Select.prototype.initEvents = function () {
        if (this.layerType === LAYER_TYPE.CUSTOM) {
            this.on('layersubmit', _.bind(this.layerSubmit, this));
        }
        initEvents.apply(this, arguments);
    };

    /**
     * 原始设置值方法。
     * @inner
     * @type {function}
     */
    var setValue = Select.prototype.setValue;

    /**
     * 设置值方法。
     *
     * @protected
     * @override
     * @param {Object} value 设置的值。
     */
    Select.prototype.setValue = function (value) {
        setValue.apply(this, arguments);
        if (this.layerType === LAYER_TYPE.CUSTOM) {
            this.layer.syncState(this.layer.getElement(true));
        }
    };

    /**
     * 弹出层提交。
     *
     * @param {Event} e e
     */
    Select.prototype.layerSubmit = function (e) {
        this.set('value', e.data);
        var displayText = '';
        if (displayText) {
            this.setDisplayText(displayText);
        }
    };

    /**
     * 原始获取原始值方法。
     * @inner
     * @type {function}
     */
    var getRawValue = Select.prototype.getRawValue;

    /**
     * 获取原始值
     * @override
     * @return {Object}
     */
    Select.prototype.getRawValue = function () {
        if (this.layerType === LAYER_TYPE.DEFAULT) {
            return getRawValue.apply(this, arguments);
        }
        return this.rawValue;
    };

    /**
     * 设置显示文字。
     * @param {string} displayText 所要设置的显示文字，若该文字为null或空字符串，则将由getDisplayHTML来生成相应的显示文字，
     */
    Select.prototype.setDisplayText = function (displayText) {
        var textHolder = this.helper.getPart('text');
        var displayHTML = null;
        if (displayText) {
            displayHTML = this._getDisplayHTML({
                text: displayText
            });
        }
        else {
            var selectedItem = this.selectedIndex === -1
                ? null
                : this.datasource[this.selectedIndex];
            displayHTML = this.getDisplayHTML(selectedItem);
        }
        textHolder.innerHTML = displayHTML;
    };

    /**
     * 获取显示的label+option名字的html字符串。
     * @param {Object} data displayTemplate中的数据。
     * @protected
     * @return {string} html片段
     */
    Select.prototype._getDisplayHTML = function (data) {
        var label = _.escape(this.label);
        var labelWrapData = {
            label: label,
            labelClass: helper.getPartClasses(this, 'label').join(' ')
        };
        var labelHtml = label ? lib.format(this.labelTemplate, labelWrapData) : '';
        if (!data) {
            return labelHtml + _.escape(this.emptyText || '');
        }
        return labelHtml + lib.format(this.displayTemplate, data);
    },

    /**
     * 根据所选择的选项，获取其显示的label+option名字的html字符串。
     * @override
     * @return {string}
     */
    Select.prototype.getDisplayHTML = function (item) {
        var data = null;
        if (item) {
            data = {
                text: _.escape(item.name || item.text),
                value: _.escape(item.value)
            };
        }
        return this._getDisplayHTML(data);
    };

    var setProperties = Select.prototype.setProperties;

    /**
     * 批量更新属性并重绘
     *
     * @param {Object} properties 需更新的属性
     * @override
     * @fires change
     */
    Select.prototype.setProperties = function (properties) {
        if (this.layerType === LAYER_TYPE.CUSTOM) {
            var changes = InputControl.prototype.setProperties.apply(this, arguments);
            if (changes.hasOwnProperty('value') || changes.hasOwnProperty('rawValue')) {
                this.fire('change');
            }
            return changes;
        }
        return setProperties.apply(this, arguments);
    };

    return Select;
});
