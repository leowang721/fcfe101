/**
 * @file 模块 `entry/demo` - View定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var $ = require('jquery');

    var EntryView = require('fc-view/mvc/EntryView');

    require('fc-component-ria/component!component/fc/code/viewer');

    // 加载tpl
    require('etpl/tpl!./tpl.html');

    require('fcui/FcTree');
    var TreeStrategy = require('fcui/TreeStrategy');

    /**
     * 模块 `entry/demo` - View定义
     *
     * @class
     * @extends {er.View}
     */
    var overrides = {};

    /**
     * 配置UI属性
     */
    overrides.getUIProperties = function () {
        var code = this.model.code;
        return {
            'code-structure-detail-tree': {
                datasource: code.getCodeTreeDatasource(),
                strategy: new TreeStrategy({
                    defaultExpand: true
                }),
                skin: 'folder'
            },
            'code-structure-usage-tree': {
                datasource: code.getUsageTreeDatasource(),
                strategy: new TreeStrategy({
                    defaultExpand: true
                }),
                skin: 'folder'
            }
        };
    };

    /**
     * 配置UI事件
     */
    overrides.uiEvents = {
        'code-structure-detail-tree:selectnode': 'changeCodePath',
        'code-structure-usage-tree:selectnode': 'changeCodePath'
    };

    /**
     * 界面渲染完成之后的事件处理，enterDocument已被占用
     */
    overrides.customDocument = function () {
        $('.focus-link').on('click', function (e) {
            var target = $(e.target).attr('target');
            var targetDom = $('.' + target);

            $(document).scrollTop(targetDom.offset().top);
            targetDom.addClass('focus');
            setTimeout(function () {
                targetDom.removeClass('focus');
            }, 2800);
            e.preventDefault();
        });
    };

    overrides.changeCodePath = function (e) {
        if (e.node.filePath) {
            // 清理已选中的
            var tree = this.get(
                e.target.id === 'code-structure-detail-tree'
                    ? 'code-structure-usage-tree'
                    : 'code-structure-detail-tree'
            );
            if (tree) {
                var selected = tree.getSelectedNodes();
                if (selected && selected[0]) {
                    tree.unselectNode(selected[0].id);
                }
            }

            this.fire('codepathchange', e.node);
        }
    };

    // 使用get获取UI，使用getComponent获取component
    // 使用waitAlert和waitConfirm方法来进行交互，并且使用promise链式处理


    var View = require('eoo').create(EntryView, overrides);

    return View;
});
