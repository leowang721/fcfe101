/**
 * @file 自定义列配置文件
 * @author XiaobinLi （lixiaobin01@baidu.com）
 */

define(function () {
    var config = {};

    config.tip = '请注意当你清除浏览器缓存时, 会抹去你自定义的内容, 使列表回到默认状态';
    config.tabDatesource = [
        {
            title: '默认',
            value: 'default'
        },
        {
            title: '全部添加',
            value: 'all'
        }
    ];
    config.layerContentTpl = ''
        + '<div id="layer-content-wrap-${id}" class="ui-userdefine-layer-content-wrap">'
        +   '<div class="top-info">'
        +       '<div id="user-define-field-tab-wrap-${id}" class="ui-userdefine-user-define-field-tab-wrap"></div>'
        +       '<div data-ui="type:Tip;id:user-define-field;content:' 
        +           config.tip + ';iconType:i;"></div>'
        +   '</div>'
        +   '<div class="included-list-wrap">'
        +       '<p>已添加<span>（点击<span class="font-icon font-icon-times">' 
        +       '</span>删除）</span></p>'
        +       '<div data-ui="type:UserDefineFieldDataSet;id:included-list-${id};" '
        +           'class="included-list"></div>'
        +   '</div>'
        + '<div class="excluded-list-wrap">'
        +      '<p>待添加<span>（点击<span class="font-icon font-icon-plus">'
        +           '</span>添加）</span></p>'
        +      '<div data-ui="type:UserDefineFieldDataSet;id:excluded-list-${id};" '
        +       'class="excluded-list"></div>'
        + '</div>'
        + '</div>';

    config.includeItemTpl = ''
        + '<span class="include-list-item">'
        +   '<span class="num">${num}</span>'
        +   '<span class="title" title=${title}>${title}</span>'
        +   '<a href="javascript:;" class="move left-move font-icon font-icon-arrow-left' 
        +       ' ${preStatusClass}" data-type="left" data-key="${key}"></a>'
        +   '<a href="javascript:;" class="move right-move font-icon font-icon-arrow-right' 
        +       ' ${nextStatusClass}" data-type="right" data-key="${key}"></a>'
        +   '<a href="javascript:;" class="font-icon font-icon-times close ' 
        +       '${closeStatusClass}" ' 
        +       'data-ui-dataset-wired="excluded-list-${id}" data-key="${key}"></a>'
        + '</span>';

    config.excludeItemTpl = ''
        + '<span class="exclude-list-item">'
        +   '<span class="title" title="${title}">${title}</span>'
        +   '<a href="javascript:;" class="font-icon font-icon-plus add" ' 
        +       'data-ui-dataset-wired="included-list-${id}" data-key="${key}"></a>'
        + '</span>';

    return config;
});