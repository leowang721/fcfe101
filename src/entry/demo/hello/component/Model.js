/**
 * @file 模块 `entry/demo/hello/component` - Model定义
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var DemoModel = require('entry/demo/Model');
    var Code = require('dataPrototype/demo/Code');

    /**
     * 模块 `entry/demo/hello/component` - Model定义
     *
     * @class
     * @extends {er.Model}
     */
    var overrides = {};

    /**
     * 默认参数，会被自动灌入Model中
     * @type {Object}
     */
    overrides.defaultArgs = {
        structure: {
            code: [
                'src/component/demo/hello/component.component.html',
                'src/component/demo/hello/Component.js',
                'src/component/demo/hello/component.less'
            ],
            usage: [
                'src/entry/demo/hello/component/Action.js',
                'src/entry/demo/hello/component/actionConf.js',
                'src/entry/demo/hello/component/Model.js',
                'src/entry/demo/hello/component/style.less',
                'src/entry/demo/hello/component/tpl.html',
                'src/entry/demo/hello/component/View.js'
            ]
        },
        steps: [
            '确定 shell 当前路径在项目目录内',
            '执行命令：<code class="console">efc add component /component/demo/hello/component</code>',
            '在 component.component.html 中，开发组件的模板内容（注册标签自动生成）',
            '在 Component.js 中，开发逻辑功能。'
                + '请查看<a href="#" class="focus-link" target="code-structure-detail">Code Detail</a>的文件结构及内容。',
            [
                '在页面的 View 中引用 component：'
                    + '（可点击'
                    + '<a href="#" class="focus-link" target="code-structure-usage">Code Usage</a>'
                    + '的 View.js 查看相关代码）',
                '<code>require(\'fc-component-ria/component!component/demo/hello/component\');</code>'
            ].join('<br />'),
            [
                '直接在模板中使用对应的自定义标签，即 name 的值：'
                    + '（可点击<a href="#" class="focus-link" target="code-structure-usage">Code Usage</a>'
                    + '的 tpl.html 查看相关代码）',
                '<code>&lt;demo-hello-component&gt;&lt;/demo-hello-component&gt;</code>'
            ].join('<br />')
        ]
    };

    overrides.prepare = function (resolve, reject) {
        this.code = new Code({
            structure: this.get('structure'),
            steps: this.get('steps')
        });

        resolve();
    };

    var Model = require('eoo').create(DemoModel, overrides);

    return Model;
});
