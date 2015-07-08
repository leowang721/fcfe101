
/*
 * 升级后的推词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), recmwords = [];
        
        var charMap = ['孤然的环','独而当时','及','其','所所','所','所所所所','的部','是','保',
                        '罗','奥','斯','特','的改造仅','自','传东','作限于','品','作',
                        '体', '人', '在', '利', '用', '魔', '法', '般', '的', '科',
                        '技', '锁', '死', '了', '地', '球', '人', '的', '科', '学',
                        '之', '后', '庞', '的', '宇宙', '舰队杀', '气腾腾', '地直', '扑', '太阳系',
                        '意', '欲', '清', '除', '地', '球', '文', '明', '面', '对',
                        '前', '所未', '有', '的危局', '经', '历', '过', '无', '数',
                        '磨', '难', '的', '地', '球', '人', '组', '建', '起', '同',
                        '样', '庞', '大', '的', '太', '空', '舰', "队", '同', '时'];
        for (var i = 0; i < 90; i++) {
            recmwords.push({
                wordid : 100 + i,
                word : param.seeds[0] + charMap[i],
                pv : Math.round(10000*Math.random()) + 15000, // 日均搜索量
                kwc : Math.round(100*Math.random()) // 竞争激烈程度
            });
        }
    
        rel.data.words = recmwords;
        var ran = Math.random();
        rel.status = (ran< 0.3) ? 500 : 200;
        return rel;
    };
});