/**
 * @file component分析器，分析某个DOM节点下的component内容
 * Basic support：Chrome、Firefox3.5+、Opera10+、Safari3.2+、IE8+
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var _ = require('underscore');
    var fc = require('fc-core');
    var config = require('./config');
    var registry = require('./registry');

    /**
     * component分析器，分析某个DOM节点下的component内容
     */
    var analyser = {};

    /**
     * component分析器，分析某个DOM节点下的component内容
     * @param {HtmlElement} container DOM节点
     * @param {boolean} includeContainer 是否包括容器自身
     * @return {meta.ComponentList} componentList
     */
    analyser.analyse = function (container, includeContainer) {
        fc.assert.has(container, '分析component时必须指定容器！');
        fc.assert.has(container.getAttribute, '分析component指定的容器必须是DOM！');

        // 把dom元素存储到临时数组中
        // 控件渲染的过程会导致Collection的改变
        var rawElements = container.getElementsByTagName('*');
        var elements = [];
        _.each(rawElements, function (element) {
            if (element.nodeType === 1) {
                elements.push(element);
            }
        });

        // 加入容器自身
        if (includeContainer) {
            elements.unshift(container);
        }

        // 开始分析
        // 语义化节点的分析前提是必须已经注册
        // 所以先注册一遍
        _.each(elements, function (element) {
            var nodeName = element.nodeName;
            // 如果是一个注册声明，直接注册
            if (nodeName === config.ELEMENT_MARK) {
                registry.register(element);
            }
        });

        // 分析语义化标签
        var componentList = [];
        _.each(elements, function (element) {
            var nodeName = element.nodeName.toLowerCase();
            var componentInfo = registry.getComponent(nodeName);
            if (componentInfo) {
                componentList.push(
                    _.chain({})
                        .extend(componentInfo)
                        .extend({
                            container: container
                        })
                        .value()
                );
            }
        });

        return componentList;
    };

    return analyser;
});
