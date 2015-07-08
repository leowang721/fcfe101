/**
 * Created by liuxuechao on 14-4-8.
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var i = 1;
        rel.data = {
            latestMsgDate:'1397628878087', //最新公告栏消息时间
            msgdata:[

                {
                    typeid: 70,
                    msgText: "{\"msgtitle\" : \"测试用消息1  ceshi\", "
                    + "\"msgcontent\" : "
                    + "\"测试消息呵呵呵\", \"showtime\" : \"\", \"fixpos\" : "
                    + "\"\", \"fixtime\" : \"\"}",
                    linkText: "",
                    linkUrl: "",
                    eventTime: "2014-3-13 10:00:14"
                },


                {
                    typeid: 71,
                    msgText: "{\"msgtitle\" : \"新版账户报告增加趋势对比功能啦！" +
                        "\", " + "\"msgcontent\" : " +
                        "\"新版账户报告增加趋势对比功能啦\", \"showtime\" : \"\", "
                        + "\"fixpos\" : " + "\"\", \"fixtime\" : \"\"}",
                    linkText: "点击查看",
                    linkUrl: "http://yingxiao.baidu.com/topic/233/index.html",
                    eventTime: "2014-3-27 11:30:24"
                },

                {
                    typeid: 72,
                    msgText: "{\"msgtitle\" : \"新版账户报告增加趋势对比功能啦！" +
                        "\", " + "\"msgcontent\" : " +
                        "\"\", \"showtime\" : \"\", "
                        + "\"fixpos\" : " + "\"\", \"fixtime\" : \"\"}",
                    linkText: "",
                    linkUrl: "www.baidu.com",
                    eventTime: "2014-3-27 12:03:40"
                }


            ]
        }
        return rel;
    };
});