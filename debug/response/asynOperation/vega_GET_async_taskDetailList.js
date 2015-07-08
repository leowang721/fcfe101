define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var rand = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();
        /**
         * param中包含的属性
         * param.taskId {number} 一个taskId
         * param.pageNo  {number} 页数
         * param.pageSize   {number} 每页的数量
         */
        rel.data.totalCount = 100;
        rel.data.content = '60个计划';
        rel.data.optContent = '匹配模式';
        rel.data.optName = '操作人';
        rel.data.createTime = '2014-03-12';
        rel.data.failCount = 23;
        rel.data.successCount = 53;
        rel.data.taskId = param.taskId;
        if (rand.int(0, 2)){
            rel.data.optType = 'MOD';
        } else {
            rel.data.optType = 'DEL';
        }
        
        rel.data.logList = creatData(param.taskId);
 
        /**
         * 模仿生成批量结果函数
         * @param {Array} 传入的taskID 数组的长度
         */
        function creatData (taskId) {
            var array = [];
            for (var i = 9; i >= 0; i--) {
                array.push({
                    mtlId: '物料ID',
                    mtlName: '物料名称',
                    oldValue: '旧值page=' + param.pageNo,
                    newValue: '新值',
                    status: 0,
                    taskId: param.taskId,
                    error: {
                        code: 644,
                        detail: {
                            wmatch: null
                        },
                        idx: 0,
                        message: "wmatch conflict with showword=A"
                    }
                });
            }
            return array;
        }
        
        rel._status = 200;
        return rel;
    };
});