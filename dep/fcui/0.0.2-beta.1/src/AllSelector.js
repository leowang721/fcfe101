/**
 * @file 全选组件，属于Select的另一种类型。
 *     该Select有3种options:
 *         "全选"：针对table所有item进行全部选择；
 *         "全选当前页"：针对table的当前pageSize的item进行全部选择；
 *         "全不选"(其中，全不选不以下拉的option形式显示出来)。
 *     并且有一个checkbox在select上。
 *     checkbox与select的options产生联动关系。
 *     并也以下支持三种状态：
 *     全选，半选，全不选。
 *
 * @author Kuang Hongrui(kuanghongrui@baidu.com)
 */

define(function (require, exports) {
    var fcui = require('fcui');
    var lib = require('fcui/lib');
    var Select = require('fcui/Select');
    var _ = require('underscore');

    /**
     * 全未选选项
     * @const
     * @type {string}
     */
    var NONE_OPTION = 'none';

    /**
     * 当前页全选选项
     * @const
     * @type {string}
     */
    var CURRENT_PAGE_OPTIONS = 'multi';

    /**
     * 全选选项
     * @const
     * @type {string}
     */
    var ALL_OPTIONS = 'all';

    /**
     * @param {Object} options
     *     该参数与Select的参数一样，详情参见Select
     * @extends Select
     * @constructor
     */
    function AllSelector(options) {
        options.datasource = [
            {text: '', value: NONE_OPTION},
            {text: '选择当前页', value: CURRENT_PAGE_OPTIONS},
            {text: '选择全部', value: ALL_OPTIONS}
        ];
        options.value = NONE_OPTION; // default value
        Select.apply(this, arguments);
    }

    /**
     * 类的static常量
     * 全未选选项
     * @const
     * @type {string}
     */
    AllSelector.NONE_OPTION = NONE_OPTION;

    /**
     * 类的static常量
     * 当前页全选选项
     * @const
     * @type {string}
     */
    AllSelector.CURRENT_PAGE_OPTIONS = CURRENT_PAGE_OPTIONS;

    /**
     * 类的static常量
     * 全选选项
     * @const
     * @type {string}
     */
    AllSelector.ALL_OPTIONS = ALL_OPTIONS;

    /**
     * 控件类型，始终为`"AllSelector"`
     *
     * @type {string}
     * @readonly
     * @override
     */
    AllSelector.prototype.type = 'AllSelector';

    /**
     * 当checkbox值变化的时候执行该方法，
     * @param {AllSelector} AllSelector
     *     全选组件。
     * @param {Event} event
     *     事件
     * @private
     */
    function checkboxChangeHandler(AllSelector, event) {
        var checkboxElement = $(event.target);
        var checkedState = NONE_OPTION;
        if (checkboxElement.prop('checked')
            && AllSelector.get('value') !== CURRENT_PAGE_OPTIONS) {
            checkedState = CURRENT_PAGE_OPTIONS;
        }
        AllSelector.set('value', checkedState);

        // 阻止click对Select的冒泡。
        lib.event.stopPropagation(event);
    }

    /**
     * 初始化DOM结构
     * 将checkbox的样式放入Select的容器内。
     *
     * @protected
     * @override
     */
    AllSelector.prototype.initStructure = function () {
        AllSelector.superClass.initStructure.call(this);
        var checkboxElement = $('<input type="checkbox" />');
        checkboxElement.addClass(
            this.helper.getPartClasses('checkbox').join(' ')
        );
        checkboxElement.appendTo(this.main);

        this.on('change', function () {
            this.set('value', this.get('rawValue'));
        });

        this.helper.addDOMEvent(checkboxElement[0], 'click',
            _.partial(checkboxChangeHandler, this)
        );

        this.helper.addDOMEvent(this.main, 'mouseover',
            _.bind(this.mouseShowDropdownHandler, this)
        );

        this.helper.addDOMEvent(this.main, 'mouseout',
            _.bind(this.mouseHideDropdownHandler, this)
        );

        var layerElement = this.layer.getElement(true);

        this.helper.addDOMEvent(layerElement, 'mouseover',
            _.bind(this.mouseShowDropdownHandler, this)
        );

        this.helper.addDOMEvent(layerElement, 'mouseout',
            _.bind(this.mouseHideDropdownHandler, this)
        );

        this.tipElement = this.createTip();
    };

    /**
     * 鼠标划过显示下拉事件。
     * @param {Event} event event
     */
    AllSelector.prototype.mouseShowDropdownHandler = function (event) {
        this.layer.show();
        lib.event.stopPropagation(event);
    };

    /**
     * 鼠标移出隐藏下拉事件。
     * @param {Event} event event
     */
    AllSelector.prototype.mouseHideDropdownHandler = function (event) {
        this.layer.hide();
        lib.event.stopPropagation(event);
    };

    /**
     * timeout句柄。
     */
    var timeoutHandle = null;

    /**
     * tip和AllSelector之间的gap值。
     * @const
     * @type {number}
     */
    var GAP = 10;

    /**
     * tip的显示持续时间，单位为毫秒。
     * @const
     * @type {number}
     */
    var TIP_SHOWN_DURATION = 1000;

    /**
     * 显示无箭头的tip，并且过1秒会自动移除。
     *
     * @protected
     * @param {string} content content
     */
    AllSelector.prototype.showTip = function(content) {
        var tipElement = $(this.tipElement);
        var mainElement = $(this.main);
        tipElement.css({
            top: mainElement.offset().top - mainElement.height() - GAP,
            left: mainElement.offset().left
        });
        if (content || tipElement.text()) {
            content && tipElement.text(content);
            tipElement.show();
        }
        else {
            tipElement.hide(); // 当tip的内容为空时hidden
        }
        timeoutHandle = setTimeout(function () {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
            tipElement.hide();
        }, TIP_SHOWN_DURATION);
    };

    /**
     * 创建一个tip元素。创建之后不显示。
     *
     * @param {string} content
     *     tip的内容
     * @return {HTMLElement}
     */
    AllSelector.prototype.createTip = function(content) {
        var tip = $('.ui-allselector-tip');
        if (!tip.length) {
            var tipClass = this.helper.getPartClasses('tip').join(' ');
            tip = $('<div class="' + tipClass + '"></div>');
            tip.appendTo('body');
        }
        tip.text(content || '').hide();
        return tip[0];
    };

    /**
     * 设置全选下拉框的状态。
     * @param {string} value 输入控件的值
     *     该值只有三种"multi","all","none"
     * @override
     */
    AllSelector.prototype.setValue = function (value) {
        AllSelector.superClass.setValue.apply(this, arguments);

        var checkboxElement = $(this.main).find('.ui-allselector-checkbox');
        switch (value) {
            case CURRENT_PAGE_OPTIONS:
                checkboxElement.prop('checked', false);
                checkboxElement.prop('indeterminate', true);
                break;
            case ALL_OPTIONS:
                checkboxElement.prop('checked', true);
                checkboxElement.prop('indeterminate', false);
                break;
            default: // none or others
                checkboxElement.prop('checked', false);
                checkboxElement.prop('indeterminate', false);
                break;
        }
    };

    /**
     * 设置当前所选的item数量。
     *
     * @param {number} count count
     */
    AllSelector.prototype.setCount = function (count) {
        var value = this.get('value');
        var content = '';
        switch (value) {
            case CURRENT_PAGE_OPTIONS:
                content = '已选择当前页' + count + '项';
                break;
            case ALL_OPTIONS:
                content = '已选择全部' + count + '项';
                break;
            default:
                content = '';
        }
        // 设置content时，将tip show出来。
        this.showTip(content);
    };

    /**
     * 销毁释放控件。
     *
     * @override
     */
    AllSelector.prototype.dispose = function () {
        Select.prototype.dispose.apply(this, arguments);
        this.tipElement.remove && this.tipElement.remove();
        lib.removeNode(this.main);
    };

    lib.inherits(AllSelector, Select);
    fcui.register(AllSelector);
    return AllSelector;
});
