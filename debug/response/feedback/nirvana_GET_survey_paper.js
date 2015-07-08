/**
 * 获取问卷详情
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    
        return {
            status : 200,
            data : {
                paperid : 20,
                papername : "涅槃首页问卷调查",
                paperdesc : "首页问卷调查，页问卷调查，问卷调查，卷调查，调查，查，",
                questionlistdata : [{
                            questionid : 1,
                            questiontitle : "你觉得涅槃肿么样",
                            questiontype : 1,
                            choicedatalist : [{
                                        choiceid : 1,
                                        choicetitle : "好"
                                    }, {
                                        choiceid : 2,
                                        choicetitle : "一般"
                                    }, {
                                        choiceid : 1,
                                        choicetitle : "不好"
                                    }]
                        }, {
                            questionid : 2,
                            questiontitle : "你觉得涅槃肿么样",
                            questiontype : 2,
                            choicedatalist : [{
                                        choiceid : 1,
                                        choicetitle : "好"
                                    }, {
                                        choiceid : 2,
                                        choicetitle : "一般"
                                    }, {
                                        choiceid : 1,
                                        choicetitle : "不好"
                                    }]
                        }, {
                            questionid : 3,
                            questiontitle : "你觉得涅槃肿么样",
                            questiontype : 3
                        }, {
                            questionid : 4,
                            questiontitle : "你觉得涅槃肿么样",
                            questiontype : 4
                        }]
            }
        }
    };
});