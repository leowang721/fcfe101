/**
 * @file mock列表处理类
 * - 提供在edp生命周期内的持久化列表解决方案
 * - 提供对列表的访问接口(基于memset的find/remove)
 * - 提供结构化的分页数据处理
 *
 * @author XingDa(xingda@baidu.com)
 */

define(function (require, exports) {
    var Memset = require('memset');
    var storage = require('storage');
    var random = require('random');
    var util = require('lib/util');

    /**
     * 持久化list存储前缀
     * @type {string}
     * @const
     */
    var LIST_STORAGE_PREFIX = 'debug_list_';

    /**
     * 默认的分页条目数
     * @type {number}
     * @const
     */
    var DEFAULT_LIST_PAGE_SIZE = 10;

    /**
     * 默认的列表初始条目数
     * @type {number}
     * @const
     */
    var DEFAULT_LIST_TOTAL_COUNT = 50;

    /**
     * 默认的列表排序模式
     * @type {string}
     * @const
     */
    var DEFAULT_LIST_SORT_TYPE = 'desc';

    /**
     * 创建列表条目
     * @param {Object} itemStructure 条目结构
     *      条目结构以字段名称作为key，字段内容作为value
     *      字段内容可以为一个处理函数，接收当前条目处理结果作为参数
     * @return {Object}
     */
    function createItem(itemStructure) {
        var item = {};

        for (var key in itemStructure) {
            if (itemStructure.hasOwnProperty(key)) {
                if (typeof itemStructure[key] === 'function') {
                    item[key] = itemStructure[key](item);
                } else {
                    item[key] = itemStructure[key];
                }
            }
        }

        return item;
    }

    /**
     * 列表处理类
     * @param {Object} options 选项参数
     *      @item {string} id 列表标识索引，用于持久化存储
     *      @item {Object} itemStructure 列表条目结构
     *      @item {number=} totalCount 需要创建的列表条目数
     *      @item {number=} pageSize 分页条目数
     * @constructor
     */
    function BizList(options) {
        var list = [];
        var itemStructure = options.itemStructure || {};
        var totalCount = options.totalCount || DEFAULT_LIST_TOTAL_COUNT;

        while (totalCount--) {
            list.push(createItem(itemStructure));
        }

        /**
         * 列表唯一标识
         * @type {string}
         * @private
         */
        this._id = options.id;

        /**
         * 列表数据集
         * 使用memset
         * @type {Memset}
         * @private
         */
        this._memset = new Memset(list);

        /**
         * 列表分页条目数
         * @type {number}
         * @private
         */
        this._pageSize = options.pageSize || DEFAULT_LIST_PAGE_SIZE;
    }

    /**
     * 获取列表原始数据集
     * @return {Array}
     */
    BizList.prototype.getOriginalData = function () {
        return this._memset.set;
    };

    /**
     * 获取列表条目数
     * @return {number}
     */
    BizList.prototype.getTotalCount = function () {
        return this.getOriginalData().length;
    };

    /**
     * 获取查询结果集
     * 直接使用memset的find
     * @returns {Array}
     */
    BizList.prototype.find = function () {
        return Memset.prototype.find.apply(this._memset, arguments);
    };

    /**
     * 从列表中删除匹配的数据
     * 直接使用memset的remove
     * @returns {number}
     */
    BizList.prototype.remove = function () {
        return Memset.prototype.remove.apply(
            this._memset, arguments
        );
    };

    /**
     * 增加一条列表记录
     * @param {number} index
     * @param {Object} item
     */
    BizList.prototype.add = function (index, item) {
        this._memset.insert(item);
    };

    /**
     * 列表排序
     * @param {string} sortField
     * @param {string} sortOrder
     * @return {Array}
     */
    BizList.prototype.sort = function (sortField, sortOrder) {
        sortOrder = sortOrder || DEFAULT_LIST_SORT_TYPE;
        this._memset.set.sort(function (a, b) {
            if (!a.hasOwnProperty(sortField) || !b.hasOwnProperty(sortField)) {
                return -1;
            }
            var sortItemA = a[sortField];
            var sortItemB = b[sortField];

            if (typeof sortItemA !== typeof sortItemB) {
                sortItemA = sortItemA + '';
                sortItemB = sortItemB + '';
            }

            var sortItemType = typeof sortItemA;
            if (sortItemType === 'string') {
                return sortItemA.localeCompare(sortItemB);
            }
            if (sortItemType === 'number') {
                return sortItemA - sortItemB;
            }

            return -1;
        });

        if (sortOrder.toLowerCase() === 'desc') {
            this._memset.set.reverse();
        }

        return this._memset.set;
    };

    /**
     * 获取列表中指定范围的数据集
     * @param {number} startIndex 范围下限
     * @param {number} endIndex 范围上限
     * @returns {Array}
     */
    BizList.prototype.getRange = function (startIndex, endIndex) {
        return this._memset.set.slice(startIndex, endIndex + 1);
    };

    /**
     * 设置分页条目数
     * @param {number} pageSize 分页条目数
     * @returns {BizList}
     * @deprecated
     */
    BizList.prototype.setPageSize = function (pageSize) {
        this._pageSize = Math.floor(pageSize);
        return this;
    };

    /**
     * 获取分页条目数
     * @returns {number}
     * @deprecated
     */
    BizList.prototype.getPageSize = function () {
        return this._pageSize;
    };

    /**
     * 获取分页总数
     * @returns {number}
     * @deprecated
     */
    BizList.prototype.getPageCount = function () {
        var totalCount = this.getTotalCount();
        var pageSize = this.getPageSize();
        return Math.ceil(totalCount / pageSize);
    };

    /**
     * 获取指定页面的分页数据
     * @param {number} pageIndex
     * @returns {Object} 返回结构化的分页数据
     */
    BizList.prototype.getPage = function (pageIndex) {
        var totalCount = this.getTotalCount();
        var pageSize = this.getPageSize();
        var pageCount = this.getPageCount();

        if (pageIndex > pageCount) {
            pageIndex = pageCount;
        }

        if (pageIndex < 1) {
            pageIndex = 1;
        }

        var startIndex = (pageIndex - 1) * pageSize;
        var endIndex = startIndex + pageSize - 1;

        return {
            listData: this.getRange(startIndex, endIndex),
            totalCount: totalCount,

            /**
             * TODO(xingda): 目前仍有功能用到该数据项，将会整理后删除
             * @deprecated
             */
            list: this.getRange(startIndex, endIndex),

            /**
             * TODO(xingda): 目前仍有功能用到该数据项，将会整理后删除
             * @deprecated
             */
            pageNo: pageIndex,

            /**
             * TODO(xingda): 目前仍有功能用到该数据项，将会整理后删除
             * @deprecated
             */
            pageIndex: pageIndex,

            /**
             * TODO(xingda): 目前仍有功能用到该数据项，将会整理后删除
             * @deprecated
             */
            pageSize: pageSize,

            /**
             * TODO(xingda): 目前仍有功能用到该数据项，将会整理后删除
             * @deprecated
             */
            pageCount: pageCount
        };
    };

    /**
     * 设置列表持久化存储
     * @param {string} id 列表唯一标识
     * @param {BizList} list 列表实例
     */
    function setBizListStorage (id, list) {
        storage.set(LIST_STORAGE_PREFIX + id, list);
    }

    /**
     * 创建列表实例
     * @param {Object} options 选项参数，与BizList构造类传入参数一致
     * @returns {BizList}
     */
    BizList.create = function (options) {
        var id = options.id;

        // 优先从storage中获取持久化数据
        var listStorage = BizList.get(id);
        if (listStorage) {
            return listStorage;
        }

        var list = new BizList(options);

        setBizListStorage(id, list);
        return list;
    };

    /**
     * 获取持久化列表实例
     * @param {string} id 列表唯一标识
     * @returns {BizList}
     */
    BizList.get = function (id) {
        return storage.get(LIST_STORAGE_PREFIX + id) || null;
    };

    return BizList;
});