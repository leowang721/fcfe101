/**
 * @file BasicModel.formatter 数据格式化工具集
 * 来自于ef/UIModel中的formatter方法
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    /**
     * 补0
     *
     * @param {string|number} s 输入的数字或字符串
     * @return {string} 不足2位的补个0
     */
    function pad(s) {
        s = s + '';
        return s.length === 1 ? '0' + s : s;
    }

    /**
     * 内置的格式化函数
     *
     * @type {Object}
     */
    var formatters = {
        /**
         * 格式化日期
         *
         * @param {Date} date 输入的日期
         * @return {string} YYYY-MM-dd格式的字符串
         */
        date: function (date) {
            return date.getFullYear() + '-'
                + pad(date.getMonth() + 1) + '-'
                + pad(date.getDate());
        },
        /**
         * 格式化日期范围
         *
         * @param {Object} range 输入的日期范围
         * @return {string} 逗号分隔2个日期，均为YYYY-MM-dd格式
         */
        dateRange: function (range) {
            return formatters.date(range.begin)
                + ',' + formatters.date(range.end);
        },
        /**
         * 格式化时间
         *
         * @param {Date} time 输入的时间
         * @return {string} YYYY-MM-dd HH:mm:ss格式的字符串
         */
        time: function (time) {
            return formatters.date(time) + ' '
                + pad(time.getHours()) + ':'
                + pad(time.getMinutes()) + ':'
                + pad(time.getSeconds());
        },
        /**
         * 格式化时间范围
         *
         * @param {Object} range 输入的时间范围
         * @return {string} 逗号分隔2个时间，均为YYYY-MM-dd HH:mm:ss格式
         */
        timeRange: function (range) {
            return formatters.time(range.begin)
                + ',' + formatters.time(range.end);
        }
    };

    return formatters;
});
