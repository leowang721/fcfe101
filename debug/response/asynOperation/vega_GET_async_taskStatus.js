define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var rand = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();
        /**
         * param中包含的属性
         * param.taskId {Array} 一个taskId 数组
         */
        rel.data.totalCount = 30;
        rel.data.taskList = creatData(param.taskId);
 
        /**
         * 模仿生成批量结果函数
         * @param {Array} 传入的taskID 数组的长度
         */
        function creatData (taskId) {
            var array = [];
            for (var i = taskId.length - 1; i >= 0; i--) {
                array.push({
                    taskId: taskId[i],
                    status: 2,
                    processRate: rand.float(0.01, 0.9)
                });
            }
            return array;
        }
        
        return rel;
    };
});