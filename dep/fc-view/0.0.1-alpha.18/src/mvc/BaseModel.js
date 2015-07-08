/**
 * @file fc-view BaseModel
 * 整体模式修改，基于emc/Model实现
 * 当前整体模式基于ecomfe/er/4.0/feature/mvc的Model实现
 *
 * @author Gray Zhang(otakustay@gmail.com)
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var _ = require('underscore');
    var fc = require('fc-core');
    var Promise = require('fc-core/Promise');
    require('./DataLoader');

    /**
     * 在ER框架中，Model并不一定要继承该类，任何对象都可以作为Model使用
     *
     * ER对于Model的处理如下：
     *
     * 1. 通过{@Action#.createModel}方法创建一个对象，或通过其它手段通过{@link Action#.setModel}提供{@link Model}实例
     * 2. 如果该对象有`load`函数，则执行该函数，并分为以下情况，通过`Promise`处理异步
     * 3. 如果对象没有`load`函数，则默认对象本身就是Model
     * 4. 当离开Action时，如果Model有`dispose`方法，则会调用以销毁对象
     *
     * 该Model类为一个通用的可配置的基类，提供了数据加载的相关方法
     *
     * @class meta.BaseModel
     *
     * @extends emc.Model
     */
    var overrides = {};

    /**
     * @constructor
     * @param {Object} context 初始化的数据
     */
    overrides.constructor = function (context) {
        var me = this;
        me.$super(arguments);

        // 配置dataLoaderSet
        _.each(me.dataLoaderSet, function (item) {
            item.setStore(me);
        });

        // 初始化函数，用于在无法修改构造函数的情况下手动使用
        me.initialize();
    };

    /**
     * 初始化函数，用于在无法修改构造函数的情况下手动使用
     *
     * @method BaseModel#.initialize
     * @protected
     */
    overrides.initialize = _.noop;

    /**
     * dataLoaderSet，不会被销毁，只会被解除store的锁定
     * @type {Object}
     */
    overrides.dataLoaderSet = {};

    /**
     * 加载数据，在完成数据处理后返回
     *
     * @method BaseModel#.load
     *
     * @return {Promise | undefined} 方法会在{@link BaseModel#.prepare}之后再返回
     */
    overrides.load = function () {
        var dataLoader = this.getDataLoader();
        var loading = Promise.cast(dataLoader ? dataLoader.load() : []);
        if (this.prepare) {
            return loading.then(_.bind(this.forwardToPrepare, this));
        }
        return loading;
    };

    /**
     * 获取值，因为emc的Model获取引用类型时是直接返回，可能导致意外修改，所以fix一下
     *
     * @method BaseModel#.get
     *
     * @param {string} name 属性名
     * @return {*} `name`对应的值
     *
     * @throws {Error} 当前对象已经销毁
     * @throws {Error} 未提供`name`参数
     */
    overrides.get = function () {
        return _.deepClone(this.$super(arguments));
    };

    /**
     * 设置值
     *
     * @method BaseModel#.set
     *
     * @param {string} name 属性名
     * @param {*} value 对应的值
     * @param {Object} [options] 相关选项
     * @param {boolean} [options.silent=false] 如果该值为`true`则不触发{@link BaseModel#.event:change|change事件}
     *
     * @fires change
     * @throws {Error} 当前对象已经销毁
     * @throws {Error} 未提供`name`参数
     * @throws {Error} 未提供`value`参数
     */
    overrides.set = function (name, value, options) {
        if (!this.store) {
            throw new Error('This model is disposed');
        }

        if (!name) {
            throw new Error('Argument name is not provided');
        }

        if (arguments.length < 2) {
            throw new Error('Argument value is not provided');
        }

        options = options || {};

        var changeType = this.store.hasOwnProperty(name) ? 'change' : 'add';
        var oldValue = _.deepClone(this.store[name]);
        this.store[name] = value;

        if (oldValue !== value && !options.silent) {
            var event = {
                name: name,
                oldValue: oldValue,
                newValue: value,
                changeType: changeType
            };
            /**
             * 属性值发生变化时触发
             *
             * @event BaseModel#.change
             *
             * @property {string} name 发生变化的属性的名称
             * @property {string} changeType 变化的类型，取值为`"add"`、`"change"`或`"remove"`
             * @property {*} oldValue 变化前的值
             * @property {*} newValue 变化后的值
             */
            this.fire('change', event);
            this.fire('change:' + name, event);
        }
    };

    /**
     * 提供一个更新的方法，主要是针对着PlainObject，行为是更新而不是替换
     * 数组依然是替换
     * @param {string} key 要更新的字段名称
     * @param {*} toUpdate 要更新的数据
     * @param {Object} [options] 相关选项
     * @param {boolean} [options.silent=false] 如果该值为`true`则不触发{@link BaseModel#.event:change|change事件}
     */
    overrides.update = function (key, toUpdate, options) {
        var origValue = this.get(key);
        if (_.isObject(origValue)) {
            _.deepExtend(origValue, toUpdate);
            this.set(key, origValue, options);
        }
        else {
            this.set(key, toUpdate, options);
        }
    };

    /**
     * 加载数据后进入数据准备阶段
     *
     * @method BaseModel#.forwardToPrepare
     * @protected
     *
     * @param {meta.DataLoadResult[]} results 数据加载的结果集
     * @return {meta.DataLoadResult[]} 数据加载的结果集
     */
    overrides.forwardToPrepare = function (results) {
        return new Promise(_.bind(this.prepare, this)).then(
            function () {
                var success = {
                    success: true,
                    name: '$prepare',
                    options: {}
                };
                results.push(success);
                return results;
            },
            function (ex) {
                var error = {
                    success: false,
                    name: '$prepare',
                    options: {},
                    error: ex
                };
                results.push(error);
                return results;
            }
        );
    };

    /**
     * 处理加载后的数据
     *
     * 这个方法用于在{@link BaseModel#.load}完毕后，调整一些数据结构
     *
     * 在该方法执行时，当前的{@link BaseModel}对象中已经有{@link BaseModel#.load}方法填充的数据，
     * 可使用{@link BaseModel#.get}、{@link BaseModel#.set}和{@link BaseModel#.remove}方法对数据进行调整
     *
     * 需要使用传入的`resolve`和`reject`方法来改变状态
     *
     * @method BaseModel#.prepare
     * @protected
     * @param {Function} resolve 标记当前为完成
     * @param {Function} reject 标记当前为拒绝
     */
    overrides.prepare = function (resolve, reject) {
        resolve();
    };

    /*
     * 根据传入的属性名获取一个组装后的对象
     *
     * @param {Array.<string> | string...} names 需要的属性名列表
     * @return {Object} 包含`names`参数指定的属性的对象
     */
    overrides.getPart = function (names) {
        if (Object.prototype.toString.call(names) !== '[object Array]') {
            names = [].slice.call(arguments);
        }

        var part = {};
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            part[name] = this.get(name);
        }
        return part;
    };

    /**
     * 销毁当前{@link BaseModel}对象，会尝试停止所有正在加载的数据
     *
     * @method BaseModel#.dispose
     */
    overrides.dispose = function () {
        this.$super();
        var dataLoader = this.getDataLoader();
        if (dataLoader) {
            dataLoader.dispose();
            dataLoader = null;
        }
        // 配置dataLoaderSet
        _.each(this.dataLoaderSet, function (item) {
            item.setStore(null);
        });
    };

    /**
     * 获取关联数据加载器
     *
     * @method BaseModel#.getDataLoader
     *
     * @return {DataLoader}
     * @protected
     */
    overrides.getDataLoader = function () {
        return this.dataLoader;
    };

    /**
     * 设置关联的数据加载器
     *
     * @method BaseModel#.setDataLoader
     *
     * @param {DataLoader} dataLoader 需要关联的数据加载器实例
     * @protected
     */
    overrides.setDataLoader = function (dataLoader) {
        dataLoader.setStore(this);
        this.dataLoader = dataLoader;
    };

    /**
     * 增加一个关联数据加载器
     * @method BaseModel#.addDataLoader
     * @param {string} name 需要关联的数据加载器实例的名字
     * @param {DataLoader} dataLoader 需要关联的数据加载器实例
     */
    overrides.addDataLoader = function (name, dataLoader) {
        if (this.dataLoaderSet[name]) {
            // 先remove掉
            this.removeDataLoader(name);
        }
        this.dataLoaderSet[name] = dataLoader;
        dataLoader.setStore(this);
    };

    /**
     * 删除一个关联数据加载器
     * @method BaseModel#.addDataLoader
     * @param {string} name 需要关联的数据加载器实例的名字
     */
    overrides.removeDataLoader = function (name) {
        if (!this.dataLoaderSet[name]) {
            return;
        }
        this.dataLoaderSet[name].setStore(null);
        delete this.dataLoaderSet[name];
    };

    var BaseModel = fc.oo.derive(require('emc/Model'), overrides);
    BaseModel.formatter = require('./formatter');

    return BaseModel;
});
