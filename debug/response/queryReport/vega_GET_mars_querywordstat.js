define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), queryNumber = param.word.length, data = [];
    
        for (var i = 0; i < queryNumber; i++) {
            switch (i % 4) {
                case 0 :
                    data.push({
                                'seq' : i,
                                'add' : [{
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }],
                                'neg' : [{
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }]
                            });
                    break;
                case 1 :
                    data.push({
                                'seq' : i,
                                'add' : [],
                                'neg' : [{
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }]
                            });
                    break;
                case 2 :
                    data.push({
                                'seq' : i,
                                'add' : [{
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }, {
                                            'planname' : '涅槃计划_<button>\\^\"%(*&1'
                                                    + i,
                                            'unitname' : '涅槃单元_<button>\\^\"%(*&1'
                                                    + i,
                                            'wmatch' : '匹配模式'
                                        }],
                                'neg' : []
                            });
                    break;
                case 3 :
                    data.push({
                                'seq' : i,
                                'add' : [],
                                'neg' : []
                            });
                    break;
            }
    
        }
        rel.data = data;
    
        rel.errorCode = {};
    
        return rel;
    
    };
});