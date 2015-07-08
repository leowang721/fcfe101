define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var rand = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();

        /**
         * param中包含的属性
         * param.status 列表状态
         * param.pageNo 请求页数
         * param.pageSize 每页的数量
         */

        rel.data.totalCount = (5 - param.status) * 15;
        rel.data.taskList = creatData(param.pageNo, param.status);

        /**
         * 模仿生成批量结果函数
         * @param {Number} page为页数
         * @param {Number} 当前状态
         * @param {Array} 传入的taskID 数组的长度
         */
        function creatData (page, ajaxStatus) {
            var array = [];
            for (var i = 10 * page - 1; i >= (page - 1) * 10; i--) {
                if (ajaxStatus === 1){
                    // ajaxStatus ===1 表示全部成功
                    // 不返回processRate
                    array.unshift({
                        taskId: i,
                        content: '2000个计划,status=' + ajaxStatus,
                        optContent: '修改匹配模式,taskId=' + i,
                        status: 1,
                        createTime: '2014-3-19 19:03:04 page=' + page,
                        optName: '操作人'
                    });
                } else if (ajaxStatus === 3) {
                    // ajaxStatus ===3  表示请求错误数
                    // 不返回processRate
                    // 返回status 3或者4
                    var num = (i % 2 === 0) ? 3 : 4 ;
                    array.unshift({
                        taskId: i,
                        content: '2000个计划,status=' + ajaxStatus,
                        optContent: '修改匹配模式,taskId=' + i,
                        status: num,
                        createTime: '2014-3-19 19:03:04 page=' + page,
                        optName: '操作人'
                    });
                } else if (ajaxStatus === 2) {
                    // 表示处理中
                    // 返回processRate
                    array.unshift({
                        taskId: i,
                        content: '2000个计划,status='+ajaxStatus,
                        optContent: '修改匹配模式,taskId='+i,
                        status: 2,
                        processRate: rand.float(0.01, 0.9),
                        createTime: '2014-3-19 19:03:04 page=' + page,
                        optName: '操作人'
                    });
                } else if (ajaxStatus === 0) {
                    // 表示所有状态
                    // 暂时都是处理中
                    array.unshift({
                        taskId: i,
                        content: '2000个计划,status=' + ajaxStatus,
                        optContent: '修改匹配模式,taskId=' + i,
                        status: 2,
                        processRate: rand.float(0.01, 0.9),
                        createTime: '2014-3-19 19:03:04 page=' + page,
                        optName: '操作人'
                    });
                }
            }
            return array;
        }

        return rel;
    };
});