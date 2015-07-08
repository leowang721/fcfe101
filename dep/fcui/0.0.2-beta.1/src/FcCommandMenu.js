/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 命令菜单控件
 * @author Feixiang Yuan(yuanfeixiang@baidu.com)
 * @date 2014-12-01
 * 已合并扩展：
 *      FcCommandMenu 支持单条选项启用/禁用
 *      FcCommandMenuHoverToggle hover时显示浮层
 *      FcCommandButton
 */

define(
    function (require) {
        var u = require('underscore');
        var lib = require('./lib');
        var Control = require('./Control');
        var Layer = require('./Layer');

        /**
         * 选中某一项
         *
         * @param {Event} e DOM事件对象
         * @ignore
         */
        function selectItem(e) {
            this.layer.hide();

            var target = e.target;
            while (target !== e.currentTarget
                && !lib.hasAttribute(target, 'data-index')
            ) {
                target = target.parentNode;
            }

            if (target === e.currentTarget) {
                return;
            }
            // 当前选项是置灰的，不处理
            if (lib.hasClass(
                    target, this.helper.getPartClasses('node-disabled')[0]
                )
            ) {
                return;
            }

            var index = +target.getAttribute('data-index');
            var item = this.datasource[index];
            if (item) {
                if (typeof item.handler === 'function') {
                    item.handler.call(this, item, index);
                }
            }

            /**
             * @event select
             *
             * 选中菜单中的一项时触发
             *
             * @param {meta.CommandMenuItem} item 选中的项
             * @param {number} index 选中项在{@CommandMenu#datasource}中的的索引
             * @member CommandMenu
             */
            this.fire('select', {item: item, index: index});
        }

        /**
         * CommandMenu用浮层
         *
         * @extends Layer
         * @ignore
         * @constructor
         */
        function CommandMenuLayer() {
            Layer.apply(this, arguments);
        }

        lib.inherits(CommandMenuLayer, Layer);

        CommandMenuLayer.prototype.nodeName = 'ul';

        CommandMenuLayer.prototype.dock = {
            top: 'bottom',
            left: 'left',
            spaceDetection: 'vertical',
            strictWidth: true
        };

        CommandMenuLayer.prototype.render = function (element) {
            var html = '';

            for (var i = 0; i < this.control.datasource.length; i++) {
                var dataItem =  this.control.datasource[i];
                var classes = this.control.helper.getPartClasses('node');
                if (i === this.control.activeIndex) {
                    classes.push.apply(
                        classes,
                        this.control.helper.getPartClasses('node-active')
                    );
                }
                if (dataItem.disabled) {
                    classes.push.apply(
                        classes,
                        this.control.helper.getPartClasses('node-disabled')
                    );
                }
                html += '<li data-index="' + i + '"'
                    + ' class="' + classes.join(' ') + '">';

                html += this.control.getItemHTML(this.control.datasource[i]);
            }

            element.innerHTML = html;
        };

        CommandMenuLayer.prototype.initBehavior = function (element) {
            this.control.helper.addDOMEvent(element, 'click', selectItem);
            var me = this;
            this.control.addGlobalScrollHandler(function () {
                if (me.control.hasState('active')) {
                    me.toggle();
                }
            });
        };

        /**
         * 命令菜单
         *
         * 命令菜单在点击后会出现一个下拉框，根据{@link CommandMenu#datasource}配置，
         * 点击其中一项后会执行对应的{@link meta.CommandMenuItem#handler}函数，
         * 或者触发{@link CommandMenu#select}事件
         *
         * @extends {Control}
         * @constructor
         * @param {Object} options 选项
         * @param {string} options.mode 何时显示下拉 click/hover
         * @param {boolean} options.isCommandButton 是否是CommandButton模式
         */
        function CommandMenu(options) {
            Control.apply(this, arguments);
            this.isCommandButton = options.isCommandButton === 'true'
                || options.isCommandButton === true;
            this.mode = options.mode || 'click';
            this.layer = new CommandMenuLayer(this);
        }

        /**
         * 控件类型，始终为`"CommandMenu"`
         *
         * @type {string}
         * @readonly
         * @override
         */
        CommandMenu.prototype.type = 'FcCommandMenu';

        /**
         * 浮层中每一项的HTML模板
         *
         * 在模板中可以使用以下占位符：
         *
         * - `{string} text`：文本内容，经过HTML转义
         *
         * @type {string}
         */
        CommandMenu.prototype.itemTemplate = '<span>${text}</span>';

        /**
         * 获取浮层中每一项的HTML
         *
         * @param {meta.CommandMenuItem} item 当前项的数据项
         * @return {string} 返回HTML片段
         */
        CommandMenu.prototype.getItemHTML = function (item) {
            var data = {
                text: u.escape(item.text)
            };
            return lib.format(this.itemTemplate, data);
        };

        /**
         * 初始化DOM结构
         *
         * @protected
         * @override
         */
        CommandMenu.prototype.initStructure = function () {
            var helper = this.helper;
            // 增加disabled状态
            if (this.disabled) {
                this.helper.addStateClasses('disabled');
            }
            if (this.isCommandButton) {
                this.initCommandButton();
            }
            else {
                switch (this.mode) {
                    case 'click':
                        helper.addDOMEvent(
                            this.main,
                            'click',
                            u.bind(this.layer.toggle, this.layer)
                        );
                        break;
                    case 'over':
                        Layer.delayHover(
                            [this.main, this.layer.getElement()],
                            40,
                            u.bind(this.layer.show, this.layer),
                            u.bind(this.layer.hide, this.layer)
                        );
                        break;
                    default:
                        break;
                }
            }
        };

        /**
         * 初始化commandButton
         */
        CommandMenu.prototype.initCommandButton = function () {
            // this 是commandMenu
            var control = this;
            control.main.innerHTML = getButtonTpl(control);
            lib.addClasses(
                control.main,
                control.helper.getPartClasses('button')
            );
            // 如果控件可用，绑定事件
            if (!control.disabled) {
                var mainButton = control.helper.getPart('main-button');
                var dropButton = control.helper.getPart('drop-button');
                // 点击主区域，fire出事件
                control.helper.addDOMEvent(
                    mainButton,
                    'click',
                    u.bind(mainButtonClickHandler, control)
                );
                // 点击下拉区域，toggle layer
                control.helper.addDOMEvent(
                    dropButton,
                    'click',
                    u.bind(dropButtonClickHandler, control)
                );
            }
        };

        /**
         * 点击主区域事件处理
         */
        function mainButtonClickHandler() {
            // this 是commandMenu
            this.layer.hide();
            this.fire('mainbuttonclick');
        }

        /**
         * 点击下拉区域事件处理
         */
        function dropButtonClickHandler() {
            // this 是commandMenu
            this.layer.toggle();
        }

        /**
         * 获得主控件模板
         *
         * @param {Object} control 主控件
         * @return {string} html
         */
        function getButtonTpl(control) {
            var tpl = [
                '<div id="${mainButtonId}" class="${mainButtonClass}">',
                '${displayText}',
                '</div>',
                '<div id="${dropButtonId}" class="${dropButtonClass}"></div>'
            ].join('');

            var data = {
                displayText: control.displayText,
                mainButtonId: control.helper.getId('main-button'),
                mainButtonClass: control.helper.getPartClasses('main-button')
                    .join(' '),
                dropButtonId: control.helper.getId('drop-button'),
                dropButtonClass: control.helper.getPartClasses('drop-button')
                    .join(' ')
            };

            return lib.format(tpl, data);
        }

        /**
         * 根据value的值禁用单条的item
         *
         * @param {string} value item的值
         */
        CommandMenu.prototype.disableItemByValue = function (value) {
            lib.addClasses(
                getNodeByValue.call(this, value),
                this.helper.getPartClasses('node-disabled')
            );
        };

        /**
         * 根据value的值激活单条item
         *
         * @param {string} value  item的值
         */
        CommandMenu.prototype.enableItemByValue = function (value) {
            lib.removeClasses(
                getNodeByValue.call(this, value),
                this.helper.getPartClasses('node-disabled')
            );
        };

        /**
         * 根据value值在datasource里面找出dataIndex
         * @param {string} value 值
         * @return {number} 下标
         */
        function getDataIndexByValue(value) {
            for (var i = 0, dataItem; dataItem = this.datasource[i]; i++) {
                if (value === dataItem.value) {
                    return i;
                }
            }
        }

        /**
         * 根据value的值，获取浮层中的node节点
         * @param {string} value 值
         * @return {element} 值为value 的节点
         */
        function getNodeByValue(value) {
            var index = getDataIndexByValue.call(this, value);
            return lib.find(
                this.layer.getElement(), 'li[data-index="' + index + '"]'
            );
        }

        var COMMAND_MENU_WIDTH = 44;

        var paint = require('./painters');
        /**
         * 重新渲染
         *
         * @method
         * @protected
         * @override
         */
        CommandMenu.prototype.repaint = paint.createRepaint(
            Control.prototype.repaint,
            /**
             * @property {number} width
             *
             * 宽度
             */
            paint.style('width'),
            /**
             * @property {number} width
             *
             * 宽度
             */
            {
                name: 'width',
                paint: function (menu) {
                    menu.main.style.width = menu.width;
                    if (menu.isCommandButton) {
                        lib.find(menu.main, '.ui-fccommandmenu-main-button')
                            .style.width = menu.width - COMMAND_MENU_WIDTH;
                    }
                }
            },
            /**
             * @property {number} height
             *
             * 高度，指浮层未展开时的可点击元素的高度， **与浮层高度无关**
             */
            paint.style('height'),
            {
                /**
                 * @property {meta.CommandMenuItem[]} datasource
                 *
                 * 数据源，其中每一项生成浮层中的一条
                 */
                name: 'datasource',
                paint: function (menu) {
                    menu.layer.repaint();
                }
            },
            /**
             * @property {string} displayText
             *
             * 显示在可点击元素上的文本，会自动进行HTML转义
             */
            {
                name: 'displayText',
                paint: function (menu) {
                    if (menu.isCommandButton) {
                        lib.find(menu.main, '.ui-fccommandmenu-main-button')
                            .innerHTML = menu.displayText;
                    }
                    else {
                        menu.main.innerHTML = menu.displayText;
                    }
                }
            },
            {
                name: ['disabled', 'hidden', 'readOnly'],
                paint: function (menu, disabled, hidden, readOnly) {
                    if (disabled || hidden || readOnly) {
                        menu.layer.hide();
                    }
                }
            }
        );

        /**
         * 销毁控件
         *
         * @override
         */
        CommandMenu.prototype.dispose = function () {
            if (this.helper.isInStage('DISPOSED')) {
                return;
            }

            if (this.layer) {
                this.layer.dispose();
                this.layer = null;
            }

            Control.prototype.dispose.apply(this, arguments);
        };

        lib.inherits(CommandMenu, Control);
        require('./main').register(CommandMenu);
        return CommandMenu;
    }
);
