/**
 * 请求账户质量评分各项指标的摘要数据接口模拟：点击、展现、浏览与转化和账户质量
 * @author Wu Huiyao 
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');
    var storage = require('../../lib/storage');
    var debugUtil = storage.get('debugUtil');
    if (debugUtil === undefined) {
        debugUtil = {};
        storage.set('debugUtil', 0);
    }

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        rel.data = {
            result_type : 4, //账户评分摘要
            account_score_abs:{
                res_num: 4, //返回的结果数
                account_score_abs_item:[],
                account_score_detail:{}  //摘要结果里面这个字段不用
            },
            token: 'asdasdsads12'
        };
    
        var abstractItems = rel.data.account_score_abs.account_score_abs_item;
        var score, change;
        for (var i = 0; i < 4; i ++) {
            score = Math.ceil(Math.random() * 100);
            change = 23;
            if (0 == i) {
                change = -1;
            } else if (1 == i) {
                change = 0;
            }
            //    score = null;
             //    change = null;
            //}
            
            abstractItems[i] = {
                id: i, // 0x00 账户质量评分,0x01 展现环节,0x02 点击环节,0x03 浏览和转化环节
                account_score_abs_history:[{ // 当前只返回一天，所以数组元素就一个
                    date: '2012-11-09',
                    score:  score, // 得分 分数[0-100] 、null(若当天没有评分)
                    desc_type: Math.ceil(Math.random() * 100) % 2, //得分评价 0 较差 1 良好
                    score_change: change //得分浮动 正数表示增加 负数表示减少 0表示无变化 ,null 表示评分缺失 无法计算
                }]
            };
        }
                
        return rel;
    };
});