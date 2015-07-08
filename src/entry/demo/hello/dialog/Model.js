/**
 * @file 模块 `entry/demo/hello/dialog` - Model定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoModel = require('entry/demo/Model');
    var Code = require('dataPrototype/demo/Code');

    /**
     * 模块 `entry/demo/hello/dialog` - Model定义
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
                'src/component/demo/hello/ajax.component.html',
                'src/component/demo/hello/Ajax.js',
                'src/component/demo/hello/ajax.less'
            ],
            usage: [
                'src/entry/demo/hello/dialog/Action.js',
                'src/entry/demo/hello/dialog/actionConf.js',
                'src/entry/demo/hello/dialog/Model.js',
                'src/entry/demo/hello/dialog/style.less',
                'src/entry/demo/hello/dialog/tpl.html',
                'src/entry/demo/hello/dialog/View.js'
            ]
        },
        steps: [
            '可以直接以浮出层的形式呼出组件',
            [
                '但是要显示的指定模板，这是因为平面化会自动灌入模板，而浮出层不会。可以使用的方式：',
                '1) 在组件的js文件中处理，例如：',
                '<code>overrides.templateName = \'demo-hello-ajax\'</code>',
                '2) 在调用的地方直接传入 template 或者 templateName：',
                '<code>var dialog = new DemoAjax({templateName: \'demo-hello-ajax\'});</code>'
            ].join('<br />'),
            '直接 require 对应的 Component 文件，以使用类的方式创建新实例，并调用 enter 方法打开界面',
            '直接在 Component 的 js 文件中配置相关的按钮属性和事件（因为这么使用就意味着需要考虑浮出层模式的开发了）',
            '参考 BaseComponent.js 的注释及源码确定更多的使用方式和配置'
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
