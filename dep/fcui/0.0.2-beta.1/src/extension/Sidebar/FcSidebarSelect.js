/**
 * @file Sidebar的扩展
 * @author Pride Leong(liangjinping@baidu.com)
 */

define(function (require, exports, module) {
    var lib = require('../../lib');
    var fcui = require('../../main');
    var Extension = require('../../Extension');
    var Sidebar = require('../../FcSidebar');

    require('../../Select');

    /**
     * 拓展的Sidebar，在sidebar的head加上排序菜单
     *
     * @constructor
     */
    function SidebarSelect() {
        Extension.apply(this, arguments);
    }

    /**
     * 指定扩展类型，始终为`"SidebarSelect"`
     *
     * @type {string}
     */
    SidebarSelect.prototype.type = 'SidebarSelect';

    /**
     * 标题属性，用于设置sidebar的head
     * @type {string}
     */
    SidebarSelect.prototype.title = '';

    /**
     * sidebar初始化完成之后事件处理
     */
    function sidebarInitedHandler() {
        var target = this.target;
        var extraOpts = target.get('extraOptions');
        var options = {
            id: 'sort-selector'
        };
        if (extraOpts && extraOpts.select) {
            $.extend(options, extraOpts.select);
        }
        var select = fcui.create('Select', options);
        target.addChild(select);
        // sidebar初始化的时候会将自身main里的第一个子元素作为head如果不存在就
        // 直接创建一个，所以这个扩展应该在其它不使用这种判断逻辑的扩展之后激活
        var sidebarTitle = lib.dom.first(target.main);
        if (!sidebarTitle) {
            sidebarTitle = document.createElement('div');
            target.main.appendChild(sidebarTitle);
        }
        sidebarTitle.innerHTML = '<span class="sidebar-title-text">'
             + this.title + '</span>';
        select.appendTo(sidebarTitle);
        // 给target fire一个selectionchanged事件
        select.on('change', function (event) {
            target.fire('selectionchanged', {value: select.getValue()});
        });
    }

    /**
     * 激活扩展
     *
     * @override
     */
    SidebarSelect.prototype.activate = function () {
        var target = this.target;
        if (!(target instanceof Sidebar)) {
            return;
        }
        target.on('init', sidebarInitedHandler, this);
        Extension.prototype.activate.apply(this, arguments);
    };

    /**
     * 取消扩展的激活状态
     *
     * @override
     */
    SidebarSelect.prototype.inactivate = function () {
        var target = this.target;
        if (!(target instanceof Sidebar)) {
            return;
        }
        target.un('init', sidebarInitedHandler);
        Extension.prototype.inactivate.apply(this, arguments);
    };

    lib.inherits(SidebarSelect, Extension);
    fcui.registerExtension(SidebarSelect);

    return SidebarSelect;
});
