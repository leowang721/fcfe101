define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');
    var moment = include('moment');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var sum = [{
            clks : 1e10,
            paysum : 1e10,
            shows : 1e10,
            clkrate : 0.11111111,
            trans : 0.0111111111,
            phonetrans : 10.111111,
            phonepay : 11.11111111111,
            avgprice : 1.511111111
        }, {
            clks : 20.0,
            paysum : 20.0,
            shows : 20,
            clkrate : 0.1,
            trans : 20.111,
            phonetrans : 10,
            phonepay : 11,
            avgprice : 1.5
        }, {
            clks : 20.0,
            paysum : 20.0,
            shows : 20,
            clkrate : 0.1,
            trans : 20.222,
            phonetrans : 10,
            phonepay : 11,
            avgprice : 1.5
        }];

        var data = [], reportParam = param.reportinfo, date;
        var oneDay = 24 * 3600 * 1000, oneWeek = 7 * oneDay;
        var getMonday = function (date) {
            var weekday = date.getDay();
            if (weekday == 1) {
                return date;
            }
            if (weekday == 0) { // 将周日处理为7
                weekday = 7;
            }
            date.setDate(date.getDate() - (weekday - 1));
            return date;
        };
        var getSunday = function (date) {
            var weekday = date.getDay();
            if (weekday == 0) {
                return date;
            }
            date.setDate(date.getDate() + 7 - weekday);
            return date;
        };
        var firstDayToWeek = function (firstDate) {
            return moment(new Date(firstDate)).format('YYYY-MM-DD') + '至'
                + moment(getSunday(new Date(firstDate))).format('YYYY-MM-DD');
        };
        // 返回每月1号
        var getFirstDayOfMonth = function (anyDate) {
            anyDate.setDate(1);
            return anyDate;
        };
        // 返回一个月中的最后一天
        var getLastDayOfMonth = function (anyDate) {
            var tmpDate = new Date(anyDate);
            tmpDate.setMonth(anyDate.getMonth() + 1);
            tmpDate.setDate(0);
            return tmpDate;
        };
        var firstDayToMonth = function (firstDate) {
            return moment(new Date(firstDate)).format('YYYY-MM-DD')
                + '至' + moment(getLastDayOfMonth(new Date(firstDate)))
                    .format('YYYY-MM-DD');
        };

        if (typeof reportParam.starttime == 'undefined') {
            reportParam.starttime = moment(new Date(
                nirvana.env.SERVER_TIME * 1000)).format('YYYY-MM-DD');
        }

        var requestStartTimeStamp = moment(reportParam.starttime).valueOf();
        var max = 10;
        // 从用户请求的两个单位（日，周，月）后开始返回，验证填补数据
        requestStartTimeStamp += oneDay * 2;

        if (reportParam.timedim == 4) { // 分周
            requestStartTimeStamp = getMonday(
                moment(reportParam.starttime).toDate()).getTime();
            // 从用户请求的两个单位（日，周，月）后开始返回，验证填补数据
            requestStartTimeStamp += oneWeek * 2;
        } else if (reportParam.timedim == 3) { // 分月
            requestStartTimeStamp = getFirstDayOfMonth(
                moment(reportParam.starttime).toDate());
            // 从用户请求的两个单位（日，周，月）后开始返回，验证填补数据
            requestStartTimeStamp.setMonth(requestStartTimeStamp.getMonth() + 2);
            requestStartTimeStamp = requestStartTimeStamp.getTime();
        }
        reportParam.timedim = reportParam.timedim || 5;

        // @author dengyijun, for dynamic ideas' mock data
        var isDynamic = reportParam.reporttype === 29;

        for (var i = 1; i < max; i = i + 2) { // 制造出中间一个空隙，验证flash数据的补全
            if (reportParam.timedim == 5) { // 分日
                date = moment(new Date(requestStartTimeStamp + i * oneDay))
                    .format('YYYY-MM-DD');
            } else if (reportParam.timedim == 4) { // 分周
                date = firstDayToWeek(requestStartTimeStamp + i * oneWeek);
            } else if (reportParam.timedim == 3) { // 分月
                requestStartTimeStamp = new Date(requestStartTimeStamp);
                requestStartTimeStamp.setMonth(
                    requestStartTimeStamp.getMonth() + 5);
                date = firstDayToMonth(requestStartTimeStamp.getTime());
            } else if (reportParam.timedim == 8) { // 不分日
                date = reportParam.starttime + '至' + reportParam.endtime;
            }

            var dataRow = {
                // date : '2011-01-01',
                // date : '2011-01-03至2011-01-09',
                // date : '2010-03-01至2010-03-31',
                date: date,
                useracct: {
                    id: i,
                    name: "涅槃账户_<button>\\'^\"%(*&" + i
                },
                planinfo: {
                    id: 100 + i,
                    name: "涅槃计划_<button>\\'^\"%(*&" + i
                },
                unitinfo: {
                    id: 10 + i,
                    name: "涅槃单元_<button>\\'^\"%(*&" + i
                },
                word: {
                    id: 1000 + i,
                    name: "关键词" + i
                },
                wmatch: {
                    id: 1+i,
                    name: ['精确触发', '短语触发', '广泛触发'][Math.floor(i / 2) % 3]
                },
                phonetrans: i + 10,
                phonepay: i + 20,
                device: ['计算机', '移动设备'][i % 2],
                url: 'sdf<a>sdfs</a>dfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdsfasdfsfsdfsdfsdfsdfsdfsdfsdfsdfsdffsdf',
                lpqtext: ['一星', '二星', '三星'][Math.floor(i / 2) % 3],
                suggesttext: '1.部分<a>图片过大，可</a>以适当压缩;2.可以添加电话提示转化jkgjk;3.sdfsadfasdf',
                osname: '--'               
            };
            if (isDynamic) {
                var emptyDesc2 = Math.random() < 0.2;
                dataRow.dideainfo = {
                    ideaid: -100 + i,
                    ideatitle: 'dynamicIdea<%=haha%>' + i,
                    ideadesc1: 'desc1' + i,
                    ideadesc2: emptyDesc2
                        ? '' : 'desc2  desc3  very very very long desc' + i,
                    ideaurl: 'http://www.baidu.com'
                };
                dataRow.dquery = {
                    id: -100 + i,
                    name: 'dquery' + i
                };
               
               dataRow.durl = emptyDesc2
                   ? ""
                   : "desc2:\thttp://www.baidu1.com" + i
                       + ";\t"
                       + "desc3:\thttp://www.baidu2.com" + i
                       + ";\t"
                       + "very very very long desc:\thttp://www.baidu3.com" + i;
                
                dataRow.shows = i;
                dataRow.clks = i;
            } else {
                dataRow.creativeinfo = [{
                    name: '子链一',
                    clks: 0,
                    paysum: 0,
                    shows: 0,
                    clkrate: 0,
                    avgprice: 0,
                    trans: 0,
                    osname: 'android'
                }, {
                    name: '子链二',
                    clks: 0,
                    paysum: 0,
                    shows: 0,
                    clkrate: 0,
                    avgprice: 0,
                    trans: 0,
                    osname: 'iphone'
                }];
                dataRow.majorinfo = {
                    name: '',
                    clks: 0,
                    paysum: 0,
                    shows: 0,
                    clkrate: 0,
                    avgprice: 0,
                    trans: 0,
                    osname: 'android'
                };
                dataRow.prov = {
                    id: 1,
                    name: '北京'
                };
            }
            data[data.length] = dataRow;
        }

        var col = [
            'date', 'useracct', 'planinfo',
            'unitinfo', 'word',
            //'creativeinfo',
            'osname',
            //'device',
            //'url', 'lpqtext', 'suggesttext',
            // 'word',
            // 'ideainfo',
            'clks', 'paysum', 'shows',
            //    'phonetrans', 'phonepay', 'prov',
            'clkrate', 'avgprice', 'trans'
        ];
        var dynamicCol = ['date', 'useracct', 'planinfo', 'unitinfo',
            'dideainfo', 'durl', 'word', 'dquery', 'shows', 'clks'];
        var dynamicSum = reportParam.mtag === ''
            ? [{ shows: 32, clks: 90 },
               { shows: 15, clks: 86 },
               { shows: 47, clks: 176 }]
            : reportParam.mtag
                ? [{ shows: 15, clks: 86 }] : [{ shows: 32, clks: 90 }];

        rel.data = {
            SUM: isDynamic ? dynamicSum : sum,
            DATA: data,
            COL: isDynamic ? dynamicCol : col,
            REPORTNAME: isDynamic ? '动态创意报告' : '无效点击报告'
        };
        rel.error = isDynamic ? {} : { code: 1900 };
        rel.status = 300;
        return rel;
    };
});