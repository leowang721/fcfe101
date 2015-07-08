define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var content = ["最新消息", "系统类消息", "消费类消息", "优化类消息", "最重要消息"];
        type = typeof(type) == "undefined" ? Math.floor(Math.random() * 100) % 5 : type;
        cnt = typeof(cnt) == "undefined" ? Math.floor(Math.random() * 100) % 5 : cnt;
        var time = ["2013-01-11 13:40:25","2013-01-10 13:40:25","2013-01-14 13:40:25","2013-01-09 13:40:25"];
        var msgcontent = [];
        for (var i = 0; i < cnt; i++) {
            msgcontent[i] = {
                msginfoid: 100 + i, //消息id
                status: Math.floor(Math.random() * 100) % 2, //0未读，1已读
                eventTime: time[Math.floor(Math.random() * 100)%4], //时间
                msgText: content[i] + i + "消息内容消息内容消息内容消息内容消息内容", //消息内容
                linkText: "clickhere" + i, //链接文字
                linkUrl: "http://www.baidu.com/?" + i, //如果没有链接的话，传""
                typeid: 31 //C2类型，用于前端判断链接文字打开浮层类型,值的范围待定
            }
        }
        return msgcontent;
    };
});