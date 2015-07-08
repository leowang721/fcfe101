/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 模板辅助方法
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} 模板辅助方法
 */
define(function (require) {
    var exports = {};

    /**
     * 将模板string中的某个target替换为content。
     * 提供的content不需要有target的开始标签。
     * @param  {string} template 原始的模板string
     * @param  {string} target 想要替换的target
     * @param  {string} content 想要替换的模板内容
     * @return {string} 替换完成的模板string
     */
    exports.replaceTarget = function (template, target, content) {
        var regex = new RegExp(
            // 首先match 目标target的开始标签并group
            '(<!--\\s+target:\\s+' + target + '\\s+-->)'
            // 然后match target的内容，lazy以尽快碰到
            // 下一个target的开始或者本target的结束
            + '([.\\s\\S]*?)'
            // 最后碰本target的结束，或者下一个target的开始，或者字符串尾
            + '($|(<!--\\s+(target:.*|/target)\\s+-->))',
            'g'
        );

        return template.replace(regex, '$1 ' + content + ' $3');
    };

    /**
     * 获取指定target模板的content。
     * @param  {string} template 原始的模板string
     * @param  {string} target 想要替换的target
     * @return {string} 指定target模板的content
     */
    exports.getTarget = function (template, target) {
        var regex = new RegExp(
            // 首先match 目标target的开始标签并group
            '(?:<!--\\s+target:\\s+' + target + '\\s+-->)'
            // 然后match target的内容，lazy以尽快碰到
            // 下一个target的开始或者本target的结束
            + '([.\\s\\S]*?)'
            // 最后碰本target的结束，或者下一个target的开始，或者字符串尾
            + '(?:$|(<!--\\s+(target:.*|/target)\\s+-->))',
            'g'
        );
        var matches = regex.exec(template);
        return matches && matches[1];
    };

    return exports;
});
