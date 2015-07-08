
/**
 * cpa响应
 */
// 获取计划列表
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            data: {
                1: [],
                2: [],
                4: [],
                16: [],
                8: []
            },
            status: 200,
            errorCode: null
        };
        var tempIds = [1, 2, 4, 8];
        for (var i = 0; i < 40; i++) {
            var rand = Math.random() * 4 | 0;
            rel.data[tempIds[rand]].push({
                // rel.data[1].push({
                planid: i, // 计划id
                planname: '计划~%^&*()<>..<span>名称', // 计划名称
                cpa: i * 2.43,  // flag未清理前兼容之前的接口
                suggestcpa: i * 2.43, // 建议cpa(X1)
                riskcpa: i * 2.32,  // 风险cpa(X2)
                mincpa: i * 2.21 // 最低cpa(X3)
            });
        }
        // delete rel.data[16];
        return rel;
        // 返回为空的情况
        // return {
        //     data: {},
        //     status: 200,
        //     errorCode: null
        // };
    };
});