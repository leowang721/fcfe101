/**
 * @file demo/Code 基类，供继承使用
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

define(function (require) {
    var _ = require('underscore');

    /**
     * demo/Code 基类，供继承使用
     *
     * @type {Object}
     */
    var proto = {

        /**
         * 构造函数
         * @constructor
         *
         * @param {Obejct=} options 构造的配置
         */
        constructor: function (options) {
            _.extend(this, options);
            this.initialize();
        },

        initialize: function () {

        },

        getCodeTreeDatasource: function () {
            return getDatasource(this.structure.code);
        },

        getUsageTreeDatasource: function () {
            return getDatasource(this.structure.usage);
        }
    };

    /**
     * 生成 Tree 使用的 datasource
     *
     * @param {Array} codeList 文件路径数组
     *
     * @return {Object} 生成的给 Tree 使用的 datasource
     */
    function getDatasource(codeList) {
        var datasource;
        _.each(codeList, function (eachFile, fileIndex) {

            if (!datasource) {
                datasource = {
                    id: '1',
                    text: 'src'
                };
            }

            var pathList = eachFile.split('/');

            var currentChildren = datasource;
            var currentId = (fileIndex + 1) + '';

            _.each(pathList, function (eachPath, pathIndex) {
                if (pathIndex === 0 && eachPath !== 'src') {
                    throw new Error('没有以 src 开头')
                }

                if (!currentChildren.children) {
                    currentChildren.children = [];
                }

                if (pathIndex > 0) {

                    currentChildren = currentChildren.children;
                    currentId += (pathIndex + 1);

                    var foundIndex = _.findIndex(currentChildren, function (eachChild) {
                        return eachChild.text === eachPath;
                    });

                    if (foundIndex > -1) {  // found
                        currentChildren = currentChildren[foundIndex];
                        return;
                    }

                    var toPush = {
                        id: currentId,
                        text: eachPath
                    };

                    if (pathIndex === pathList.length - 1) {
                        toPush.filePath = eachFile;
                    }

                    currentChildren.push(toPush);
                    currentChildren = currentChildren[currentChildren.length - 1];
                }
            });
        });

        return datasource || {};
    }

    require('common/oo').initAbstractProps.apply(proto, [
        'name',
        'description',
        'path',
        'structure',
        'steps'
    ]);
    require('common/oo').initAbstractMethods.apply(proto, [
        'toString'
    ]);

    var Code = require('fc-core/oo').create(proto);

    return Code;
});
