

define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        //var rel = tpl.fail();
        var rel = tpl.success();
        var pstatus = param.status, pcategory = param.categoryid;
    
        rel.data = {
            allUnreadMsgCnt: 120, //所有未读消息条数
            paysumUnreadMsgCnt: 20, 
            systemUnreadMsgCnt: 80,
             optimizeUnreadMsgCnt: 20
        };
    
        var msgdata = rel.data.msgdata = [];
        var nowDate = (new Date()).getDate();
    
        var getTime = function() {
            var now = new Date(), nowDate = now.getDate();
            var distance = Math.ceil(Math.random()*20);
            var date = new Date(now.setDate(nowDate - distance));
            return date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        };
        var getTypeid = function() {
            return Math.ceil(Math.random()* 10 % 5 + 68);
        };
        var getStatus = function() {
            return 0;
        };
        var getCategory = function() {
            return Math.floor(Math.random()*10 % 3);
        }
    
        //console.log(param);
        if (param.status == 0) {
            for (var i = 0; i < 999; i++) {
                var mi = msgdata[i] = {};
                
                mi.eventTime = getTime();
                mi.msginfoid = +new Date();
                mi.linkText = '查看消息';
                mi.linkUrl = 'http://www.baidu.com',
                mi.typeid = getTypeid();
    
                if (mi.typeid == 5) {
                    mi.linkUrl = ''
                }
                mi.categoryid = pcategory;
                mi.status = 0;
                mi.msgText = '这是一条测试的消息内容，id是' + mi.msginfoid + 'typeid是' + mi.typeid +
                'status是' + mi.status;

                if (mi.typeid>=70&&mi.typeid<=72) {
                    if  (pcategory == 1) {
                        mi.msgText = "{\"msgtitle\" : \"test\", \"msgcontent\" : " +
                            "\"test\", \"showtime\" : \"\", \"fixpos\" : " +
                            "\"\", \"fixtime\" : \"\"}";
                    } else {
                        mi.typeid = 68;
                    }
                }
                
            }
        } else {
            for (var i = 0; i < 999; i++) {
                var mi = msgdata[i] = {};
                
                mi.eventTime = getTime();
                mi.msginfoid = +new Date();
                mi.linkText = '查看消息';
                mi.linkUrl = 'http://www.baidu.com',
                mi.typeid = getTypeid();
                mi.status = 2;
                mi.categoryid = pcategory;
                mi.msgText = '这是一条测试的消息内容，id是' + mi.msginfoid + 'typeid是' + mi.typeid + 
                'status是' + mi.status + (getStatus() || '唧唧复唧唧，哈哈哈哈哈哈哈哈哈哈哈哈发货发生的发生的发生的啊的说法sdf');

                if (mi.typeid>=70&&mi.typeid<=72) {
                    if  (pcategory == 1) {
                        mi.msgText = "{\"msgtitle\" : \"test\", \"msgcontent\" : " +
                            "\"test\", \"showtime\" : \"\", \"fixpos\" : " +
                            "\"\", \"fixtime\" : \"\"}";
                        if (Math.random()*10 % 3<2) {
                            mi.msgText = {msgtitle: '公告栏消息title' + i,
                                msgcontent: ""};
                        } else if (Math.random()*10 % 3>2) {
                            mi.linkUrl = "50";
                        }
                    } else {
                        mi.typeid = 68;
                    }
                }
            }
        }
    
        
    
        return rel;
    
    };
});