/**
 * mock文件中要用到的共用方法在这里实现
 * @todo 增加更多实用方法
 */
define(function(require, exports) {

    /**
     * 简单对象扩展
     * @param  {Object} target 被扩展对象
     * @param  {Object} source 继承来源
     * @return {object} 被扩展后的对象
     */
    exports.extend = function(target, source) {
        for (var item in source) {
            if (!(item in target)) {
                target[item] = source[item];
            }
        }
        return target;
    };
});