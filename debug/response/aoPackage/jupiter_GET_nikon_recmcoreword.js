/**
 * 请求推荐重点词的模拟接口
 * @author Wu Huiyao(wuhuiyao@baidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var wordData = require('../../materialData/keyword').data;

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var data = rel.data;
    
        //0表示第一次需要浮层，1表示不是第一次可轮播
        data.type = Math.ceil(Math.random() * 10) % 2;
        data.corewordmaxsize = Math.ceil(Math.random() * 200 + 60);
        data.recmcorewords = [];
        var corwordArr = data.recmcorewords;
        // 推荐重点词数量
        var recmdNum = 10;//Math.ceil(Math.random() * 200 + 60);
        var corword;
        var level = 'wordinfo';
        var attrArr = ['winfoid', 'showword',
            'unitid', 'unitname', 'planid', 'planname'];

        var winfoidStartValue = 1;
    
        for (var i = 0; i < recmdNum; i ++) {
            corword = {};
            for (var j = 0, len = attrArr.length; j < len; j ++) {
                corword[attrArr[j]] = wordData[attrArr[j]](i);
            }
    
            corword['winfoid'] = winfoidStartValue ++;
            if (i == 0) {
                corword['planname'] = '推广计划很长很速度长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长创<b>';
            }
            corword['unitname'] = corword['unitname'] + '推广单元很速度长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长创<b>'
            corword.recmreason = getCorewordRemcdReason(i);
            corwordArr[i] = corword;
        }
    
        rel.timeout = 2000;
    
        return rel;
    };

    function getCorewordRemcdReason(index) {
        var data = [
            1, // 高消费
            2, // 高操作
            4, // 行业热词
            3, // 高消费+高操作
            5, // 高消费+行业
            6, // 高操作+行业
            7,  // 高消费+高操作+行业热词
            8, // 消费变化大
            16, // 质量度变化大
            9,  // 高消费+消费变化大
            17, // 高消费+质量度变化大
            10, // 高操作+消费变化大
            18, // 高操作+质量度变化大
            24, // 消费变化大+质量度变化大
            11, // 高消费+高操作+消费变化大
            19, // 高消费+高操作+质量度变化大
            25, // 高消费+消费变化大+质量度变化大
            26  // 高操作+消费变化大+质量度变化大
        ];

        var hasDelRecm = Math.ceil(Math.random() * 100) % 2;

        if (hasDelRecm) {
            data.unshift(
                32,  // 低消费
                64, // 低操作
                96  // 低消费+低操作
            );
        }

        return data[index % data.length];
    }
});