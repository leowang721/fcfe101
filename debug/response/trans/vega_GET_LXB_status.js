//获取离线宝状态
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        // var status = [6,4,0,1,8,9,1000],
        //     index = Math.ceil(Math.random() * 100) % 7;
        // rel.data = status[index];
        // rel.data = 1;
        // 离线宝状态由之前的数值  改为  一个object json对象 by lixioabin01
        rel.data = {
            status: 1,
            telStatus: 1,
            telMode: 1,
            callbackStatus: 1,
            trackStatus: 1
        }
        //rel.status = 500;
        return rel;
    };
});