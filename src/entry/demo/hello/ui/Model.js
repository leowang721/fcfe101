/**
 * @file 模块 `entry/demo/hello/ui` - Model定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoModel = require('entry/demo/Model');
    var Code = require('dataPrototype/demo/Code');

    /**
     * 模块 `entry/demo/hello/ui` - Model定义
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
                'src/component/demo/hello/ui.component.html',
                'src/component/demo/hello/Ui.js',
                'src/component/demo/hello/ui.less'
            ],
            usage: [
                'src/entry/demo/hello/ui/Action.js',
                'src/entry/demo/hello/ui/actionConf.js',
                'src/entry/demo/hello/ui/Model.js',
                'src/entry/demo/hello/ui/style.less',
                'src/entry/demo/hello/ui/tpl.html',
                'src/entry/demo/hello/ui/View.js'
            ]
        },
        steps: [
            '确定 shell 当前路径在项目目录内',
            '执行命令：<code class="console">efc add component /component/demo/hello/ui</code>',
            [
                '在自动生成的文件中，开发逻辑功能。请查看'
                    + '<a href="#" class="focus-link" target="code-structure-detail">Code Detail</a>的文件结构及内容。',
                '在这里，我们用 UI 控件来实现一个简单的搜索功能。'
            ].join('<br />'),
            [
                '在页面的 View 中引用 component：'
                    + '（可点击'
                    + '<a href="#" class="focus-link" target="code-structure-usage">Code Usage</a>'
                    + '的 View.js 查看相关代码）',
                '<code>require(\'fc-component-ria/component!component/demo/hello/ui\');</code>'
            ].join('<br />'),
            [
                '直接在模板中使用对应的自定义标签，即 name 的值：'
                    + '（可点击<a href="#" class="focus-link" target="code-structure-usage">Code Usage</a>'
                    + '的 tpl.html 查看相关代码）',
                '<code>&lt;demo-hello-ui&gt;&lt;/demo-hello-ui&gt;</code>'
            ].join('<br />')
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
