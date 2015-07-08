/**
 * 获取重点词优化包重点词优化详情的数据模拟接口
 * 
 * @author Wu Huiyao(wuhuiyao@baidu.com)
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var random = require('random');
    var util = require('../../lib/util');

    var wordData = require('../../materialData/keyword').data;
    var storage = require('../../lib/storage');
    var debugUtil = storage.get('debugUtil');

    if (!debugUtil) {
        var debugUtil = {};
        storage.set('debugUtil', debugUtil);
    }

    module.exports = function (path, param) {
        var rel = tpl.success();
        var remaintime = random.float(0, 0.5, 1);

        var data = {
            // 计算优化详情状态，
            // 0: 正常，
            // 1: 处理中（不需要轮询，因此不会出现1状态），
            // 3: 处理失败，100:
            aostatus: 0,

            // 参数错误
            totalnum: random.int(20, 50), // 返回的重点词数量
            // totalnum: 2, // 返回的重点词数量
            commData: {
                // 重点词优化包出价建议下次计算的时间，时间戳
                nextproctime: +random.timestamp() + remaintime * 60000,
                // 重点词推广地域列表
                wregionlist: '[1, 2, 3, 4, 5, 7, 8, 9, 10, '
                    + '11, 12, 13, 14, 15, 16, 17, 18, 19, 20, '
                    + '21, 22, 23, 24, 25, 26, 27, 28, 29, 30, '
                    + '31, 32, 33, 34, 35, 36, 37]',
                // 重点词下次诊断还剩的分钟数
                remaintime: remaintime,
                // 当前选择展示的地域
                currentwregion : param.wregion == "-1" ? "1" : param.wregion
            }
        };
    
        data.commData.proctime = +new Date();

        //    + data.commData.currentwregion * 100000;
        //(new Date()).getTime(), // 重点词优化包出价建议本次计算的时间，时间戳
    
        var winfoids = param.condition && param.condition.winfoid;
        if (winfoids) {
            // 只请求特定的重点词的详情
            winfoids = winfoids.split(',');
            data.totalnum = winfoids.length;
        }
    
        var listData = [];
        var maxNum = data.totalnum;
        var level = 'wordinfo';
        var attrArr = ['winfoid', 'wordid', 'unitid', 'unitname', 'planid',
                'planname', 'showqstat','showqscore', 'bid', 'paysum', 'clks',
                'pausestat', 'ideaquality', 'pageexp'];

        // , 'wordstat', 'activestat'];
        data.totalnum = data.totalnum < 0 ? 0 : data.totalnum;
    
        // 记录关注的重点词数量
        debugUtil.focusCorewordNum = maxNum;
    
        var detail;
        var temp;
        for (var j = 0; j < maxNum; j++) {
            listData[j] = {};
            detail = {};

            listData[j].data = detail;

            for (var i = 0, len = attrArr.length; i < len; i++) {
                detail[attrArr[i]] = wordData[attrArr[i]](j);
            }
    
            // 重置winfoid为请求的winfoid
            if (winfoids) {
                detail.winfoid = winfoids[j];
            }

            detail.unitid = random.int(100, 1000); // 初始化单元出价
    
            temp = getCorewordDetail(j);

            util.extend(detail, temp);

            detail.bid = random.float(100, 10000, 2);
            detail.unitbid = random.float(100, 1000, 2);

            // filterate
            // detail.filtrate = detail.winfoid + Math.random(0, 300);
            detail.filtrate = Math.random() * 256;

            /**
             * 投放设备选择
             * 
             * @param {number} deviceprefer
             * 0 pc+m
             * 1 pc
             * 2 m
             */
            detail.deviceprefer = random.int(0, 2);
    
            // 随机产生优选创意id，0表示无创意
            detail.prefideaid = random.int(0, maxNum);
    
            // 随机模拟质量度是否下降
            detail.qdump = random.int(1, 2);

            // 用于测试长中文名
            detail.showword = detail.winfoid + random.words(10, 35);
    
            // 用于测试长计划名，由于默认返回的计划明比较短，所以这里重置了计划名
            detail.planname = random.words(15, 45);

            detail.showqscore = random.int(0, 10);
            
            // 移动质量度
            detail.mqscore = random.int(0, 10);

            // 重点词存在的问题
            detail.diagnose = random.int(0, 14);
            detail.mdiagnose = random.int(0, 14);

            // 显示 排名分析/历史排名的入口 0显示，1不显示
            detail.pcshowrankinfoentry = random.int(0, 1);
            detail.mshowrankinfoentry = random.int(0, 1);
        }
    
        data.detailresitems = listData;

        // 产生一定随机异常
        rel.status = 200;

        debugUtil.timer++;
    
        rel.data = data;
        return rel;
    };

    /**
     * 获取重点词详情的部分数据
     * @param index
     */
    function getCorewordDetail(index) {
        var data = {};

        index = index % 15;

        data.reason = Math.pow(2, index);

        // 初始化provavgrank值-3~10， -2：未在该地域投放，-1：无建议, -3:没有有效创意, 0: 右侧，
        // 1-10：左侧第一~第十
        data.provavgrank = random.int(-2, 8);
        //data.rankchg = data.provavgrank > 0 ? random(-1,2) : 2;

        // 排名变化，1表示上升，0表示不变，-1表示下降，2表示不显示变化
        var changeRange = [1, 1, 1, 0, 0, -1, 2];

        // 选择一种变化
        data.rankchg = random.getFrom(changeRange).pop();

        // 移动变化
        data.mrankchg = random.getFrom(changeRange).pop();
        // 移动排名
        data.mavgrank = random.int(-2, 8);
        //data.mrankchg = data.mavgrank > 0 ? random(-1,2) : 2;

        if (index == 11) { // 不在左侧
            data.noshowreason = 0;
            data.provavgrank = 0; // 这个是关键
        } else if (index == 12) { // 不在左侧第一
            data.noshowreason = 0;
            data.reason = 2; // 这个是关键
            data.provavgrank = 2;
        } else if (index == 13) { // 没有有效创意
            data.noshowreason = 0;
            data.reason = 128; // 这个是关键，用于产生添加有效创意建议
            data.provavgrank = 2;
        } else if (index == 14) { // 排名下降
            data.reason = 512;
            data.provavgrank = 5;
            data.rankchg = -1;
        } else {
            data.noshowreason = Math.pow(2, index);
        }

    //    var noshowreason = data.noshowreason;
        if (data.noshowreason == 2) { // 产生激活关键词建议
            data.reason = 32;
        } else if (data.noshowreason == 1) { // 激活关键词建议
            data.reason = 32;
        } else if (data.noshowreason == 256) { // 账户预算优化建议
            data.reason = 32;
        } else if (data.noshowreason == 512) { // 计划预算优化建议
            data.reason = 32;
        } else if (data.noshowreason == 16) { // 优化出价建议
            data.reason = 32;
        }

        return data;
    };
});