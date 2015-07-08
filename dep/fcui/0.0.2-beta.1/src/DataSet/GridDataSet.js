/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 基于Grid的单数据集控件
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 */
define(function (require) {
    var u = require('underscore');
    var Control = require('esui/Control');
    var lib = require('esui/lib');
    var helper  = require('esui/controlHelper');
    var Table = require('esui/Table');
    // 虽然这里没显式用到但Panel是Table必须的
    var Panel = require('esui/Panel');
    var AbstractDataSet = require('./AbstractDataSet');

    /**
     * 基于grid的单数据集控件。
     * 子类需要重写AbstractDataSet的getItemByNode
     * @extends AbstractDataSet
     * @constructor
     */
    function GridDataSet(options) {
        AbstractDataSet.apply(this, arguments);
        this.options = options;
        // 内嵌的ESUI table用作展现
        this.table = null;
    };

    lib.inherits(GridDataSet, AbstractDataSet);

    /**
     * 方便子类使用，将父类的event常量集引入
     */
    GridDataSet.Event = AbstractDataSet.Event;

    /**
     * @property {string} type
     *
     * 控件的类型
     * @readonly
     */
    GridDataSet.prototype.type = 'GridDataSet';

    /**
     * 重写父类的initStructure，初始化内嵌的ESUI table，以this.main为容器。
     */
    GridDataSet.prototype.initStructure = function () {
        // 复制options加入main节点
        var options = lib.extend({}, this.options);
        options.main = this.main;
        this.table = new Table(options);
        this.table.render();
    };    

    /**
     * 三个repaint方法，直接走内嵌Table自己的repaint
     * @this {GridDataSet}
     */
    function tableRepaint() {
        this.table.repaint();
    }

    GridDataSet.prototype.repaintAllItems = tableRepaint;
        
    GridDataSet.prototype.repaintAddedItems = tableRepaint;

    GridDataSet.prototype.repaintRemovedItems = tableRepaint;

    /**
     * 重写table的setDatasource，因为dataSet的场合下，经常会重置datasource，加上
     * 参数使得重置datasource暂时不刷新UI。
     * Copy自library/src/framework/ui/Table
     * @param {array} datasource
     * @param {boolean=} opt_repaint
     */
    GridDataSet.prototype.setDatasource = function (datasource, opt_repaint) {
        // 当opt_repaint未赋值或不为布尔值时，其默认值为true，即对表格进行重绘
        opt_repaint = typeof opt_repaint === 'boolean'
            ? opt_repaint : true;

        if (!opt_repaint) {
            // 当不需要重绘表格时，即更新的数据不会引起UI变化时，
            // 通过赋值的方式直接改变表格的数据源
            this.table.datasource = datasource;
        } else {
            // 当需要重绘表格时，直接使用原有的接口进行赋值，表格会自动进行重绘
            this.table.setDatasource(datasource);
        }

        return datasource;
    }

    require('esui/main').register(GridDataSet);

    return GridDataSet;
});
