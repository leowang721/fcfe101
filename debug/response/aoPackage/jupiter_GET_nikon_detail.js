
/**
 * 获取优化包详情
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');
    var util = require('../../lib/util');

    module.exports = function (path, param) {
    
        var rel = tpl.success(), data = {
            aostatus : 0, // 详情页不用关注，直接根据外层的status判断（200,500,600）
            optmd5 : 1234567,
            totalnum : 23,//92,
            detailresitems : [],
            commData : {
                begindate : '1336140186475',
                enddate : '1336640186475',
                userRank: '0' //只有808用 同行排名
            },
            listData: []
        }, detailresitems = [],
            opttypeid = param.opttypeid,
            startindex = param.condition.startindex,
            endindex = param.condition.endindex,
            len = Math.min((startindex + (endindex - startindex + 1)), data.totalnum);
    
        if (opttypeid > 1000 && opttypeid < 3000) {
            // 转化提升包，不发startindex/endindex
            startindex = 1;
            len = 3;
        }
    
        var wordLevelData = require('../../materialData/keyword');
        var ideaLevelData = require('../../materialData/idea');
    
        // 根据opttypeid，配置详情具体返回数据
        switch (+opttypeid) {
            /** ******** 效果恢复包 ********* */
            case 104 : // 推广时段
            case 708: // 突降急救包升级版的时段设置优化项
                detailresitems.push({
                            suggestcyc : "[[104,108],[109,111]]",
                            plancyc : "[[101,102],[107,110],[114,118]]"
                        });
                break;
            // 被删除
            case 107 :
            case 109 :
            case 115 :
                for (; startindex < len; startindex++) {
                    detailresitems.push({
                        showword : '<input>' + startindex
                                + ' 被删除_的超长关键词超长关键词超长关键词超长关键词超长关键词',
                        winfoid : 20000 + startindex,
                        unitname : '暂停推_广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元',
                        planname : '暂停推_广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划',
                        planid : 100 + startindex,
                        unitid : 1000 + startindex,
                        wordid : 10000 + startindex,
                        beginvalue : '898989',
                        endvalue : '456',
                        decr : '66666',
                        pause : 1,
                        bid : 345 + startindex + '',
                        recmbid : 100 + startindex + '',
                        suggestion : '启用',
                        origshowword : '原来的关键词原来的关键词原来的关键词原来的关键词',
                        wmatch : ['15', '31', '63'][startindex % 3],
                        recmunitname : startindex % 3 == 0 ? ('很长很长的很长很长的很长很长的很长很长的很长很长的单元300' + startindex) : ('推广单元' + startindex),
                        recmplanname : startindex % 3 == 0 ? ('涅槃计划_' + startindex) : ('推广计划' + startindex),
                        recmbid : 100 + +startindex + '',
                        recmwmatch : ['15', '31', '63'][startindex % 3],
                        showdownratio : '10' // 自然检索量下降百分比数值
                    });
                }
                break;
            case 110 :
            case 112 :
            case 113 :
            case 714: // 突降急救包升级版，关键词不宜推广
            case 715: // 突降急救包升级版，关键词检索量过低
            case 716: // 突降急救包升级版，关键词检索量下降
                for (; startindex < endindex + 1; startindex++) {
                    detailresitems.push({
                        showword : '<input>' + startindex
                                + ' 被删除的超长关键词超长关键词超长关键词超长关键词超长关键词',
                        winfoid : 20000 + startindex,
                        dailypv : 100,
                        kwc : 5,
                        isfstscreen : (((startindex - 13) > 0) ? 0 : 1) + '',
                        recmunitname : '暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元',
                        recmplanname : '暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划',
                        recmplanid : 100 + startindex,
                        recmunitid : 1000 + startindex,
                        wordid : 10000 + startindex,
                        beginvalue : '898989',
                        endvalue : '456',
                        decr : '66666',
                        pause : 1,
                        bid : 345 + startindex + '',
                        recmbid : 100 + startindex + '',
                        suggestion : '启用',
                        origshowword : '原来的关键词原来的关键词原来的关键词原来的关键词',
                        recmwmatch : ['15', '31', '63'][startindex % 3],
                        showdownratio : '10' // 自然检索量下降百分比数值
                    });
                }
                break;
            // 被暂停
            case 105 :
            case 106 :
            case 108 :
            case 114 :
                // 修改出价
            case 111 :
            case 116 :
            case 605 : // 行业领先包，搜索无效
            case 705:  // 突降急救包升级版，计划被暂停优化项
            case 710:  // 突降急救包升级版，单元被暂停优化项
            case 717:  // 突降急救包升级版，匹配模式缩小优化项
            case 718:  // 突降急救包升级版，左侧展现概率下降、平均排名下降、展现机会突降
            case 712:  // 突降急救包升级版，关键词暂停推广
            case 713:  // 突降急救包升级版，关键词搜索无效
                var optItem;
                var matchlist = ['15', '31-1', '63', '31-0', '31-3'];
                for (; startindex < len; startindex++) {
                    optItem = {
                        winfoid: 20000 + startindex,
                        showword: '<input>' + startindex
                            + ' 被暂停的超长关键词超长关键词超长关键词'
                            + '超长关键词超长关键词',
                        unitname: '暂停推广单元暂停推广单元暂停推广单元'
                            + '暂停推广单元暂停推广单元暂停推广单元暂停'
                            + '推广单元暂停推广单元',
                        planname: '暂停推广计划暂停推广计划暂停推广计划'
                            + '暂停推广计划暂停推广计划暂停推广计划暂停'
                            + '推广计划暂停推广计划',
                        planid: 100 + startindex,
                        unitid: 1000 + startindex,
                        wordid: 10000 + startindex,
                        beginvalue: '898989',
                        endvalue: '456',
                        decr: '66666',
                        pause: 1,
                        bid: 345 + startindex + '',
                        recmbid: 100 + startindex + '',
                        suggestion: '启用',
                        origshowword: '原来的关键词',
                        wmatch: matchlist[startindex % 3],
                        recmwmatch: matchlist[(startindex + 1) % 3],
                        beginwmatch: matchlist[(startindex + 1) % 3],
                        endwmatch: matchlist[(startindex + 2) % 3],
                        showdownratio: '10', // 自然检索量下降百分比数值
                        reason: startindex % 3,
                        beginleftnum: 2323348,
                        endleftnum: 1233458,
                        matchPriceEnableStatus: 0
                    };
                    if (opttypeid == 718) { // 用于突降包升级版的推左次数变化
                        optItem.reason ++; // 突降包升级版，该值为1-3
                        switch (optItem.reason) {
                            case 1: // 左侧展现概率下降
                                optItem.begincount = 13;
                                optItem.endcount = 90;
                                break;
                            case 2: // 排名下降
                                optItem.begincount = 12;
                                optItem.endcount = 34;
                                break;
                        }
                    }
                    detailresitems.push(optItem);
                }
                break;
            case 802:  // 移动优化包，优化出价
                var optItem;
                for (; startindex < len; startindex++) {
                    optItem = {
                        winfoid : 20000 + startindex,
                        showword : startindex + ((startindex%5) ? '出资加盟一家大型地商业电影院线要多少费用呢' : '吉川家康历史'),
                        unitname : '暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元',
                        planname : '暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划',
                        planid : 100 + startindex,
                        unitid : 1000 + startindex,
                        wordid : 10000 + startindex,
                        bid : 345 + startindex + '',
                        origshowword : '原来的关键词',
                        wmatch : ['15', '31', '63'][startindex % 3],
                        deviceprefer : (startindex%3) ? 0 : 2,
                        //mobileshowrate : 23,
                        unitbid : 10 + +startindex + '',
                        //参考出价
                        recmbid : 123,
                        // 首屏展现率
                        showRatio : '12',
                        // 提供到的展现率
                        predictShowRatio : '34',
                        // 展现量
                        shows : 123,
                        // 预估展现量
                        predictShows : 89708,
                        matchPriceEnableStatus: 0
                    };
                    detailresitems.push(optItem);
                }
                break;
            case 803:  // 移动优化包，搜索词无效
                var optItem;
                for (; startindex < len; startindex++) {
                    optItem = {
                        winfoid : 20000 + startindex,
                        showword : startindex + ((startindex%5) ? '出资加盟一家大型地商业电影院线要多少费用呢' : '吉川家康历史'),
                        unitname : '暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元',
                        planname : '暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划',
                        planid : 100 + startindex,
                        unitid : 1000 + startindex,
                        wordid : 10000 + startindex,
                        bid : 345 + startindex + '',
                        //参考出价
                        recmbid : 123,
                        origshowword : '原来的关键词',
                        wmatch : ['15', '31', '63'][startindex % 3],
                        minbid : 3.3,
                        deviceprefer : (startindex%3) ? 0 : 2,
                        unitbid : 10 + +startindex + '',
                        matchPriceEnableStatus: 0
                    };
                    detailresitems.push(optItem);
                }
                break;
            case 809 :
                var optItem;
                var yAxis = "[0, 1, 6, 11, 23, 48, 84, 137, 232," 
                          +  "592, 808, 886, 958, 1032, 1098, 1161,"
                          +  "1197, 1235, 1269, 1301, 1406, 1468, "
                          +  "1508, 1533, 1554, 1566, 1568, 1573, "
                          +  "1575, 1575, 1576, 1577, 1577, 1577, 1577, 1577]";
    
                var xAxis = "[0.0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, "
                          +  "1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9," 
                          +  "2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, "
                          +  "7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0]";
                for (; startindex < len; startindex++) {
                    optItem = {
                        planname : '暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划暂停推广计划',
                        planid : 100 + startindex,
                        mPriceFactor : 0.3,
                        //参考出价
                        recmmPriceFactor : 1.1,
                        click : 6,
                        predictClick : 808,
                        reason : 1,
                        dotNum : 36,
                        xAxis : xAxis,
                        yAxis : yAxis
                    };
                    detailresitems.push(optItem);
                }
                break;
            case 811 :
                var optItem;
                for (; startindex < len; startindex++) {
                    optItem = {
                        unitname : '暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元',
                        unitid : 1000 + startindex,
                        phone : '123212',
                        shows : '121278'
                    };
                    detailresitems.push(optItem);
                }
                data.commData = data.commData || {};
                data.commData.clkRatio = 34;
                break;
            case 812 : 
                var optItem;
                for (; startindex < len; startindex++) {
                    optItem = {
                        unitname : '暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元暂停推广单元',
                        unitid : 1000 + startindex,
                        shows : '121278'
                    };
                    detailresitems.push(optItem);
                }
                data.commData = data.commData || {};
                data.commData.clkRatio = 134;
                break;
            case 813 :
                var optItem;
                for (; startindex < len; startindex++) {
                    optItem = {
                        winfoid: startindex,  //关键词ID
                        showword: '超长关键词超长关键词超长关键词超长关键词超长关键词',  //关键词字面
                         shows: 123,   //近7天展现次数
                        ideaid: 1223,  //创意ID
                        reason: startindex % 3 + 1,   //建议理由
                        isopted:  startindex % 2,// 是否优化过0=未优化 1=优化过
                        // 1--高消费词。话术："移动高消费词（近n天移动消费xx元），优化降低成本"
                        // 2--上方展现资格。话术："优化获得稳定移动上方展现资格"
                        // 3--质量度相对低。话术：xx个同行关键词移动端质量度优于您
                        suggestValue: '1213',  //分别对应建议理由的值XX
    
                        showqstat: startindex % 10,  //移动质量度
                        showqscore : startindex%10,
    
                        mshowq: '11',  //移动质量度
                        mqscore: startindex%10,
    
                        showwords: '["关键词1","关键词2"]',
                        ideaid : startindex+1
                        
                    };
                    detailresitems.push(optItem);
                }
                break;
            case 815 :  // 推广电话、App强样式 展现次数
            case 817 :
                var optItem;
                for (; startindex < len; startindex++) {
                    optItem = {
                        winfoid : startindex,
                        showword : '这是个关键词&关键词&很关键的词这是个关键词',
                        unitid : 1000 + startindex,
                        unitname : '这是个测试998q74推广单元暂停推广单元暂停推',
                        planid : 100 + startindex,
                        planname : '这是个测试998q74计划计划暂停推广计划暂停',
                        mobileshow : 5,   // 移动展现
                        strongstyleshow : 3.55,   // 强样式展现
                        mPriceFactor : 2.89,   // 移动出价系数
                        bid : 345 + startindex + '' ,  // 出价
                        recmbid : 351,  // 建议出价
                        // 建议出价历史表现
                        suggestperformance : 365
                    };
                    detailresitems.push(optItem);
                }
                data.commData = data.commData || {};
                data.commData.data_time = '1336140365'; // 10位
                break;
            case 816 :  // 推广电话、App强样式 实时展现情况
            case 818 :
                var optItem;
                for (; startindex < 18; startindex++) {
                    optItem = {
                        winfoid : startindex,
                        showword : '这是个关键词&关键词&很关键的词这是个关键词',
                        unitid : 1000 + startindex,
                        unitname : '这是个测试998q74推广单元暂停推广单元暂停推',
                        planid : 100 + startindex,
                        planname : '这是个测试998q74计划计划暂停推广计划暂停',
                        mobileshow : 5,
                        strongstyleshow : 3.55,
                        mPriceFactor : 2.89, // 移动出价系数
                        bid : 345 + startindex + '' ,  // 出价
                        recmbid : 3976,  // 建议出价
                        rankinfo : "[['北京',2],['四川',3]]"  // 地域排名
                    };
                    detailresitems.push(optItem);
                }
                data.commData = data.commData || {};
                data.commData.data_time = '1336140186';
                data.commData.sequence = 3;
                break;
            /** ******** 扩大商机包 ********* */
            // 优化出价
            case 203 :
            // 行业领先包，关键词出价
            case 607 :
            // 账户质量评分融入关键词出价优化项
            case 3007:
                for (; startindex < len; startindex++) {
                    detailresitems.push({
                        showword : '<input>' + startindex
                            + ' 超长关键词超长关键词超长关键词超长关键词超长关键词',
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        planid : '10' + startindex,
                        unitid : '100' + startindex,
                        winfoid : '1000' + startindex,
                        bid : 32.99 +startindex + '',
                        wmatch : ['15', '31', '63'][startindex % 3],
                        unitbid : 10 + +startindex + '',
                        recmbid : 100 + +startindex + '',
                        //reason 15: 左侧首屏展现概率 16: 左侧展现概率
                        reason: ['15', '16'][startindex % 2],
                        showratio: 35 + startindex, // 左侧（首屏）展现概率
                        targetshowratio: 56 + startindex, // 目标左侧（首屏）展现概率
                        matchPriceEnableStatus: 0
    
                    });
                }
                break;
            // 优化匹配
            case 204 :
            case 606 : // 行业领先包，关键词匹配
            case 906: // 旺季包，匹配优化项
            case 3006: // 账户质量评分融入匹配模式优化项
                var showwordArr;
                var showword;
                var wordInfo;
                var matchlist = ['15', '31-0', '63', '31-1', '31-3'];
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' 超长关键词超长关长关键词超长关键词超长关键词'
                            + '超长关键词超长关键词超长关键词超长关键词长关键'
                            + '词超长关键词超长关键词超长关键词超长关键词超长'
                            + '关键词超长关键词键词超长关键词超长关键词超长关',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '推荐关键词推荐关键词推荐关键词推荐关键词推荐推荐关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordInfo = {
                        showword: showword,
                        unitname: '推广单元超长超长超长超长超长超长推广单元'
                            + '推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname: '推广计划超长超长超长超长超长超长推广计划'
                            + '推广计划推广计划推广计划推广计划推广计划推广计划',
                        planid: '10' + startindex,
                        unitid: '100' + startindex,
                        winfoid: '1000' + startindex,
                        wmatch: matchlist[startindex % 3],
                        recmwmatch: matchlist[startindex % 3],
                        reason: (+opttypeid == 906)
                            ? 3 : (parseInt(Math.random() * 3) + 10),
                        unitbid: 10 + +startindex + '',
                        showqscore: startindex%10
    
                    };
                    if (startindex % 2) {
                        wordInfo.bid = startindex + '';
                    }
                    detailresitems.push(wordInfo);
                }
                break;
            // 新提词
            case 205 :
                for (; startindex < endindex + 1; startindex++) {
                    detailresitems.push({
                                showword : '<input>' + startindex
                                        + ' 超长关键词超长关键词超长关键词超长关键词超长关键词',
                                dailypv : 100,
                                kwc : 5,
                                isfstscreen : (((startindex - 6) > 0) ? 0 : 1) + '',
                                recmunitname : '推广单元' + startindex,
                                recmplanname : '推广计划' + startindex,
                                recmbid : 100 + +startindex + '',
                                recmwmatch : ['15', '31', '63'][startindex % 3]
                            });
                }
                break;
    
            /** ******** 质量度优化包 ********* */
            case 301 :
                for (; startindex < endindex + 1; startindex++) {
                    detailresitems.push({
                                showword : '<input>' + startindex
                                        + ' 超长关键词超长关键词超长关键词超长关键词超长关键词',
                                dailypv : 100,
                                kwc : 5,
                                isfstscreen : (((startindex - 6) > 0) ? 0 : 1) + '',
                                recmunitname : '推广单元' + startindex,
                                recmplanname : '推广计划' + startindex,
                                recmbid : 100 + +startindex + '',
                                recmwmatch : ['15', '31', '63'][startindex % 3],
                                origshowword : '高难度推左词'
                            });
                }
                break;
            case 302 :
                for (; startindex < len; startindex++) {
                    detailresitems.push({
                        unitname: '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname: '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        planid: '10' + startindex,
                        unitid: '100' + startindex,
                        ideaid: '1212,34,21'
                            });
                }
                break;
            case 313 :
            case 303 :
                var extra = param.condition.extra;
                //extra = extra.substring(3);
                var hasword = extra.indexOf('word');
                var hasidea = extra.indexOf('idea');
                var attrArr = ['ideaid', 'shadow_ideaid', 'shadow_ideastat',
                    'title', 'shadow_title', 'desc1',
                    'shadow_desc1', 'desc2', 'shadow_desc2',
                    'url', 'shadow_url', 'showurl',
                    'shadow_showurl', 'unitid', 'planid',
                    'pausestat', 'activestat', 'ideastat'];
                for (; startindex < len; startindex++) {
                    var obj;
                    if (extra == 'idea' || hasidea > -1) {
                        obj = {
                            //                        ideaid : 1,
                            //                        title : '创意标题',
                            //                        desc1 : '创意描述1',
                            //                        desc2 : '创意描述2',
                            //                        url : 'baidu.com',
                            //                        showurl : '创意URL',
                            /*isopted: 1,*/
                            showword : '[231,1223,34324,32412]'
                        };
                        for (var j = attrArr.length; j --;) {
                            obj[attrArr[j]] = ideaLevelData[attrArr[j]](startindex);
                        }
                    } else {
                        obj = {
                            showword : '<input>' + startindex
                                + ' 超长关键词超长关键词超长关键词超长关键词超长关键词',
                            unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                            planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                            showqstat : 13,
                            showqscore : startindex%10,
                            winfoid : startindex%10,  //添加，线上请求有此返回
                            ideaid : startindex,
                            isdecr : startindex % 2,
                            beginvalue : 1223,
                            endvalue : 23213,
                            decr : 213123,
                            decrtype : 1,
                            ideaquality: startindex % 3,
                            pageexp: startindex % 6,
                            pcqpeerpnt: (startindex % 3) == 0 ? undefined 
                                        : ((startindex % 3) == 1 
                                            ? (startindex * 97) % 100 : 0)
                                        //返回值为，undefined、(startindex * 97) % 100、0
                                        //其中undefined对应页面-
                                        //(startindex * 97) % 100对应超越竞争对手的数值
                                        //0对应表现优秀
                        };
                    }
                    detailresitems.push(obj);
                }
                break;
            case 304 :
                for (; startindex < len; startindex++) {
                    detailresitems.push({
                                showword : 'query<input>' + startindex
                                    + ' 超长关键词超长关键词超长关键词超长关键词超长关键词',
                                unitname : 'query推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                                planname : 'query推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                                showqstat : '21',
                                showqscore : startindex%10,
                                ideaid : 1,
                                isdecr : startindex % 2,
                                beginvalue : 1223,
                                endvalue : 23213,
                                decr : 213123,
                                decrtype : 1
                            });
                }
                p('111')
                break;
    
            /** ******** 智能提词包 ********* */
            case 501 :
            case 502 :
            case 503 :
            case 504 :
            case 604 : // 行业领先包的行业优质词优化建议，复用智能提词包的
            case 704:  // 突降急救包升级版，计划被删除优化项
            case 709:  // 突降急救包升级版，单元被删除优化项
            case 711:  // 突降急救包升级版，关键词被删除
            case 904: // 行业旺季包提词建议
            case 3004:  // 账户质量评分融入优化建议，复用行业包优质词优化建议
            case 1008: // 转化提升包，低价提核心词
                var tnum = endindex;
                var showword;
                var showwordArr;
                for (; startindex <= tnum; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                        + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                        '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                        '键词键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        '推荐关键词推荐关键词推荐关键词推荐关键词推荐关键词推荐关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        'recmword'
                    ];
                    showword = showwordArr[startindex % 5];
                    detailresitems.push({
                        wordid: startindex + 1,
                        showword: showword,
                        isnewword: startindex % 2,// 是否是今日新增建议关键词，1表示是，0表示否
                        dailypv: 100,
                        kwc: 5,
                        isfstscreen: (((startindex - 9) > 0) ? 0 : 1) + '',
                        recmunitname: startindex == 0 ? ('新单元') : ('很长很长的很长很长的很长很长的很长很长的很长很长的单元100' + startindex),
                        recmplanname: startindex == 0 ? ('新计划') : ('涅槃计划_' + startindex),
                        recmbid: 100 + +startindex + '',
                        recmwmatch: ['31'][startindex % 3],
                        recmwctrl: ['3'][startindex % 3],
                        origshowword: '高难度推左词对的对的',
                        recmplanid: startindex + '',
                        recmunitid: startindex == 0 ? '0' : (1000 + startindex + 5 + ''),
                        // 打折词新增
                        uuid: '' + parseInt(Math.random() * 100000),
                        wordRatio: '' + Number(Math.random() * 10).toFixed(1), // 打折的折扣
                        discountBeginDate: '2013-08-01',// 打折开始时间
                        discountEndDate: '2013-08-31' //打折结束时间
                    });
                }
                break;
            case 505 :
                for (; startindex < endindex + 1; startindex++) {
                    detailresitems.push({
                                showword : '<input>' + startindex
                                        + ' 超长关键词超长关键词超长关键词超长关键词超长关键词',
                                isnewword : startindex % 2,// 是否是今日新增建议关键词，1表示是，0表示否
                                dailypv : 100,
                                kwc : 5,
                                isfstscreen : (((startindex - 20) > 0) ? 0 : 1)
                                        + '',
                                recmunitname : '推广单元' + startindex,
                                recmplanname : '推广计划' + startindex,
                                recmbid : 100 + +startindex + '',
                                recmwmatch : ['15', '31', '63'][startindex % 3],
                                origshowword : '高难度推左从噢噢从',
                                recmplanid : startindex % 4,
                                recmunitid : startindex % 4,
                                // 打折词新增
                                uuid: '' + parseInt(Math.random() * 100000),
                                wordRatio: '' + Number(Math.random() * 10).toFixed(1), // 打折的折扣
                                discountBeginDate: '2013-08-01',// 打折开始时间
                                discountEndDate: '2013-08-31' //打折结束时间
                            });
                }
                break;
            /************行业领先包*************/
            case 814:
            case 603:
                var recmdSchedule = {
                    suggestcyccnt: 13,
                    suggestcyc : '[[201,204],[308,318]]',
                    plancyc : "[[101,102],[118,121],[114,118]]",
                    potionalclk: [],//"[13, 34, 16, 88, 30, 90]",
     
                    hotlevel: [],//"[53, 34, 76, 18, 60, 20]"               searchcount: [],
                    potentialclkrate: [],
                    competehotlevel: []
                };
                for (var i = recmdSchedule.suggestcyccnt; i --;) {
                    recmdSchedule.potionalclk[i] = parseInt(Math.random() * 100);
                    recmdSchedule.hotlevel[i] = parseInt(Math.random() * 100);
                    recmdSchedule.searchcount[i] = parseInt(Math.random() * 10000);
                    recmdSchedule.potentialclkrate[i] = parseInt(Math.random() * 2)
                        * parseInt(Math.random() * 400);
                    recmdSchedule.competehotlevel[i] = parseInt(Math.random() * 2)
                        * parseInt(Math.random() * 11);
                }
                recmdSchedule.potionalclk = '['
                    + recmdSchedule.potionalclk.toString() + ']';
                recmdSchedule.hotlevel = '['
                    + recmdSchedule.hotlevel.toString() + ']';
                recmdSchedule.searchcount = '['
                    + recmdSchedule.searchcount.toString() + ']';
                recmdSchedule.potentialclkrate = '['
                    + recmdSchedule.potentialclkrate.toString() + ']';
                recmdSchedule.competehotlevel = '['
                    + recmdSchedule.competehotlevel.toString() + ']';
                detailresitems.push(recmdSchedule);
                break;
            case 206: // 开拓客源包新增的时段优化项
                var recmdSchedule = {
                    suggestcyc : "[[204,208],[109,111],[308,318],[609,618],[715,720]]",
                    plancyc : "[[101,102],[118,121],[114,118]]",
                    potionalclk: [],//"[13, 34, 16, 88, 30, 90]",
                    hotlevel: [],//"[53, 34, 76, 18, 60, 20]"
                    wisePv : [],
                    wiseAcp : []
                };
                for (var i = 0; i < 30; i ++) {
                    recmdSchedule.potionalclk[i] = parseInt(Math.random() * 100);
                    recmdSchedule.hotlevel[i] = parseInt(Math.random() * 100);
                    recmdSchedule.wisePv[i] = parseInt(Math.random() * 100);
                    recmdSchedule.wiseAcp[i] = parseInt(Math.random() * 100);
                }
                recmdSchedule.potionalclk = '[' + recmdSchedule.potionalclk.toString() + ']';
                recmdSchedule.hotlevel = '[' + recmdSchedule.hotlevel.toString() + ']';
                recmdSchedule.wisePv = '[' + recmdSchedule.wisePv.toString() + ']';
                recmdSchedule.wiseAcp = '[' + recmdSchedule.wiseAcp.toString() + ']';
                detailresitems.push(recmdSchedule);
                break;
            /************突降急救包升级版*************/
            case 702: // 账户预算下调
                var bgtData = {
                    bgttype : 1, // 预算类型。0：未设置预算。1：设置日预算。2：设置周预算。
                    daybgtdata : { // 存储日预算数据
                        daybgtvalue : 200.0,// 当前日预算
                        dayanalyze : {
                            tip : 3,
                            suggestbudget : 500.0, // 建议日预算
                            lostclicks : null, // 损失点击数
                            show_encourage : 1, // 是否显示同行激励
                            model_num : 2, // 同行标杆数
                            words : '你好/你坏', // 核心关键词字面串。以“/”作为间隔
                            wordids : '1' // 核心关键词id值
                        }
                    },
                    weekbgtdata : { // 存储周预算基础数据与分析数据,此处结构和原涅槃周预算对应部分一致，未修改
                        weekbgtvalue : 2000.0, // 周预算值
                        weekanalyze : {
                            tip : 3,
                            suggestbudget : 5000.0,// 建议周预算
                            lostclicks : 20
                            // 损失点击数
                        },
                        istargetuser : 0
                        // 是否为目标用户，0不是目标用户，1是目标用户
                    }
                };
    
                data.listData.push(bgtData);
                break;
            case 801:  // 移动优化包
                var tnum = endindex;
                for (; startindex <= tnum; startindex++) {
                    detailresitems.push({
                                showword : startindex
                                        + ((startindex%5) ? '出资加盟一家大型地商业电影院线要多少费用呢' : '吉川家康历史'),
                                isnewword : startindex % 2,// 是否是今日新增建议关键词，1表示是，0表示否
                                dailypv : 100,
                                kwc : 5,
                                isfstscreen : (((startindex - 9) > 0) ? 0 : 1) + '',
                                recmunitname : startindex == 0 ? ('新单元') : ('单元100很长很长的很长很长的很长很长的很长很长的很长很长' + startindex),
                                recmplanname : startindex == 0 ? ('新计划') : ('涅槃计划_' + startindex),
                                recmbid : 100 + +startindex + '',
                                recmwmatch : ['15', '31', '63'][startindex % 3],
                                origshowword : '高难度推左词对的对的',
                                recmplanid : startindex + '',
                                recmunitid : startindex == 0 ? '0' : (1000 + startindex + 5 + ''),
                                recmideaid : 34 + startindex,
                                attr_index : '[1,2,3,4,5,6,7,8,9,10]'
                            });
                }
                break;
            case 808 :
                 var tnum = endindex;
                for (; startindex <= tnum; startindex++) {
                    detailresitems.push({
                                url : 'http://www.baidu.com?sfsdfasdfasdfasdfasdfadsfsdfsdfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                                urlClickTimes : 100,
                                reason : '1,2,3,4'
                            });
                }
                break;
                break;
            case 807 :
            case 806 :
                for (; startindex < len; startindex++) {
                    var obj;
                        obj = {
                            ideaid : startindex+1,
                            unitid : startindex+1,
                            unitname : '805805这是个测试哦',
                            planid : startindex+1,
                            planname : '805805这是个测试哦',
                            title : 'Torry',
                            desc1 : '创意描述1',
                            desc2 : '创意描述2',
                            url : 'baidu.com',
                            showurl : '创意URL',
                            mshowurl : 'http://mobile.baidu.com',
                            miurl : 'http://miurl.baidu.com',
                            isopted : startindex%2,
                            shadow_ideaid: startindex + 1000,
                            shadow_title : 'shadow王石颖',
                            shadow_desc1 : '创意描述1shadow',
                            shadow_desc2 : 'shadow创意描述2',
                            shadow_showurl : 'google.com',
                            shadow_url : 'shadow创意URL',
                            shadow_mshowurl : 'shadow_mshowurl.com',
                            shadow_miurl : 'shadow_miurl.com',
                            shadow_ideastat: startindex,
                            pausestat : startindex%2,
                            ideastat : [0, 1, 2, 4, 5,7][Math.round(Math.random() * 100) % 6],
                            reason : startindex%4+1,
                            deviceprefer : (startindex%3) ? 0 : 2,
                            siteq: parseInt(Math.random() * 100) % 4
                        };
                    detailresitems.push(obj);
                }
                break;
            case 805 :
                for (; startindex < len; startindex++) {
                    var obj;
                        obj = {
                            winfoid:startindex,
                            showword : '805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦',
                            planid : startindex+1,
                            planname : '805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦',
                            unitid : startindex+1,
                            unitname : '805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦805805这是个测试哦',
                            wurl :  'http://pc.baidu.com',
                            mwurl :  'http://mobile.12345.com',
                            showqstat : '21',
                            showqscore : startindex%10,
                            shadow_wurl :  'http://shadow.baidu.com',
                            shadow_mwurl :  'shadow.mobile.com',
                            isopted : startindex%2,
                            pausestat : startindex%2,
                            wordstat : [0, 1, 2, 4, 5,7,13,14][startindex % 8],
                            reason : startindex%4+1,
                            deviceprefer : (startindex%3) ? 0 : 2,
                            mshowurl: 'http://www.baidu.com',
                            siteq: parseInt(Math.random() * 100) % 4
    
                        };
                    detailresitems.push(obj);
                }
                break;
            /*************行业旺季包***************/
            case 901: // 账户预算
                detailresitems.push({
                    //weekbudget: 20.45, // 用户当前周预算
                    //wbudget: 3.25, // 用户当前日预算
                    bgttype: 1, // 预算类型。0：未设置预算。1：设置日预算。2：设置周预算。
                    suggestbudget: 10.5,
                    //peershowword: '', // 分隔的关键词字面,同行核心关键词字面，多个字面之间使用/分隔    可选
                    clklost: 300, // 损失点击量
                    modelcount: 233, // 同行个数
                    saveclk: 23//, // 可挽回损失点击率
                   // buyratio: 19 // 旺季包同行客服旺季预算提升率
                });
                break;
            case 902: // 计划预算
                for (; startindex < len; startindex++) {
                    detailresitems.push({
                        planid: startindex + 100,
                        planname: '推广 &lt;a"abc"计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        offtime: (new Date()).valueOf(),
                        wbudget: 65.8 + startindex, // 日预算
                        suggestbudget: 100.5 + startindex, //
                        bgttype: 1, // 预算类型。0：未设置预算。1：设置日预算。2：设置周预算。
                        clklost: 300 + startindex,  // 损失点击量
                        saveclk: 56
                    });
                }
                break;
            case 903: // 关键词出价
                var showword;
                var showwordArr;
                var wordInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        planid : '10' + startindex,
                        unitid : '100' + startindex,
                        winfoid : '1000' + startindex,
                        wmatch : ['15', '31', '63'][startindex % 3],
                        wctrl: ['0', '1', '3'][Math.round(Math.random() * 2)],
                        unitbid : 10 + +startindex + '',
                        recmbid : 100 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore: startindex%10,
                        reason: parseInt(Math.random() * 10) % 2 ? 13 : 14, // 13: 左侧首屏展现概率出价建议 14: 左侧展现概率出价建议
                        showratio: 35 + startindex, // 左侧（首屏）展现概率
                        targetshowratio: 56 + startindex, // 目标左侧（首屏）展现概率
                        matchPriceEnableStatus: 0
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
                    detailresitems.push(wordinfo);
                }
                break;
            // 转化提升包优化项：计划预算
            case 1001:
                var showword;
                var showwordArr;
                var wordInfo;
                var optInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        winfoid : '1000' + startindex,
                        unitbid : 10 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore : startindex%10,
                        profit: '' + startindex * 3 + 23199, // 节省成本/增加转化
                        weekcsm: (1223.89 + startindex * 8) + ''
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
    
                    optInfo = {
                        planid: '10' + startindex,
                        offtime: (new Date()).valueOf() + startindex * 120,
                        translost: startindex % 2 ? null : (startindex * 100 + 99), // 损失转化
                        wbudget: (123.32 + startindex * 5) + '',
                        bgttype: 1, // 0:不限定预算
                        suggestbudget: (123.32 + startindex * 5 + 300) + ''
                    }
                    util.extend(wordinfo, optInfo);
                    detailresitems.push(wordinfo);
                }
                break;
            // 转化提升包优化项：否定词
            case 1002:
                var showword;
                var showwordArr;
                var wordInfo;
                var optInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        winfoid : '1000' + startindex,
                        unitbid : 10 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore : startindex%10,
                        profit: '' + startindex * 3 + 23199, // 节省成本/增加转化
                        weekcsm: (1223.89 + startindex * 8) + ''
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
    
                    optInfo = {
                        unitid : '100' + startindex,
                        uncorrelatedclk: parseInt(Math.random() * 10000 + startindex),
                        suggestacuneg: JSON.stringify(showwordArr)
                    }
                    util.extend(wordinfo, optInfo);
                    detailresitems.push(wordinfo);
                }
                break;
            // 转化提升包优化项：时段
            case 1003:
                var showword;
                var showwordArr;
                var wordInfo;
                var optInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' &lt;a"abc"超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        winfoid : '1000' + startindex,
                        unitbid : 10 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore : startindex%10,
                        profit: '' + startindex * 3 + 23199, // 节省成本/增加转化
                        weekcsm: (1223.89 + startindex * 8) + ''
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
    
                    optInfo = {
                        planid: '10' + startindex,
                        suggestcyc : "[[204,208],[109,111],[308,318],[609,618],[715,720]]",
                        plancyc : "[[101,102],[118,121],[114,118]]",
                        cycnum: parseInt(Math.random() * 50)
                    }
                    util.extend(wordinfo, optInfo);
                    detailresitems.push(wordinfo);
                }
                break;
            // 转化提升包优化项：低价提核心词
            case 1004:
                var showword;
                var showwordArr;
                var wordInfo;
                var optInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        winfoid : '1000' + startindex,
                        unitbid : 10 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore : startindex%10,
                        profit: '' + startindex * 3 + 23199, // 节省成本/增加转化
                        weekcsm: (1223.89 + startindex * 8) + ''
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
    
                    optInfo = {
                        recmshowword: startindex + '推荐长关键词长关键词超长关键词超长关键词超长关键词超长关键词超'
                    };
                    util.extend(wordinfo, optInfo);
                    detailresitems.push(wordinfo);
                }
                break;
            // 转化提升包优化项：出价建议详情
            case 1005:
                var showword;
                var showwordArr;
                var wordInfo;
                var optInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' &lt;aa""超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        winfoid : '1000' + startindex,
                        unitbid : 10 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore : startindex%10,
                        profit: '' + startindex * 3 + 23199, // 节省成本/增加转化
                        weekcsm: (1223.89 + startindex * 8) + ''
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
    
                    optInfo = {
                        showratio: startindex + 10.5,
                        recmbid: startindex + 100
                    }
                    util.extend(wordinfo, optInfo);
                    detailresitems.push(wordinfo);
                }
                break;
            // 转化提升包优化项：缩匹配
            case 1006:
                var showword;
                var showwordArr;
                var wordInfo;
                var optInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        winfoid : '1000' + startindex,
                        unitbid : 10 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore : startindex%10,
                        profit: '' + startindex * 3 + 23199, // 节省成本/增加转化
                        weekcsm: (1223.89 + startindex * 8) + ''
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
    
                    optInfo = {
                        uncorrelatedclk: parseInt(Math.random() * 10000 + startindex),
                        wmatch: '63',
                        recmwmatch: ['15', '31'][startindex % 2]
                    }
                    util.extend(wordinfo, optInfo);
                    detailresitems.push(wordinfo);
                }
                break;
            // 转化提升包优化项：优化网站速度
            case 1007:
                var showword;
                var showwordArr;
                var wordInfo;
                var optInfo;
                for (; startindex < len; startindex++) {
                    showwordArr = [
                        '<input>' + startindex
                            + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                            '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                            '键词键词超长关键词超长关键词超长关键词',
                        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                        '鲜花',
                        'word123中国'
                    ];
                    showword = showwordArr[startindex % 5];
                    wordinfo = {
                        showword : showword,
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        winfoid : '1000' + startindex,
                        unitbid : 10 + +startindex + '',
                        showqstat: wordLevelData.data['showqstat'](startindex),
                        showqscore : startindex%10,
                        profit: '' + startindex * 3 + 23199, // 节省成本/增加转化
                        weekcsm: (1223.89 + startindex * 8) + ''
                    };
                    if (startindex % 2) {
                        wordinfo.bid = startindex + '';
                    }
    
                    optInfo = {
                        conntime: parseInt(Math.random() * 10),
                        siteid: startindex + 10000
                    }
                    util.extend(wordinfo, optInfo);
                    detailresitems.push(wordinfo);
                }
                break;
            case 306:
                for (; startindex < 10; startindex++) {
                    // 建议升级mock方式
                    var item = {
                        "mtid": 1,
                        "unitid": startindex + 50,
                        "planid": startindex + 10,
                        "unitname" : '推广单元超长超长超长超长超长超长推广',
                        "planname" : '推广计划超长超长超长超长超长超长推广计划推广计',
                        "ideaid": startindex + 17,
                        "beginvalue": startindex + 1,
                        "endvalue": startindex + 100,
                        "content": [{
                            "title": "一朵鲜花",
                            "url": "http://www.baidu.com"
                        }, {
                            "title": "二朵鲜花" + startindex,
                            "url": "http://www.baidu.com"
                        }, {
                            "title": "三朵鲜花" + startindex,
                            "url": "http://www.baidu.com"
                        }, {
                            "title": "四朵鲜花" + startindex,
                            "url": "http://www.baidu.com"
                        }, {
                            "title": "五朵大鲜花-好贵" + startindex,
                            "url": "http://www.baidu.com"
                        }]
                    };
    
                    detailresitems.push(item);
                }
            break;
    
            case 2001:
            case 2002:
            case 2003:
            case 2004:
            case 2005:
            case 2006:
            case 2007:
            case 2008:
                var item;
                var showwordArr = [
                    '<input>' + startindex
                        + ' 超长关键词超长关长关键词超长关键词超长关键词超长关键词超长关键词超长关键' +
                        '词超长关键词长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关' +
                        '键词键词超长关键词超长关键词超长关键词',
                    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                    '超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词超长关键词',
                    '鲜花',
                    'word123中国'
                ];
                len = parseInt(Math.random() * 100);
                for (; startindex < len; startindex++) {
                    item = {
                        showword: showwordArr[startindex % 5],
                        unitname : '推广单元超长超长超长超长超长超长推广单元推广单元推广单元推广单元推广单元推广单元推广单元',
                        planname : '推广计划超长超长超长超长超长超长推广计划推广计划推广计划推广计划推广计划推广计划推广计划',
                        clk : parseInt(Math.random() * 1000),
                        shows: parseInt(Math.random() * 1000),
                        paysum : (Math.random() * 1000) + '',
                        bid: (Math.random() * 1000) + '',
                        budget: (Math.random() * 1000) + '',
                        bouncerate: parseInt(Math.random() * 100),
                        showqstat: startindex % 10 + 1,
                        showqscore: startindex % 10 + 1,
                        unitid: startindex,
                        winfoid: startindex,
                        planid: startindex,
                        matchPriceEnableStatus: 0
                    }
                    detailresitems.push(item);
                }
    
                break;
            case 3002:
                var num = parseInt(Math.random() * 15) + 1;
                for (var m = 0; m < num; m++) {
                    detailresitems.push({
                        planid : 100 + m,
                        planname : '<button>&lt;这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                            + m,
                        optmd5 : '3002_' + m, // 别忘了这个
                        wbudget: 100, // 当前预算
                        suggestbudget : 166.88 + m, // 建议预算，元
                        offlinetime: '18:30', // 近期下线时间
                        clklost: 58 + m //损失点击
                    });
                }
                break;
            case 3003 : // 获取账户质量评分中推广时段优化项的列表
                var num = parseInt(Math.random() * 10) + 1;
                var recmdSchedule = {
                    suggestcyc : "[[204,208],[109,111],[308,318],[609,618],[715,720]]",
                    plancyc : "[[101,102],[118,121],[114,118]]",
                    potionalclk: [],//"[13, 34, 16, 88, 30, 90]",
                    hotlevel: [],//"[53, 34, 76, 18, 60, 20]"
                    wisePv : [],
                    wiseAcp : []
                };
                for (var i = 0; i < 30; i ++) {
                    recmdSchedule.potionalclk[i] = parseInt(Math.random() * 100);
                    recmdSchedule.hotlevel[i] = parseInt(Math.random() * 100);
                    recmdSchedule.wisePv[i] = parseInt(Math.random() * 100);
                    recmdSchedule.wiseAcp[i] = parseInt(Math.random() * 100);
                }
                recmdSchedule.potionalclk = '[' + recmdSchedule.potionalclk.toString() + ']';
                recmdSchedule.hotlevel = '[' + recmdSchedule.hotlevel.toString() + ']';
                recmdSchedule.wisePv = '[' + recmdSchedule.wisePv.toString() + ']';
                recmdSchedule.wiseAcp = '[' + recmdSchedule.wiseAcp.toString() + ']';
    
                for (var m = 0; m < num; m++) {
                    detailresitems.push($.extend({
                        planid : 100 + m,
                        planname : '<button>&lt;这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                            + m,
                        cycnum : parseInt(Math.random() * 24 * 7),
                        optmd5 : '3003_' + m, // 别忘了这个
                        estimateclick: 200 + m // 建议时段预估点击
                    }, recmdSchedule));
                }
                break;
        }
    
        detailresitems.forEach(function(item) {
                    var temp = item;
    
                    item = {
                        data : temp
                    };
    
                    data.detailresitems.push(item);
                    if (opttypeid == 801) {
                        data.commData.attr =  JSON.stringify([
                            {field:'展现理由',text:'黑马',desc:'二级理由1:最新出现的网民搜索词',icon:'new'},
                            {field:'展现理由',text:'百度相关搜索',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                            {field:'展现理由',text:'潜在客户',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                            {field:'展现理由',text:'同行动态',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                            {field:'展现理由',text:'我的选择',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                            {field:'展现理由',text:'搜索建议词',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                            {field:'展现理由',text:'网页相关词',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                            {field:'展现理由',text:'最近关注',desc:'二级理由1:最近关注',icon:'new'}
                        ])
                    }
                    
                });
    
        if (startindex == 90) {
            // 永远不要翻到第九页
            data.detailresitems = [];
        }
    
    //    if (opttypeid != 501) {
    //        rel.status = 500;
    //    }
    
    //    if (opttypeid == 901) {
    //        rel.status = 500;
    //        return rel;
    //    }
        rel.data = data;
        rel.timeout = 1000;
    
        return rel;
    };
});