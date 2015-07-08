/**
 * @file 模块 `entry/demo/hello/interactive` - Model定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoModel = require('entry/demo/Model');
    var Code = require('dataPrototype/demo/Code');

    /**
     * 模块 `entry/demo/hello/interactive` - Model定义
     *
     * @class
     * @extends {er.Model}
     */
    var overrides = {};

    /**
     * 初始化，可以在此指定dataLoader
     * this.defaultArgs中的数据已经被灌入
     * 并且context数据已经被灌入
     */
    // overrides.initialize = function () {
    //     // 注意主DataLoader请指定为类，当前Model在销毁时会自动销毁主DataLoader
    //     // 建议位置./dataLoader/MainLoader
    //     this.setDataLoader(require('./dataLoader/MainLoader'));
    // };

    /**
     * 指定dataLoaderSet，其中的dataLoader自动与当前Model关联，并且不会被销毁
     */
    // overrides.dataLoaderSet = require('./dataLoader/dataLoaderSet;')

    /**
     * 处理加载后的数据
     *
     * 这个方法用于在{@link EntryModel#.load}完毕后，调整一些数据结构
     *
     * 在该方法执行时，当前的{@link EntryModel}对象中已经有{@link EntryModel#.load}方法填充的数据，
     * 可使用{@link EntryModel#.get}、{@link EntryModel#.set}和{@link EntryModel#.remove}方法对数据进行调整
     *
     * 需要使用传入的`resolve`和`reject`方法来改变状态
     *
     * @method EntryModel#.prepare
     * @param {Function} resolve 标记当前为完成
     * @param {Function} reject 标记当前为拒绝
     * @protected
     */
    overrides.prepare = function (resolve, reject) {
        this.code = new Code({
            structure: this.get('structure'),
            steps: this.get('steps')
        });
        resolve();
    };

    /**
     * 默认参数，会被自动灌入Model中
     * @type {Object}
     */
    overrides.defaultArgs = {
        structure: {
            code: [
                'src/account/component/datatrend.component.html',
                'src/account/component/Datatrend.js',
                'src/account/component/overview.component.html',
                'src/account/component/Overview.js',

                'src/ao/package/entry.component.html',
                'src/ao/package/Entry.js',
                'src/ao/package/entry.less',
                'src/ao/package/corewords/entry.component.html',
                'src/ao/package/corewords/Entry.js',
                'src/ao/package/mobile/entry.component.html',
                'src/ao/package/mobile/Entry.js',

                'src/component/fc/header.component.html',
                'src/component/fc/Header.js',
                'src/component/fc/header.less',
                'src/component/uc/navigator.component.html',
                'src/component/uc/Navigator.js',
                'src/component/uc/navigator.less'
            ],
            usage: [
                'src/entry/demo/hello/interactive/Action.js',
                'src/entry/demo/hello/interactive/actionConf.js',
                'src/entry/demo/hello/interactive/Model.js',
                'src/entry/demo/hello/interactive/style.less',
                'src/entry/demo/hello/interactive/tpl.html',
                'src/entry/demo/hello/interactive/View.js'
            ]
        },
        steps: [
            '首先正常的准备页面：<code class="console">efc add /entry/demo/hello/interactive</code>'
                + '<br />我这里因为是继承，所以需要调整代码',
            '添加共用的 component：<br />'
                + '<code class="console">'
                + 'cd src/component<br />'
                + 'efc add component ./uc/navigator<br />'
                + 'efc add component ./fc/header'
                + '</code>',
            '为了开发方便，先引入component至 View：'
                + '（可点击<a href="#" class="focus-link" target="code-structure-usage">Code Usage</a>'
                + '查看相关代码）<br />'
                + '<code>'
                + 'require(\'fc-component-ria/component!component/uc/navigator\');<br />'
                + 'require(\'fc-component-ria/component!component/fc/header\');<br />'
                + '</code>',
            '开发 uc-navigator 和 fc-header'
                    + '（可点击<a href="#" class="focus-link" target="code-structure-detail">Code Detail</a>'
                    + '查看相关代码）',
            '增加模块 account，并简单分解了两个入口组件：账户概要信息和账户数据趋势 <br />'
                + '<code class="console">'
                + 'cd ../<br />'
                + 'mkdir account<br />'
                + '</code>'
                + '<br />添加必要的文件，并添加模块的两个组件：<br />'
                + '<code class="console">'
                + 'efc add component ./account/component/overview<br />'
                + 'efc add component ./account/component/datatrend'
                + '</code>'
                + '<br />引入到 View 中<br />'
                + '<code>'
                + 'require(\'fc-component-ria/component!account/component/overview\');<br />'
                + 'require(\'fc-component-ria/component!account/component/datatrend\');<br />'
                + '</code>',
            '同理增加模块 ao 以及子模块 ao/package，并同时创建了其子模块ao/package/corewords<br />'
                + '增加 ao/package 的入口模块：ao/package/entry 并在 View 中引入'
        ]
    };

    /**
     * 页面加载时展现loading需要的数据，配合 View.prototype.template + '-loading'来使用
     * 父类中默认有一个数据可供继承： loading
     */
    // overrides.loadingData = {
    //     loading: '<span class="view-loading">加载中...</span>'
    // };

    // 你可以使用resolveQuery方法并结合getExtraQuery和filterQuery方法来获取一个需要转向的地址

    var Model = require('eoo').create(DemoModel, overrides);

    return Model;
});
