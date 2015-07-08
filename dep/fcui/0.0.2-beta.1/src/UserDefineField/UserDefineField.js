/**
 * @file 自定义列
 * @author XiaobinLi （lixiaobin01@baidu.com）
 * @param {Function} require require
 * @return {Table} 表格控件类
 */
define(function (require) {
    var underscore = require('underscore');
    var lib = require('../lib');
    var ui = require('../main');
    var Control = require('../Control');
    require('../FcTip');
    require('../FcTab');
    var config = require('./config');
    require('./UserDefineFieldDataSet');
    require('../DropLayerButton/DropLayerButton');

    /**
     * 用户自定义列控件
     * @extends AbstractDataSet
     * @constructor
     */
    function UserDefineField() {
        Control.apply(this, arguments);
    }

    lib.inherits(UserDefineField, Control);

    /**
     * @property {string} type
     *
     * 控件的类型
     * @readonly
     */
    UserDefineField.prototype.type = 'UserDefineField';

    /**
     * 做一个custom的event，将参数包裹在data域中。
     * @param {Object} params params
     * @return {Object} object
     */
    function makeEvent(params) {
        return {data: params};
    }

    /**
     * 初始化参数
     *
     * @param {Object} [options] 构造函数传入的参数
     *     @param {Array<string>} options.defaultFields 默认显示列
     *     @param {Array<Object>} fieldsConf 全部列配置信息
     *         如:[{field: 'unit', title: '单元'}]
     *     @param {Array<string>=} options.forbidRemoveFields 不可移除的列
     *     @param {string=} options.storedKey 本地存储key，如果不传将不会本地存储
     *     @param {Array<string>=} options.selectedFields: 手动显示列
     *     @param {string=} options.dockPosition: layer的位置
     *     @param {boolean} options.disabled 控件btn是否锁定
     * @override
     */
    UserDefineField.prototype.initOptions = function (options) {
        /**
         * 默认选项配置
         */
        var properties = {
            defaultFields: [],
            fieldsConf: [],
            forbidRemoveFields: [],
            storedFields: [],
            dockPosition: lib.DockPosition.TOP_BOTTOM_RIGHT_RIGHT,
            disabled: false
        };
        underscore.extend(properties, options);
        this.setProperties(properties);
    };

    /**
     * 初始化控件结构
     * @override
     */
    UserDefineField.prototype.initStructure = function () {
        var me = this;
        me.main.style.position = 'relative';
        me.createDropLayerButton();
    };

    /**
     * dropLayerButton render后事件处理
     */
    UserDefineField.prototype.layerRenderedHandler = function () {
        var me = this;
        var adaptData = me.adaptData();
        me.includedList = me.initIncludedList(adaptData);
        me.excludedList = me.initExcludedList(adaptData);
        if (me.includedList) {
            me.tab = me.initTab();
        }
    };

    /**
     * 适配数据
     * @return {Object} object
     */
    UserDefineField.prototype.adaptData = function () {
        var me = this;
        var fieldsConf = me.get('fieldsConf');
        var allFieldList = underscore.pluck(fieldsConf, 'field');
        var fieldTitleConf = underscore.indexBy(fieldsConf, 'field');
        var defaultFields = me.get('defaultFields');
        var storedFields = me.getStoredFields();
        var selectedFields = me.get('selectedFields');
        var includeDatasource = selectedFields || storedFields || defaultFields;

        var excludedDatasource = underscore.difference(
            allFieldList, includeDatasource);
        var forbidRemoveFields = me.get('forbidRemoveFields');
        var lockedFields = [];
        var abnormalFields = [];
        for (var i = 0, length = fieldsConf.length; i < length; i++) {
            if (fieldsConf[i].locked) {
                lockedFields.push(fieldsConf[i].field);
            }
        }

        // 找到fieldsConf里没有的列
        for (var j = 0, l = includeDatasource.length; j < l; j++) {
            if (!underscore.contains(allFieldList, includeDatasource[j])) {
                abnormalFields.push(includeDatasource[j]);
            }
        }

        this.lockedFields = lockedFields;
        this.abnormalFields = abnormalFields;

        me.setProperties({
            allFieldList: me.filterFields(allFieldList),
            defaultFields: me.filterFields(defaultFields)
        });

        return {
            includeDatasource: me.filterFields(includeDatasource),
            excludedDatasource: me.filterFields(excludedDatasource),
            fieldTitleConf: fieldTitleConf,
            forbidRemoveFields: forbidRemoveFields
        };
    };

    /**
     * 排除异常和锁定的列
     *
     * @param {Array<string>} fields 需要过滤的列
     * @return {Object} object
     */
    UserDefineField.prototype.filterFields = function (fields) {
        var result = [];
        var abnormalFields = this.get('abnormalFields');
        var lockedFields = this.get('lockedFields');

        result = underscore.difference(fields, abnormalFields);
        result = underscore.difference(result, lockedFields);
        return result;
    };

    /**
     * 添加item事件处理
     *
     * @param {Event} event 事件对象
     */
    UserDefineField.prototype.addItemHandler = function (event) {
        var items = event.data.items;
        var deferred = event.data.deferred;
        var datasource = [].concat(this.get('datasource'));
        datasource = datasource.concat(items);
        this.setProperties({
            datasource: datasource
        });
        deferred.callback({
            items: items
        });
        this.fire('itemchange');
    };

    /**
     * item变化时事件处理
     */
    UserDefineField.prototype.itemChangeHandler = function() {
        this.initTab();
    };

    /**
     * item移除时，事件处理
     *
     * @param {Event} event 事件对象
     */
    UserDefineField.prototype.removeItemHandler = function (event) {
        var deferred = event.data.deferred;
        var items = event.data.items;
        var datasource = [].concat(this.get('datasource'));
        datasource = underscore.without(datasource, items[0]);
        this.setProperties({
            datasource: datasource
        });
        deferred.callback({
            items: items
        });
        this.fire('itemchange');
    };

    /**
     * item移动时，事件处理
     * @param {Object} event event
     */
    UserDefineField.prototype.moveItemHandler = function (event) {
        var type = event.data.type;
        var key = event.data.key;
        var datasource = [].concat(this.get('datasource'));
        var index = datasource.indexOf(event.data.key);
        if (type === 'left') {
            var preIndex = index - 1;
            var preKey = datasource[preIndex];
            datasource.splice(index, 1, preKey);
            datasource.splice(preIndex, 1, key);
        } else if (type === 'right') {
            var nextIndex = index + 1;
            var nextKey = datasource[nextIndex];
            datasource.splice(index, 1, nextKey);
            datasource.splice(nextIndex, 1, key);
        }
        this.setProperties({
            datasource: datasource
        });
        this.renderItems();
        this.fire('itemchange');
    };

    /**
     * 初始化已添加列表
     * @param {Object} adaptData data
     * @return {Object} object
     */
    UserDefineField.prototype.initIncludedList = function (adaptData) {
        var me = this;
        var includedList = ui.get('included-list-' + me.helper.getId());
        if (!includedList) {
            return;
        }
        includedList.setProperties({
            datasource: adaptData.includeDatasource,
            id: 'included-list-' + me.helper.getId(),
            mainControlId: me.helper.getId(),
            fieldTitleConf: adaptData.fieldTitleConf,
            itemTpl: config.includeItemTpl,
            forbidRemoveFields: adaptData.forbidRemoveFields
        });
        includedList.on('itemsadd', this.addItemHandler, includedList);
        includedList.on('itemsremove', this.removeItemHandler, includedList);
        includedList.on('itemmove', this.moveItemHandler, includedList);
        includedList.on('itemchange', this.itemChangeHandler, this);
        includedList.render();
        return includedList;
    };

    /**
     * 初始化自定义列中的tab信息
     * @return {Object} object
     */
    UserDefineField.prototype.initTab = function () {
        var me = this;
        var activeIndex = -1;
        var defaultFields = this.get('defaultFields');
        var allFieldList = this.get('allFieldList');
        var datasource = this.includedList.get('datasource');
        if (datasource.length === allFieldList.length) {
            activeIndex = 1;
        } else if (datasource.toString() === defaultFields.toString()) {
            activeIndex = 0;
        }
        if (this.tab) {
            this.tab.setProperties({
                activeIndex: activeIndex
            });
            return this.tab;
        }

        var tab = ui.create('Tab', {
            tabs: config.tabDatesource,
            id: 'user-define-field-tab-' + me.helper.getId(),
            skin: 'user-define-field',
            activeIndex: activeIndex
        });
        tab.on('activate', this.tabActivate, this);
        tab.appendTo(
            lib.g('user-define-field-tab-wrap-' + me.helper.getId())
        );
        return tab;
    };

    /**
     * 初始化待添加区域
     * @param {Object} adaptData data
     * @return {Object} object
     */
    UserDefineField.prototype.initExcludedList = function (adaptData) {
        var me = this;
        var excludedList = ui.get('excluded-list-' + me.helper.getId());
        if (!excludedList) {
            return;
        }
        excludedList.setProperties({
            datasource: adaptData.excludedDatasource,
            id: 'excluded-list-' + me.helper.getId(),
            mainControlId: me.helper.getId(),
            fieldTitleConf: adaptData.fieldTitleConf,
            itemTpl: config.excludeItemTpl
        });

        excludedList.on('itemsadd', this.addItemHandler, excludedList);
        excludedList.on('itemsremove', this.removeItemHandler, excludedList);
        excludedList.render();
        return excludedList;
    };

    /**
     * tab 激活时事件处理
     *
     * @param {Event} event 事件对象
     */
    UserDefineField.prototype.tabActivate = function (event) {
        if (event.activeIndex === -1) {
            return;
        }
        var value = event.tab.value;
        var defaultFields = this.get('defaultFields');
        var allFieldList = this.get('allFieldList');
        var datasource = this.includedList.get('datasource');
        var showFields = defaultFields;
        if (value === 'all') {
            showFields = datasource.length === allFieldList.length ? datasource
                : allFieldList;
        }
        this.includedList.setProperties({
            datasource: showFields
        });
        this.excludedList.setProperties({
            datasource: underscore.difference(allFieldList, showFields)
        });
        this.includedList.render();
        this.excludedList.render();
    };

    /**
     * 创建一个点击按钮出浮出层组件
     */
    UserDefineField.prototype.createDropLayerButton = function () {
        var me = this;
        var dropLayerButton = ui.create('DropLayerButton', {
            displayText: '自定义列',
            layerContent: lib.format(config.layerContentTpl, {
                id: me.helper.getId()
            }),
            autoClose: true,
            dockPosition: this.dockPosition,
            dockOptions: {
                detectSpace: false
            }
        });
        dropLayerButton.appendTo(me.main);
        dropLayerButton.layer.control.on('confirm', me.confirm, me);
        dropLayerButton.layer.control.on('cancel', function () {
            me.fire('cancel');
        });
        dropLayerButton.layer.control.on('hide', me.reset, me);
        dropLayerButton.on('afterrender', me.layerRenderedHandler, me);
        me.dropLayerButton = dropLayerButton;
        if (me.get('disabled')) {
            me.disable();
        }
    };

    /**
     * 保存自定义列时事件处理
     */
    UserDefineField.prototype.confirm = function () {
        var fields = this.includedList.get('datasource');
        fields = this.get('lockedFields').concat(fields);
        var storedFields = this.getStoredFields();
        var defaultFields = this.get('defaultFields');
        var showFields = storedFields || defaultFields;
        if (showFields.toString() !== fields.toString()) {
            this.fire('change', makeEvent({
                fields: fields
            }));
            this.setSelectedFields(fields);
        }
        this.fire('confirm', makeEvent({
            fields: fields
        }));
    };

    /**
     * 获取本地存储的列
     * @return {Object} fields
     */
    UserDefineField.prototype.getStoredFields = function () {
        return this.storedFields;
    };

    /**
     * 自定义列表重置，恢复默认显示
     */
    UserDefineField.prototype.reset = function () {
        this.layerRenderedHandler();
    };

    /**
     * 锁定控件
     */
    UserDefineField.prototype.disable = function () {
        this.dropLayerButton.disable();
    };

    /**
     * 手动设置显示列
     *
     * @param {Array<string>} selectedFields 选择的列
     * @param {Array<Object>=} optFieldsConf 全部列配置信息
     */
    UserDefineField.prototype.setSelectedFields = function (
            selectedFields, optFieldsConf) {
        var me = this;
        if (optFieldsConf) {
            this.fieldsConf = optFieldsConf;
        }
        me.selectedFields = selectedFields;
        me.reset();
    };

    /**
     * 设置列配置信息
     * @param {Array<Object>=} fieldsConf 全部列配置信息
     */
    UserDefineField.prototype.setFieldsConfig = function (fieldsConf) {
        this.fieldsConf = fieldsConf;
        this.reset();
    };

    /**
     * 激活控件
     */
    UserDefineField.prototype.enable = function () {
        this.dropLayerButton.enable();
    };

    /**
     * 销毁控件
     *
     * @override
     */
    UserDefineField.prototype.dispose = function () {
        if (this.excludedList) {
            this.excludedList.dispose();
        }
        if (this.includedList) {
            this.includedList.dispose();
        }
        if (this.tab) {
            this.tab.dispose();
        }
        if (this.dropLayerButton) {
            this.dropLayerButton.dispose();
        }
        Control.prototype.dispose.apply(this, arguments);
    };

    /**
     * 根据本地存储key获取本地存储数据
     *
     * @param {string} storedKey 本地存储key
     * @param {Array<Object>=} optFieldsConf 全部列配置信息
     * @return {Object} object
     */
    UserDefineField.getStoredFields = function (storedKey, optFieldsConf) {
        var storedFields = this.getStoredFields();
        if (!optFieldsConf || !storedFields) {
            return storedFields;
        }

        var allFieldList = underscore.pluck(optFieldsConf, 'field');
        var abnormalFields = [];
        for (var i = 0, length = storedFields.length; i < length; i++) {
            if (!underscore.contains(allFieldList, storedFields[i])) {
                abnormalFields.push(storedFields[i]);
            }
        }
        var leftFields = underscore
            .difference(storedFields, abnormalFields);
        // 加入storedFields中不含的新加的locked field
        for (i = 0, length = optFieldsConf.length; i < length; i++) {
            var f = optFieldsConf[i];
            if (f.locked && !underscore.contains(leftFields, f.field)) {
                leftFields.unshift(f.field);
            }
        }
        return leftFields;
    };

    ui.register(UserDefineField);
    return UserDefineField;
});
