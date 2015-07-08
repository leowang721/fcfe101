define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var sum = {
            clks : 20.0,
            shows : 20.0
        };
        
        var moment = include('moment');

        var data = [], reportParam = param.daySensitive, date, oneDay = 24 * 3600
                * 1000, oneWeek = 7 * oneDay,
    
        firstDayToWeek = function(firstDate) {
            return moment(new Date(firstDate)).format('YYYY-MM-DD')
                    + '至'
                    + moment(new Date(firstDate + oneWeek - oneDay))
                            .format('YYYY-MM-DD');
        };
    
        var requestStartTimeStamp = moment().set(param.starttime).milliseconds() - 0;
    
        var increment = 1, // 分日时默认为1
        max = 100;
    
        requestStartTimeStamp += increment * oneDay * 2; // 从用户请求的两个单位（日，周，月）后开始返回，验证填补数据
    
        for (var i = 1; i < max; i++) { // increment * 2制造出中间一个空隙，验证flash数据的补全
            date = moment(new Date(requestStartTimeStamp + i * oneDay))
                    .format('YYYY-MM-DD')
    
            data[data.length] = {
                date : date + '至' + date,
                useracct:{"name":"searchlab","id":630152},
                plan : {
                    id : 1000,
                    name : (i % 3 == 1)
                            ? "涅槃计划_<Button>\\'^\"%(*&"
                            : "涅槃计划_<button>\\'^\"%(*&"
                },
                unit : {
                    id : 1000,
                    name : (i % 3 == 1)
                            ? "涅槃单元_<Button>\\'^\"%(*&"
                            : "涅槃单元_<button>\\'^\"%(*&"
                },
                word : {
                    id : 20 + i,
                    name : "关键词_<button>\\'^\"%(*&" + i
                },
                idea : {
                    title : '创意<input>\\^\"%(*&' + i,
                    desc1 : "描{述一}_<button>\\'^\"%(*&" + i,
                    desc2 : "描:{述二:}_<button>\\'^\"%(*&" + i,
                    url : 'http://www.baidu.com'
                },
                query : {
                    id : 20 + i,
                    name : (i % 3 == 1) ? '-' : "搜索词_<button>\\'^\"%(*&" + i
                },
                clks : 10.0 + i,
                shows : 100.0 + i,
                engineid : (i % 3 == 2) ? '搜索推广' : 'google.cn',
                // 增加rngwmatch字段，判断是否启用地域词扩展功能
                ebrr : Math.random() > 0.5 ? 1 : 0
            }
        }
    
        rel.data = {
            SUM : sum,
            DATA : data
        };
    
        rel.errorCode = {
            "message" : "",
            "code" : 1900,
            "detail" : null,
            "idx" : 0
        };
    
        if (param.mtldim == 7) {
            rel.status = 400;
        }
    
        return rel;
    };
});