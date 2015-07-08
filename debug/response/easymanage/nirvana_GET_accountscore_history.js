/**
 * 请求账户质量评分各项指标的历史数据接口模拟，用于账户质量评分的Flash图表
 * @author Wu Huiyao 
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.status = 200;
        rel.data = {
            result_type : 4, //账户评分摘要
            account_score_abs:{}, //flash图的结果这个字段没用
            account_score_detail:{
                res_num: 14,
                account_score_detail_item:[]
            },
            token: 'asdasdsads12'
        };
    
        var details = rel.data.account_score_detail.account_score_detail_item,
            history,
            date = new Date();
        for (var i = 0; i < 4; i ++) {
            details[i] = {
                id: i,  // 0x00 账户质量评分,0x01 展现环节,0x02 点击环节,0x03 浏览和转化环节
                score_history:[]
            };
            
            history = details[i].score_history;
            for (var j = 0; j < 14; j ++) {
                date.setDate(date.getDate() - 1);
                history[j] = {
                    date: '2014-02-24',
                    score: '' + Math.ceil(Math.random() * 100) //得分 分数[0-100] 、null(若当天没有评分)
                };
                if (j == 3) {
                    history[j].score = null;
                }
            }
        }
        
        return rel;
    };
});