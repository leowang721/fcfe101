/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} main
 */
define(function (require) {
    var u = require('underscore');
    var main = require('esui/main');
    main.esuiVersion = main.version;

    // ESUI中的4种class：
    // Control
    // Extension
    // Global Extension
    // Rules
    // 在ESUI中，它们分别注册在各自的闭包容器中。在fcui/main中，接管了所有4种class的注册和创建，
    // FCUI的class容器与ESUI的是不同的。若FCUI的初始化比ESUI迟，在两者初始化之间的class，都只注册在
    // ESUI中而不注册在FCUI的class容器中。当FCUI初始化后，create被接管，当create只存在于ESUI的class
    // 容器中的物件时，会出错。
    // 这里fix 4个create方法，同时调用ESUI版本和FCUI版本，并拼接两个返回，或返回不为空的那个结果。

    /**
     * 绑定全局扩展
     *
     * 通过此方法绑定的扩展，会对所有的控件实例生效
     *
     * 每一次全局扩展生成实例时，均会复制`options`对象，而不会直接使用引用
     *
     * 派生自ESUI 3.1.0-beta.3
     * @param {string} type 扩展类型
     * @param {Object} option 扩展初始化参数
     */
    main.attachExtension = function (type, option) {
        if (typeof this.globalExtensionOptions === 'undefined') {
            this.globalExtensionOptions = {};
        }
        this.globalExtensionOptions[type] = option || {};
    };

    var esuiCreateGlobalExtensions = main.createGlobalExtensions;

    /**
     * 创建全局扩展对象
     * ESUI里的实现有误，修正过来
     *
     * @return {Extension[]}
     */
    main.createGlobalExtensions = function () {
        var options = this.globalExtensionOptions;
        var extensions = [];
        u.each(options, function (option, type) {
            var extension = this.createExtension(type, option);
            extension && extensions.push(extension);
        }, this);

        return extensions.concat(esuiCreateGlobalExtensions());
    };

    /**
     * 控件库配置数据
     *
     * @type {Object}
     * @ignore
     */
    var config = {
        uiPrefix: 'data-ui',
        extensionPrefix: 'data-ui-extension',
        customElementPrefix: 'esui',
        instanceAttr: 'data-ctrl-id',
        viewContextAttr: 'data-ctrl-view-context',
        uiClassPrefix: 'ui',
        skinClassPrefix: 'skin',
        stateClassPrefix: 'state'
    };

    /**
     * 从容器DOM元素批量初始化内部的控件渲染
     * 派生自ESUI 3.1.0-beta.3。
     * 做了如下改动
     * 1. options里加了group参数。指定的话，本次init的所有元素将放入指定的
     *    group中。
     * @param {HTMLElement} [wrap=document.body] 容器DOM元素，默认
     * @param {Object} [options] init参数
     * @param {Object} [options.viewContext] 视图环境
     * @param {Object} [options.properties] 属性集合，通过id映射
     * @param {Object} [options.valueReplacer] 属性值替换函数
     * @param {Object} [options.parent] 初始化的元素共有的父元素
     * @param {Object} [options.group] 初始化的元素共有的组
     * @return {Control[]} 初始化的控件对象集合
     */
    /* eslint-disable fecs-max-statements */
    /* 从ESUI拿的旧的main，暂时去掉50行的限制 */
    main.init = function (wrap, options) {
        wrap = wrap || document.body;
        options = options || {};

        var valueReplacer = options.valueReplacer || function (value) {
            return value;
        };

        /**
         * 将字符串数组join成驼峰形式
         *
         * @param {string[]} source 源字符串数组
         * @return {string}
         * @ignore
         */
        function joinCamelCase(source) {
            function replacer(c) {
                return c.toUpperCase();
            }

            for (var i = 1, len = source.length; i < len; i++) {
                source[i] = source[i].replace(/^[a-z]/, replacer);
            }

            return source.join('');
        }

        /**
         * 不覆盖目标对象成员的extend
         *
         * @param {Object} target 目标对象
         * @param {Object} source 源对象
         * @ignore
         */
        function noOverrideExtend(target, source) {
            for (var key in source) {
                if (!(key in target)) {
                    target[key] = source[key];
                }
            }
        }

        /**
         * 将标签解析的值附加到option对象上
         *
         * @param {Object} optionObject option对象
         * @param {string[]} terms 经过切分的标签名解析结果
         * @param {string} value 属性值
         * @ignore
         */
        function extendToOption(optionObject, terms, value) {
            if (terms.length === 0) {
                noOverrideExtend(
                    optionObject,
                    main.parseAttribute(value, valueReplacer)
                );
            }
            else {
                optionObject[joinCamelCase(terms)] = valueReplacer(value);
            }
        }

        function matchReplace(match, ch) {
            return ch.toUpperCase();
        }

        // 把dom元素存储到临时数组中
        // 控件渲染的过程会导致Collection的改变
        var rawElements = wrap.getElementsByTagName('*');
        var elements = [];
        var i;
        var len;
        for (i = 0, len = rawElements.length; i < len; i++) {
            if (rawElements[i].nodeType === 1) {
                elements.push(rawElements[i]);
            }
        }

        var uiPrefix = main.getConfig('uiPrefix');
        var extPrefix = main.getConfig('extensionPrefix');
        var customElementPrefix = main.getConfig('customElementPrefix');
        var uiPrefixLen = uiPrefix.length;
        var extPrefixLen = extPrefix.length;
        var properties = options.properties || {};
        var controls = [];
        for (i = 0, len = elements.length; i < len; i++) {
            var element = elements[i];

            // 有时候，一个控件会自己把`main.innerHTML`生成子控件，比如`Panel`，
            // 但这边有缓存这些子元素，可能又会再生成一次，所以要去掉
            if (element.getAttribute(config.instanceAttr)) {
                continue;
            }

            var attributes = element.attributes;
            var controlOptions = {};
            var extensionOptions = {};
            var terms;
            var extOption;

            // 解析attribute中的参数
            for (var j = 0, attrLen = attributes.length; j < attrLen; j++) {
                var attribute = attributes[j];
                var name = attribute.name;
                var value = attribute.value;

                if (name.indexOf(extPrefix) === 0) {
                    // 解析extension的key
                    terms = name.slice(extPrefixLen + 1).split('-');
                    var extKey = terms[0];
                    terms.shift();

                    // 初始化该key的option对象
                    extOption = extensionOptions[extKey];
                    if (!extOption) {
                        extOption = extensionOptions[extKey] = {};
                    }

                    extendToOption(extOption, terms, value);
                }
                else if (name.indexOf(uiPrefix) === 0) {
                    terms = name.length === uiPrefixLen
                        ? []
                        : name.slice(uiPrefixLen + 1).split('-');
                    extendToOption(controlOptions, terms, value);
                }
            }

            // 根据选项创建控件
            var type = controlOptions.type;
            if (!type) {
                var nodeName = element.nodeName.toLowerCase();
                var esuiPrefixIndex = nodeName.indexOf(customElementPrefix);
                if (esuiPrefixIndex === 0) {
                    var typeFromCustomElement = nodeName.replace(
                        /-(\S)/g,
                        matchReplace
                    );
                    typeFromCustomElement = typeFromCustomElement.slice(
                        customElementPrefix.length
                    );
                    controlOptions.type = typeFromCustomElement;
                    type = typeFromCustomElement;
                }
            }
            if (type) {
                // 从用户传入的properties中merge控件初始化属性选项
                var controlId = controlOptions.id;
                var customOptions = controlId
                    ? properties[controlId]
                    : {};
                var key;

                for (key in customOptions) {
                    if (customOptions.hasOwnProperty(key)) {
                        controlOptions[key] = valueReplacer(customOptions[key]);
                    }
                }

                // 创建控件的插件
                var extensions = controlOptions.extensions || [];
                controlOptions.extensions = extensions;
                for (key in extensionOptions) {
                    if (extensionOptions.hasOwnProperty(key)) {
                        extOption = extensionOptions[key];
                        var extension = main.createExtension(
                            extOption.type,
                            extOption
                        );
                        extension && extensions.push(extension);
                    }
                }

                // 绑定视图环境和控件主元素
                controlOptions.viewContext = options.viewContext;
                // 容器类控件会需要渲染自己的`innerHTML`，
                // 这种渲染使用`initChildren`，再调用`main.init`，
                // 因此需要把此处`main.init`的参数交给控件，方便再带回来，
                // 以便`properties`、`valueReplacer`之类的能保留
                controlOptions.renderOptions = options;
                controlOptions.main = element;
                if (typeof options.group !== 'undefined') {
                    controlOptions.group = options.group;
                }

                // 创建控件
                var control = main.create(type, controlOptions);
                if (control) {
                    controls.push(control);
                    if (options.parent) {
                        options.parent.addChild(control);
                    }
                    try {
                        control.render();
                    }
                    catch (ex) {
                        var error = new Error(
                            'Render control '
                                + '"' + (control.id || 'anonymous') + '" '
                                + 'of type ' + control.type + ' '
                                + 'failed because: '
                                + ex.message
                        );
                        error.actualError = ex;
                        throw error;
                    }
                }
            }
        }

        return controls;
    };
    /* eslint-enable fecs-max-statements */

    // 导入register相关的代码，因为要做alias
    //

    /**
     * 控件类容器
     *
     * @type {Object}
     * @ignore
     */
    var controlClasses = {};

    /**
     * 注册控件类
     *
     * 该方法通过类的`prototype.type`识别控件类型信息。
     *
     * @param {Function} controlClass 控件类
     * @throws
     * 已经有相同`prototype.type`的控件类存在，不能重复注册同类型控件
     */
    main.register = function (controlClass) {
        registerClass(controlClass, controlClasses);
    };

    /**
     * 用别名注册一个控件
     * @param {string} aliasName 别名
     * @param {Control} control 控件类
     * @return {Control} 直接返回control
     */
    main.alias = function (aliasName, control) {
        registerAlias(aliasName, control, controlClasses);
        return control;
    };

    /**
     * 给控件一个别名。可以根据别名找到控件，但控件本身的type仍不变。
     *
     * @param {string} aliasName 控件别名
     * @param {Function} classFunc 控件类
     * @param {Object} container 类容器
     */
    function registerAlias(aliasName, classFunc, container) {
        if (typeof classFunc === 'function') {
            if (aliasName in container) {
                throw new Error(aliasName + ' is exists!');
            }

            container[aliasName] = classFunc;
        }
    }

   /**
     * 注册类。用于控件类、规则类或扩展类注册
     *
     * @param {Function} classFunc 类Function
     * @param {Object} container 类容器
     * @ignore
     */
    function registerClass(classFunc, container) {
        if (typeof classFunc === 'function') {
            var type = classFunc.prototype.type;
            if (type in container) {
                throw new Error(type + ' is exists!');
            }

            container[type] = classFunc;
        }
    }

    /**
     * 扩展类容器
     *
     * @type {Object}
     * @ignore
     */
    var extensionClasses = {};

    /**
     * 注册扩展类。
     *
     * 该方法通过类的`prototype.type`识别扩展类型信息
     *
     * @param {Function} extensionClass 扩展类
     * @throws
     * 已经有相同`prototype.type`的扩展类存在，不能重复注册同类型扩展
     */
    main.registerExtension = function (extensionClass) {
        registerClass(extensionClass, extensionClasses);
    };

    var esuiCreateExtension = main.createExtension;

    /**
     * 创建扩展
     *
     * @param {string} type 扩展类型
     * @param {Object} options 初始化参数
     * @return {Extension}
     */
    main.createExtension = function (type, options) {
        // 若有扩展先于FCUI main初始化时register，则这些扩展会放在ESUI的闭包classes中，
        // 这里若本地FCUI找不到想要的扩展，则回退到ESUI中。
        return createInstance(type, options, extensionClasses)
            || esuiCreateExtension(type, options);
    };

    /**
     * 验证规则类容器
     *
     * @type {Object}
     * @ignore
     */
    var ruleClasses = [];

    /**
     * 注册控件验证规则类
     *
     * 该方法通过类的`prototype.type`识别验证规则类型信息
     *
     * @param {Function} ruleClass 验证规则类
     * @param {number} priority 优先级，越小的优先级越高
     * @throws
     * 已经有相同`prototype.type`的验证规则类存在，不能重复注册同类型验证规则
     */
    main.registerRule = function (ruleClass, priority) {
        // 多个Rule共享一个属性似乎也没问题
        ruleClasses.push({type: ruleClass, priority: priority});
        // 能有几个规则，这里就不优化为插入排序了
        ruleClasses.sort(
            function (x, y) {
                return x.priority - y.priority;
            }
        );
    };

    var esuiCreateRulesByControl = main.createRulesByControl;

    /**
     * 创建控件实例需要的验证规则
     *
     * @param {Control} control 控件实例
     * @return {validator.Rule[]} 验证规则数组
     */
    main.createRulesByControl = function (control) {
        var rules = [];
        for (var i = 0; i < ruleClasses.length; i++) {
            var RuleClass = ruleClasses[i].type;
            if (control.get(RuleClass.prototype.type) != null) {
                rules.push(new RuleClass());
            }
        }

        return rules.concat(esuiCreateRulesByControl(control));
    };

    /**
     * 创建类实例。用于控件类、规则类或扩展类的实例创建
     *
     * @param {string} type 类型
     * @param {Object} options 初始化参数
     * @param {Object} container 类容器
     * @ignore
     * @return {Control} 创建的控件
     */
    function createInstance(type, options, container) {
        var Constructor = container[type];
        if (Constructor) {
            delete options.type;
            return new Constructor(options);
        }

        return null;
    }

    var esuiCreate = main.create;

    /**
     * 创建控件
     *
     * @param {string} type 控件类型
     * @param {Object} options 初始化参数
     * @return {Control}
     */
    main.create = function (type, options) {
        // 若有控件先于FCUI main初始化时register，则这些控件会放在ESUI的闭包classes中，
        // 这里若本地FCUI找不到想要的控件，则回退到ESUI中。
        return createInstance(type, options, controlClasses)
            || esuiCreate(type, options);   
    };

    main.version = '0.0.2-beta.1';

    return main;
});
