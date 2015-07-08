/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @file 手风琴控件组合可扩展的Tree
 * @author Pride Leong(liangjinping@baidu.com)
 */

define( function (require) {
    
    var lib = require('../../lib');
    var fcui = require('../../main');
    var Extension = require('../../Extension');
    var Accordion = require('../../Accordion');
    var TreeStrategy = require('../../TreeStrategy');

    /**
     * 手风琴组合可拓展的Tree
     *
     * @constructor
     */
    function AccordionExtTree() {
        Extension.apply(this, arguments);
    }

    /**
     * 指定扩展类型，始终为`"AccordionExtTree"`
     *
     * @type {string}
     */
    AccordionExtTree.prototype.type = 'AccordionExtTree';

    /**
     * 激活扩展
     *
     * @override
     */
    AccordionExtTree.prototype.activate = function () {
        var target = this.target;
        if (!(target instanceof Accordion)) {
            return;
        }
        // 手风琴创建节点后，创建一棵与节点对应空树
        target.on('contentcontainercreated', function (event) {
            var main = event.node;
            var root = event.data;
            var strategy = new TreeStrategy();
            strategy.isLeafNode = function (node) {
                return node.isLeaf;
            };
            var extraOpts = target.get('extraOptions');
            // 将手风琴的节点数据源作为树的根节点数据源，起绑定作用
            // 需要设置children为空数组，否则Tree会报错
            root.children = [];
            // 创建一棵空树
            var options = {
                // 根据手风琴的id来取id值，以便在viewContext中获取
                id: root.id + '-accordion-tree',
                datasource: root,
                strategy: strategy,
                wideToggleArea: false,
                hideRoot: true
            };
            if (extraOpts && extraOpts.tree) {
                $.extend(options, extraOpts.tree);
            }
            var tree = fcui.create('Tree', options);
            target.addChild(tree);
            tree.appendTo(main);
            tree.on('expand', function (event) {
                target.fire('contentexpand', {node: event.node});
            });
            tree.on('selectnode', function (event) {
                target.fire('contentselect', event);
            });
            target.fire('contentnodecreated', {item: root, node: tree});
        });
        // 注意：其余accordion的接口修改可以通过sidebar.accordion设置
        Extension.prototype.activate.apply(this, arguments);
    };

    /**
     * 取消扩展的激活状态
     *
     * @override
     */
    AccordionExtTree.prototype.inactivate = function () {
        var target = this.target;
        if (!(target instanceof Accordion)) {
            return;
        }

        Extension.prototype.inactivate.apply(this, arguments);
    };

    lib.inherits(AccordionExtTree, Extension);
    fcui.registerExtension(AccordionExtTree);
    
    return AccordionExtTree;
});
