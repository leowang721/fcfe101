/**
 * @file 自定义列数据集控件
 * @author XiaobinLi （lixiaobin01@baidu.com）
 */

define(function (require) { 
    var AbstractDataSet = require('../DataSet/AbstractDataSet');
    var lib = require('esui/lib');
    var ui = require('esui');
    var underscore = require('underscore');

    /**
     * 用户自定义列控件
     * @extends AbstractDataSet
     * @constructor
     */
    function UserDefineFieldDataSet() {
        AbstractDataSet.apply(this, arguments);
    }

    lib.inherits(UserDefineFieldDataSet, AbstractDataSet);

    /**
     * 获取dom带有data-前缀的属性值
     *
     * @private
     * @return {string}
     */
    function getAttr(element, key) {
        return lib.getAttribute(element, 'data-' + key);
    }

    /**
     * 做一个custom的event，将参数包裹在data域中。
     */
    function makeEvent(params) {
        return { data: params };
    }

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
     * @property {string} type
     *
     * 控件的类型
     * @readonly
     */
    UserDefineFieldDataSet.prototype.type = 'UserDefineFieldDataSet';

    /**
     * 绘制所有的items
     * @override
     */
    UserDefineFieldDataSet.prototype.repaintAllItems = function () {
        this.renderItems();
    };

    /**
     * 将items 模板组合展示到mian区域
     */
    UserDefineFieldDataSet.prototype.renderItems = function () {
        this.main.innerHTML = this.getMainHtml();
    };

    /**
     * 在控件render之后触发事件，处理控件的click事件。若click的event target声明了
     * data-ui-dataset-wired，则处理数据集连接
     * @override
     */
    UserDefineFieldDataSet.prototype.onafterrender = function () {
        var me = this;
        lib.on(this.main, 'click', function (event) {
            var node = event.target;
            if (lib.hasClass(node, 'disable')) {
                return;
            }
            if (lib.hasClass(node, 'move')) {
                me.fire('itemmove', makeEvent({
                    key: getAttr(node, 'key'),
                    type: getAttr(node, 'type')
                }));
                return;
            }
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
    };

    UserDefineFieldDataSet.prototype.getMainHtml = function() {
        var me = this;
        var html = [];
        var datasource = this.get('datasource');
        var fieldTitleConf = this.get('fieldTitleConf');
        var itemTpl = this.get('itemTpl'); 
        var forbidRemoveFields = this.get('forbidRemoveFields');
        var idArr = me.id.split('-');
        //idArr = idArr.splice(2);
        //var ids = idArr.join('-');
        if (datasource) {
            for (var i = 0, l = datasource.length; i < l; i++) {
                var prekey = datasource[i - 1];
                var nextkey = datasource[i + 1];
                var key = datasource[i];
                // 没有找到配置，就不展示
                if (!fieldTitleConf[datasource[i]]) {
                    continue;
                }
                var title =  fieldTitleConf[datasource[i]].fieldName 
                    || fieldTitleConf[datasource[i]].title;
                html.push(lib.format(itemTpl, {
                    num: i + 1,
                    preStatusClass: prekey ? 'enable' : 'disable',
                    nextStatusClass: nextkey ? 'enable' : 'disable',
                    closeStatusClass: underscore.contains(forbidRemoveFields,
                         key) ? 'disable' : 'enable', 
                    title: title.replace(/<.*?[!>]/g, ''),
                    key: datasource[i],
                    id: me.get('mainControlId')
                }));
            }
        }
        return html.join('');
    };

    /**
     * 根据一个声明了wired自定义属性的DOM节点，返回一个数据项。
     * @param {object} element DOM节点
     * @return {string} item对象
     * @override
     */
    UserDefineFieldDataSet.prototype.getItemByNode = function (node) {
        var key = getAttr(node, 'key');
        return key;
    };

    /**
     * 绘制删除的items
     * @override
     */
    UserDefineFieldDataSet.prototype.repaintRemovedItems = function () {
        this.renderItems();
    };

    /**
     * 绘制添加的items
     * @override
     */
    UserDefineFieldDataSet.prototype.repaintAddedItems = function () {
        this.renderItems();
    };

    ui.register(UserDefineFieldDataSet);

    return UserDefineFieldDataSet;
});
