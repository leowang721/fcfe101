

/**
 * 获取账户概况数据用于Flash图表
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        function _dateToString(data, pattern) {
            function dl(data, format) {
                format = format.length;
                data = data || 0;
                var d = String(Math.pow(10, format) + data);
                return format == 1 ? data : d.substr(d.length - format);
            }
    
            return pattern.replace(/([YMDhsmw])\1*/g, function (format) {
                switch (format.charAt()) {
                    case 'Y':
                        return dl(data.getFullYear(), format);
                    case 'M':
                        return dl(data.getMonth() + 1, format);
                    case 'D':
                        return dl(data.getDate(), format);
                    case 'w':
                        return data.getDay();
                    case 'h':
                        return dl(data.getHours(), format);
                    case 'm':
                        return dl(data.getMinutes(), format);
                    case 's':
                        return dl(data.getSeconds(), format);
                }
            });
        }
    
        var rel = tpl.success();
        var starttime = new Date(
            (typeof param.starttime != 'undefined' ? param.starttime : "2010-12-01")
            + ' 00:00:00'
        );
        var endtime = new Date(
            (typeof param.endtime != 'undefined' ? param.endtime : "2010-12-25")
            + ' 00:00:00'
        );
        var gap = (endtime - starttime) / 86400000;
        var relList = [];
        if (gap != 0) {
            // 分日
            for (var i = 0; i <= gap; i++) {
                if (true || Math.random() > 0.7) {
                    //模拟数据不完整
                    relList.push({
                        reporttime: _dateToString(starttime, "YYYY-MM-DD"),
                        clks: Math.round(Math.random(1) * 1000),
                        shows: Math.round(Math.random(1) * 100000),
                        paysum: Math.round(Math.random(1) * 100),
                        showpay: Math.round(Math.random(1) * 1000),
                        trans: Math.round(Math.random(1) * 30),
                        clkrate: 0.0022349872873582735,//Math.round(Math.random(1)),
                        avgprice: Math.round(Math.random(1) * 400) / 100
                    });
                }
                starttime.setDate(starttime.getDate() + 1);
            }
        } else {
            // 分时
            for (var i = 0; i < 24; i++) {
                if (Math.random() > 0.7) {
                    //模拟数据不完整
                    relList.push({
                        reporttime: i < 10 ? '0' + i : i + '',
                        clks: Math.round(Math.random(1) * 1000),
                        shows: Math.round(Math.random(1) * 100000),
                        paysum: Math.round(Math.random(1) * 100),
                        showpay: Math.round(Math.random(1) * 1000),
                        trans: Math.round(Math.random(1) * 30),
                        clkrate: Math.round(Math.random(1)),
                        avgprice: Math.round(Math.random(1) * 400) / 100
                    });
                }
            }
        }
        rel.data.listData = relList;
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});