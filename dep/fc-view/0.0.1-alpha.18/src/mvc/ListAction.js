/**
 * @file 列表形式的MVC - Action
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    'use strict';

    var _ = require('underscore');
    var fc = require('fc-core');
    var Promise = require('fc-core/Promise');

    var viewUtil = require('common/viewUtil');

    require('fcui/Table');
    require('esui/extension/Command');
    require('fcui/Pager');

    /**
     * 列表形式的MVC - Action
     */
    var overrides = {};

    /**
     * 初始化交互
     */
    overrides.initBehavior = function () {
        this.view.on('search', function (e) {
            this.redirect(this.model.resolveQuery(e.data));
        }, this);
        this.customBehavior();
    };

    overrides.customBehavior = _.noop;

    function waitExecute(method, args, thisObject) {
        var waiting = method.apply(thisObject, args);

        return waiting;
    }

    function showCellLoading(table, row, col) {
        fc.assert.equals(_.isArray(row), true, '参数`row`必须为数组！');
        fc.assert.equals(_.isArray(col), true, '参数`col`必须为数组！');
        _.each(row, function (eachRow) {
            _.each(col, function (eachCol) {
                table.setCellText(
                    viewUtil.getInlineLoading(),
                    eachRow, eachCol
                );
            });
        });
    }

    function showRowLoading(table, row) {
        fc.assert.equals(_.isArray(row), true, '参数`row`必须为数组！');
        _.each(row, function (eachRow) {
            $(table.getRow(eachRow)).css('position', 'relative').append(
                $('<div class="loading-table-line"></div>').css({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'gray',
                    opacity: 0.5,
                    cursor: 'not-allowed'
                })
            );
        });
    }

    function clearRowLoading(table) {
        $(table.main).find('.loading-table-line').remove();
    }

    /**
     * 获取新数据。
     * @param {Object} response
     * @return {Object}
     */
    overrides.getNewValue = function(response) {
        if (response && response.data) {
            var data = response.data;
            return _.isEmpty(data) ? null : data;
        }
        return null;
    };

    /**
     * 获取旧数据。
     * @param {Object} response
     * @param {Object} datasource
     * @return {Object}
     */
    overrides.getOldValue = function(response, datasource) {
        return null;
    };

    /**
     * 执行单个行内修改行为的命令
     * @param {Function} method 要执行的方法
     * @param {Object} e 事件的参数
     * @param {string} e.type 事件类型，例如pause
     * @param {Object} e.data 事件附带数据
     * @param {Object=} e.data.args 本次执行方法的参数
     * @param {number|Array.<number>} e.data.row 表示所在行，如果是多个则为批量
     * @param {number|Array.<number>=} e.data.col 表示所在列，会影响刷新模式
     * @param {Object=} extraRowData 额外的参数，在执行成功后补充入saved事件的newData
     * @return {Promise}
     */
    function inlineModify(method, e, extraRowData) {
        var me = this;
        var row = e.data.row;
        var col = e.data.col;
        var args = e.data.args;

        if (_.isArray(row)) {
            row = row[0];
        }
        if (_.isArray(col)) {
            col = col[0];
        }

        var listTable = me.view.get('list-table');
        // 展现行内loading，但是取决于col是否存在……
        if (!extraRowData || extraRowData._executedSource !== 'component') {
            if (!col) {
                // 使用行刷新模式
                showRowLoading(listTable, [row]);
            }
            else {
                showCellLoading(listTable, [row], [col]);
            }
        }
        return waitExecute(method, args, me)
            .then(_.bind(function (response) {
                /**
                 * @type {Object} key为datasource中的行索引，value为具体值
                 */
                var processedData = me.processExecuteModifyResponse(
                    response, e, extraRowData
                );

                var oldValue = response.data.oldValue
                    ? response.data.oldValue
                    : this.getOldValue(response, listTable.datasource);

                // 行更新
                clearRowLoading(listTable);
                if (processedData) {
                _.each(processedData, function (item, index) {
                    var newData = _.extend(
                        listTable.datasource[index],
                        item,
                        extraRowData
                    );
                    if (newData) {
                            listTable.datasource[index] = newData;
                        listTable.updateRowAt(row, newData);
                    }
                });
                }
                return {
                    newValue: response.data.newValue ? response.data.newValue : this.getNewValue(response),
                    oldValue: oldValue
                };
            }, this), function (response) {
                clearRowLoading(listTable);
                return Promise.reject(response);
            });
    }

    /**
     * 执行批量修改行为的命令
     * @param {Function} method 要执行的方法
     * @param {Object} e 事件的参数
     * @param {string} e.type 事件类型，例如pause
     * @param {Object} e.data 事件附带数据
     * @param {Object=} e.data.args 本次执行方法的参数
     * @param {number|Array.<number>} e.data.row 表示所在行，如果是多个则为批量
     * @param {number|Array.<number>=} e.data.col 表示所在列，会影响刷新模式
     * @param {Object=} extraRowData 额外的参数，在执行成功后补充入saved事件的newData
     * @return {Promise}
     */
    function multiModify(method, e, extraRowData) {
        var me = this;
        var row = e.data.row;
        // var col = e.data.col;
        var args = e.data.args;

        var listTable = this.view.get('list-table');

        if (!extraRowData || extraRowData._executedSource !== 'component') {
            // 这时候只有row了，没有col
            // 先不处理loading了，但是可以先禁用或者做些展现处理
            // like this
            showRowLoading(listTable, row);
        }

        return waitExecute(method, args, this)
            .then(_.bind(function (response) {
                /**
                 * @type {Object} key为datasource中的行索引，value为具体值
                 */
                var processedData = me.processExecuteModifyResponse(
                    response, e, extraRowData
                );

                var oldValue = response.data.oldValue
                    ? response.data.oldValue
                    : this.getOldValue(response, listTable.datasource);

                // 刷新表格
                clearRowLoading(listTable);
                if (processedData) {
                var updatedDatasource = _.map(
                    listTable.datasource,
                    function (item, index) {
                        if (processedData[index]) {
                            return _.extend(
                                item,
                                processedData[index],
                                extraRowData
                            );
                        }
                        return item;
                    }
                );
                listTable.setDatasource(updatedDatasource);
                listTable.set('selectedIndex', row);
                }
                require('common/messager').succ();
                return {
                    newValue: response.data.newValue ? response.data.newValue : this.getNewValue(response),
                    oldValue: oldValue
                };
            }, this), function (response) {
                clearRowLoading(listTable);
                return Promise.reject(response);
            });

    }

    /**
     * 执行某个修改行为的命令
     * 区分单个和批量
     * @param {Function} method 要执行的方法
     * @param {Object} e 事件的参数
     * @param {string} e.type 事件类型，例如pause
     * @param {Object} e.data 事件附带数据
     * @param {Object=} e.data.args 本次执行方法的参数
     * @param {number|Array.<number>} e.data.row 表示所在行，如果是多个则为批量
     * @param {number|Array.<number>=} e.data.col 表示所在列，会影响刷新模式
     * @param {Object=} extraRowData 额外的参数，在执行成功后补充入saved事件的newData
     * @return {Promise}
     */
    overrides.executeModifyCommand = function (method, e, extraRowData) {
        fc.assert.has(method, 'executeModifyCommand方法必须指定参数`method`');
        fc.assert.has(e, 'executeModifyCommand方法必须指定参数`e`');
        fc.assert.hasProperty(
            e.data, 'row',
            'executeModifyCommand的参数`e.data`必须有属性`row`'
        );

        var isMulti = _.isArray(e.data.row) && e.data.row.length > 1;

        // 区分了执行方法是因为刷新模式不一样
        var modifyMethod = isMulti ? multiModify : inlineModify;
        var executing = modifyMethod.apply(this, arguments);
        executing.then(_.bind(this.afterExecuteModifyCommand, this));

        return executing;
    };

    /**
     * 执行某个组件内部的修改行为命令
     * 区分单个和批量
     * @param {BaseComponent} component 需要被执行的组件
     *                        可以为一个构造完成的组件，此时方法会直接show它
     *                        也可以是一个组件的构造函数，此时方法会尝试构造它
     * @param {Event} e 事件的参数
     * @param {string} e.type 事件类型，例如pause
     * @param {Object} e.data 事件附带数据
     * @param {Object=} e.data.args 本次执行方法的参数
     * @param {number|Array.<number>} e.data.row 表示所在行，如果是多个则为批量
     * @param {number|Array.<number>=} e.data.col 表示所在列，会影响刷新模式
     * @param {Object=} extraRowData 额外的参数，在执行成功后补充入saved事件的newData
     * @return {Promise}
     */
    overrides.executeModifyComponent = function (component, e, extraRowData) {
        var listTable = this.view.get('list-table');
        var items = listTable.datasource;
        var rowIndexes = [].concat(e.data.row);
        var args = _.extend({}, extraRowData, {
            selectedItems: _.filter(items, function (item, index) {
                return _.contains(rowIndexes, index);
            })
        });

        if (typeof component === 'object') {
            // component是一个实例，这通常意味着它是一个singleton，直接show
            component.show({
                args: args
            });
        }
        else {
            // component是一个function
            fc.assert.equals(typeof component, 'function',
                '参数`component`要么是构造函数，要么是一个singleton'
            );
            // fecs...
            var Component = component;
            component = new Component({
                args: args
            });
            component.show();
        }
        return this.executeModifyCommand(function () {
            return new Promise(function (resolve, reject) {
                var isSaved = false;
                component.once('saved', function (e) {
                    isSaved = true;
                    resolve(e);
                });
                component.once('hide', function (e) {
                    if (!isSaved) {
                        reject();
                    }
                });
            });
        }, e, _.extend({}, extraRowData, {
            _executedSource: 'component' // 执行源为component
        }));
    };

    /**
     * 修改行为执行成功之后处理返回的数据，类似于table的datasource，然后更新表格
     * @param {Object} response 执行结果
     * @param {Object} e 事件的参数
     * @param {string} e.type 事件类型，例如pause
     * @param {Object} e.data 事件附带数据
     * @param {Object=} e.data.args 本次执行方法的参数
     * @param {number|Array.<number>} e.data.row 表示所在行，如果是多个则为批量
     * @param {number|Array.<number>=} e.data.col 表示所在列，会影响刷新模式
     * @param {Object=} extraRowData 额外的参数，在执行成功后补充入saved事件的newData
     * @return {Object} key为行索引，value为具体值
     */
    overrides.processExecuteModifyResponse = function (
        response, e, extraRowData) {
        return response;
    };

    /**
     * 进行了某个修改行为的命令成功之后的后置处理
     * @param {Object} e 事件的参数
     * @param {string} e.type 事件类型，例如pause
     * @param {Object} e.data 事件附带数据
     * @param {Object=} e.data.args 本次执行方法的参数
     * @param {number|Array.<number>} e.data.row 表示所在行，如果是多个则为批量
     * @param {number|Array.<number>=} e.data.col 表示所在列，会影响刷新模式
     */
    overrides.afterExecuteModifyCommand = function (e) { };

    var ListAction = fc.oo.derive(require('./EntryAction'), overrides);

    return ListAction;
});
