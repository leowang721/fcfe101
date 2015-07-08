
/**
 * 获取重要消息概要中间层消息数据
 * @param {Object} level
 * @param {Object} param
 * @author zhouyu
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');
    var getMsgItem = require('./getMsgItem');

    module.exports = function (path, param) {
        var rel = tpl.success();
        //    rel.status = 500;
        rel.data = {
            allUnreadMsgCnt: 120, //所有未读消息条数
            btwnRequestUnreadMsgCnt: 23, //两次请求之间产生的非最高优先级消息数量
            lasttime: 21212, //本次请求的系统时间
            loginUnreadMsgCnt: Math.floor(Math.random() * 100), //新消息个数
            loginmsg: getMsgItem(0),
            systemUnreadMsgCnt: 2, //系统类消息个数
            systemmsg: getMsgItem(1),
            paysumUnreadMsgCnt: Math.floor(Math.random() * 100), //消费类消息个数
            paysummsg: getMsgItem(2),
            optimizeUnreadMsgCnt: Math.floor(Math.random() * 100),//优化类消息个数
            optimizemsg: getMsgItem(3)
        };
        
        return rel;
    };
});