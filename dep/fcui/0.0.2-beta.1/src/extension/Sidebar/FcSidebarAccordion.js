/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @file Sidebar控件组合手风琴
 * @author Shaolong Zhang(zhangshaolong@baidu.com)
 */
define( 
    function (require) {
        
        require('../../Accordion');
        var lib = require('../../lib');
        var fcui = require('../../main');
        var Extension = require('../../Extension');
        var Sidebar = require('../../FcSidebar');
        
        /**
         * Sidebar组合手风琴
         *
         * @constructor
         */
        function SidebarAccordion() {
            Extension.apply(this, arguments);
        };

        /**
         * 默认属性值
         *
         * {string} contenttype 内容区插件类型
         */
        var defaultOptions = {
            contenttype: 'AccordionTree'
        };
 
        /**
         * 指定扩展类型，始终为`"SidebarAccordion"`
         *
         * @type {string}
         */
        SidebarAccordion.prototype.type = 'SidebarAccordion';
        
        var resizeContent = function (e) {
            this.accordion && this.accordion.resetHeight();
            var content = lib.dom.next(this.main);
            if (!content) {
                return;
            }
            if (e.mode == 'fixed') {
                content.style.marginLeft = this.main.clientWidth + 17 + 'px';
            }
            else {
                content.style.marginLeft = '30px';
            }
        };
        
        /**
         * 激活扩展
         *
         * @override
         */
        SidebarAccordion.prototype.activate = function () {
            var target = this.target;
            if (!(target instanceof Sidebar)) {
                return;
            }
            var sidebarTitle = document.createElement('div');
            sidebarTitle.innerHTML = this.title || '我的账户树';
            target.main.appendChild(sidebarTitle);
            var options = {};
            if (this.speed) {
                options.speed = this.speed;
            }
            if (this.itemtype) {
                options.itemtype = this.itemtype;
            }
            // 传递extraOptions,让ui拓展可从target中获取此参数
            options.extraOptions = target.get('extraOptions');
            options.extensions = [
                fcui.createExtension(
                    this.contenttype || defaultOptions.contenttype,
                    {}
                )
            ];
            var accordion = fcui.create('Accordion', options);
            // 将accordion作为一个子控件
            target.addChild(accordion);
            accordion.loadContentData = function (data, callback) {
                target.loadContentData(data, callback);
            };
            accordion.autoFixHeight = this.autoFixHeight === 'true';
            accordion.appendTo(target);
            target.accordion = accordion;
            accordion.on('contentcontainercreated', function (e) {
                target.fire('contentcontainercreated', e);
            });
            
            accordion.on('accordionselected', function (e) {
                target.fire('accordionselected', e);
            });
            
            accordion.on('contentselected', function (e) {
                target.fire('contentselected', e);
            });
            
            accordion.on('contentnodecreated', function (e) {
                target.fire('contentnodecreated', e);
            });
            target.on('modechange', resizeContent);
            
            // 提供接口，转发手风琴的数据
            target.setDatasource = function (datasource) {
                accordion.setDatasource(datasource);
            };
            
            // 提供接口，设置指定item的内容区显示
            target.setCurrentItem = function (itemId) {
                setTimeout(function () {
                    accordion.setCurrentItem(itemId);
                }, 0);
            };
            
            setTimeout(function () {
                if (target.datasource) {
                    target.setDatasource(target.datasource);
                }
                
                target.fire('modechange', {
                    mode: target.getMode()
                });
            }, 0);
            // 注意：其余accordion的接口修改可以通过sidebar.accordion设置
            Extension.prototype.activate.apply(this, arguments);
        };

        /**
         * 取消扩展的激活状态
         *
         * @override
         */
        SidebarAccordion.prototype.inactivate = function () {
            var target = this.target;
            if (!(target instanceof Sidebar)) {
                return;
            }

            Extension.prototype.inactivate.apply(this, arguments);
        };

        lib.inherits(SidebarAccordion, Extension);
        fcui.registerExtension(SidebarAccordion);
        
        return SidebarAccordion;
    }
);
