define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var rand = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var count = rand.int(1, 5);
        rel.data = {
            successCount: count,
            failCount: 1,
            processingCount: 1,
            top2Task: [{
                taskId: 1,
                content: rand.int(1, 1000) + '个关键词',
                optContent: '修改匹配模式',
                processRate: rand.float(0.01, 0.9),
                },
                {
                taskId: 2,
                content: rand.int(1, 1000) + '个内容',
                optContent: '修改关键词',
                processRate: rand.float(0.01, 0.9),
                }]
        };

        return rel;
    };
});