/**
 * 获取包摘要的优化项信息接口
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var kslfData = storage.get('kslfData');
    if (kslfData === undefined) {
        kslfData = 0;
        storage.set('kslfData', 0);
    }

    module.exports = function (path, param) {
        var rel = tpl.success();
        var kmd5 = 'leowang721';
        
        var opttypes = param.absreqitems, opttime = (new Date()).valueOf();

        rel.data = {
            aostatus : 0,
            reqid : param.reqid || Math.round(Math.random() * 10000),
            absresitems : []
        };
    
        var itemdata;
        for (var i = 0; i < opttypes.length; i++) {
            itemdata = {
                optmd5 : kmd5,
                opttime : opttime,
                data : {
                    isnew : 'true'
                },
                compData : []
            };
            if (param.command == 'start') {
                itemdata.status = 1;
                itemdata.hasproblem = 0;
            } else if (param.command == 'query') {
                itemdata.status = 0;
                itemdata.hasproblem = 1;
            }

            
                
                itemdata.opttypeid = opttypes[i].opttypeid;
                itemdata.optmd5 = opttypes[i].opttypeid;
                switch (+opttypes[i].opttypeid) {
                    case 101 :
                        itemdata.data = {
                            rank : 1,
                            decrtype : 'clks',
                            isnew : 'true'
                        };
                        break;
                    case 102 : // 账户预算
                        itemdata.data = {
                            offtime : (new Date()).valueOf(),
                            suggestbudget : 213.111,
                            bgttype : 2,
                            rank : 1,
                            decrtype : 'clks',
                            isnew : 'true',
                            clklost : 0
                        };
                        break;
                    case 103 : // 计划预算
                        itemdata.data = {
                            count : 5,
                            rank : 1,
                            isnew : 'true',
                            decrtype : 'clks',
                            clklost : 200
                        };
                        for (var m = 0; m < 4; m++) {
                            itemdata.compData.push({
                                        isnew: 'true',
                                        planname : '这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                        offtime : (new Date()).valueOf(),
                                        planid : 100 + m,
                                        suggestbudget : 100 + m, // 建议预算，元
                                        optmd5 : opttypes[i].opttypeid + '_' + m,
                                        bgttype : 1,
                                        clklost : 50
                                    });
                        }
                        break;
                    case 104 : // 搁置时段
                        itemdata.data = {
                            count : 5,
                            rank : 2,
                            isnew : 'true',
                            decrtype : 'clks'
                        };
                        for (var m = 0; m < 2 - kslfData; m++) {
                            itemdata.compData.push({
                                        planname : '这是一个很长的测试计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                        offtime : (new Date()).valueOf(),
                                        isnew : m % 3 == 0 ? 'true' : 'false',
                                        planid : 100 + m,
                                        optmd5 : opttypes[i].opttypeid + '_' + m
                                    });
                        }
                        break;
                    case 105 :
                    case 106 :
                    case 107 :
                    case 108 :
                    case 109 :
                    case 110 :
                    case 111 :
                    case 112 :
                    case 113 :
                    case 114 :
                    case 115 :
                    case 116 :
                        itemdata.data = {
                            count : opttypes[i].opttypeid,
                            totalrecmnum : 20,
                            totalnum : 7,
                            rank : 2,
                            decrtype : 'clks'
                        };
                        if (opttypes[i].opttypeid == 111
                                || opttypes[i].opttypeid == 116) {
                            itemdata.data.rank = 1;
                        } else if (opttypes[i].opttypeid == 110) {
                            itemdata.data.rank = 3;
                        }
    
                        break;
                    case 201 :
                        itemdata.data = {
                            suggestbudget : 201, // 建议预算
                            wbudget: 100, // 当前预算
                            clklost: 201, // 损失点击数
                            modelcount: 14, // 同行数量，有可能不存在该key
                            isnew: 'true',
                            bgttype: 1
                            // 预算类型。0：未设置预算。1：设置日预算。2：设置周预算。
                        };
                        break;
                    case 202 :
                        itemdata.data = {
                            count : 5,
                            clklost : 202,
                            isnew : 'true'
                        };
                        for (var m = 0; m < 1; m++) {
                            itemdata.compData.push({
                                planid: 100 + m,
                                planname: '<button>&lt;这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                                        + m,
                                offtime: (new Date()).valueOf(),
                                wbudget: 10.00, // 当前预算
                                suggestbudget: 100.44 + m, // 建议预算，元
                                clklost: 90,
                                modelcount : 16,
                                optmd5: opttypes[i].opttypeid + '_' + m,
                                bgttype: 1, // 预算类型。0：未设置预算。1：设置日预算
                                isnew: 'true'
                            });
                        }
                        break;
                    case 203 :
                    case 204 :
                    case 205 :
                        itemdata.data = {
                            count : opttypes[i].opttypeid,
                            totalrecmnum : 20,
                            totalnum : 7,
                            isnew : 'true'
                        };
                        break;
                    case 206: // 开拓客源包新增的时段优化项
                        itemdata.data = {
                            count: 3,
                            lostclks: opttypes[i].opttypeid
                        };
                        var num = 3;
                        for (var m = 0; m < num; m++) {
                            itemdata.compData.push({
                                planid : 100 + m,
                                planname : 'Plan ' + (m + 1) + '主要是为了区分，上面已经有了。长话述的存在以确定正常截断。',
                                cycnum : parseInt(Math.random() * 24 * 7),
                                extraclks: parseInt(Math.random() * 1000),
                                optmd5 : opttypes[i].opttypeid + '_' + m // 别忘了这个
                            });
                        }
                        break;
                    case 301 :
                        itemdata.data = {
                            count : 20,
                            totalrecmnum : 20,
                            totalnum : 7,
                            isnew : 'true'
                        };
                        break;
                    case 302 :
                        itemdata.data = {
                            count : 10
                        };
                        break;
                    case 303 :
                        itemdata.compData = [{
                                    startype : 1,
                                    count : 2,
                                    word_cnt_11 : 11,
                                    word_cnt_12 : 12,
                                    word_cnt_13 : 13
                                }, {
                                    startype : 2,
                                    count : 3,
                                    word_cnt_21 : 21,
                                    word_cnt_23 : 23
                                }]
                        break;
                    case 306 :
                        itemdata.data = {
                            count : 10,
                            clkratio: 30,
                            isnew: "true"
                        };
                        break;
                    case 313 :
                        itemdata.compData = [{
                            startype : 1,
                            count : 2,
                            isnew: 'true',
                            word_cnt_11 : 11/*,
                            word_cnt_12 : 12,
                            word_cnt_13 : 13*/
                        }, {
                            startype : 2,
                            count : 3,
                            isnew: 'true',
                            word_cnt_21 : 21/*,
                            word_cnt_23 : 23*/
                        }];
                        break;
                    case 501 :
                        itemdata.data = {
                            isnew: 'true',
                            count : 501,
                            totalrecmnum : 20,
                            totalnum : 7,
                            // 打折词新增，标识该用户是否是打折词用户
                            isDiscountUser: '' + parseInt(Math.random() * 100) % 2,
                            previewwords : '钱塘江,中国结,教师,渐进增强'
                        };
                        break;
                    case 502 :
                        itemdata.status = 2;
                        itemdata.data = {
                            isnew: 'true',
                            count : 502,
                            totalrecmnum : 110,
                            totalnum : 10,
                            // 打折词新增，标识该用户是否是打折词用户
                            isDiscountUser: '' + parseInt(Math.random() * 100) % 2,
                            previewwords : '张家界,乐乐网'
                        };
                        break;
                    case 503 :
                        itemdata.data = {
                            isnew: 'true',
                            count : 503,
                            totalrecmnum : 20,
                            totalnum : 7,
                            // 打折词新增，标识该用户是否是打折词用户
                            isDiscountUser: '' + parseInt(Math.random() * 100) % 2,
                            previewwords : '钱塘江汉中二啊的,中国结呵罗丽是是,我们的欧式李的个,渐进增强就是额宿舍,我们的欧式猪额反反复复'
                        };
                        break;
                    case 504 :
                        itemdata.data = {
                            isnew: 'true',
                            count : 504,
                            totalrecmnum : 20,
                            totalnum : 7,
                            // 打折词新增，标识该用户是否是打折词用户
                            isDiscountUser: '' + parseInt(Math.random() * 100) % 2,
                            previewwords : '钱塘江汉中二啊的,中国结呵罗丽是是,我们的欧式李的个,渐进增强就是额宿舍,我们的欧式猪额反反复复'
                        };
                        break;
                    /**********行业领先包的优化建议**************/
                    case 601 : // 账户预算建议 
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            tiptype : (parseInt(Math.random() * 10) % 2 + 1) + '' ,
                            percent : '88',
                            clklost: '2323',
                            bgttype : parseInt(Math.random()) + 1,
                            suggestbudget: '235',
                            wbudget: '222'
                        };
                        break;
                    case 602 : // 行业领先包计划预算优化建议
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            count : 12,
                            clklost: 238
                        };
                        var num = parseInt(Math.random() * 15) + 1;
                        for (var m = 0; m < num; m++) {
                            itemdata.compData.push({
                                planid : 100 + m,
                                planname : '<button>&lt;这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                                        + m,
                                optmd5 : opttypes[i].opttypeid + '_' + m, // 别忘了这个
                                suggestbudget : 100.444 + m, // 建议预算，元
                                wbudget: '222'
                            });
                        }
                        break;
                    case 603 : // 推广时段
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            count : 5
                        };
                        var num = parseInt(Math.random() * 10) + 1;
                        for (var m = 0; m < num; m++) {
                            itemdata.compData.push({
                                planid : 100 + m,
                                planname : '<button>&lt;这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                                        + m,
                                cycnum : parseInt(Math.random() * 24 * 7),
                                optmd5 : opttypes[i].opttypeid + '_' + m // 别忘了这个
                            });
                        }
                        break;
                    case 604 : // 行业优质词 
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            totalrecmnum : '50',
                            totalnum : '12'
                        };
                        break;
                    case 605 : // 搜索无效
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            count : 13
                        };
                        break;
                    case 606 : // 关键词匹配
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            count : 15
                        };
                        break;
                    case 607 : // 关键词出价
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            count : 34
                        };
                        break;
                    case 608 : // 质量度优化
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                        };
                        break;
                    /**********突降急救包升级版的优化建议**************/
                    case 701: // 账户余额为零
                        itemdata.data = {};
                        break;
                    case 702: // 账户预算下调
                    case 703: // 账户预算不足
                        itemdata.data = {
                            enddate: (new Date()).getTime() + '',
                            offtime : (new Date()).getTime()/*,
                            suggestbudget : 213.111,
                            bgttype : 2*/
                        };
                        break;
                    case 704: // 计划被删除
                    case 705: // 计划被暂停
    //                    itemdata.hasproblem = 1;
                        itemdata.data = {
                            totalrecmnum : '50',
                            count : Math.ceil(Math.random() * 100),
                            totalprocount: Math.ceil(Math.random() * 1000),
                            isnew: 'true'
                        };
                        break;
                    case 706 : // 计划预算下调
                    case 707: // 计划预算不足
                        var num = 1;
                        itemdata.data = {
                            enddate: (new Date()).getTime() + '',
                            count : num
                        };
                        for (var m = 0; m < num; m++) {
                            itemdata.compData.push({
                                planid : 100 + m,
                                isnew: 'true',
                                planname : '预算计划这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                                    + m,
                                offtime : (new Date()).getTime(),
                                optmd5 : opttypes[i].opttypeid + '_' + m // 别忘了这个
                            });
                        }
                        break;
                    case 708: // 时段设置不合理
                        var num = 1;
                        itemdata.data = {
                            count : num
                        };
                        for (var m = 0; m < num; m++) {
                            itemdata.compData.push({
                                planid : 100 + m,
                                planname : '这是一个很长的时段计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                                    + m,
                                optmd5 : opttypes[i].opttypeid + '_' + m // 别忘了这个
                            });
                        }
                        break;
                    case 709: // 单元被删除
                    case 710: // 单元被暂停
                        itemdata.data = {
                            totalrecmnum : '50',
                            count : Math.ceil(Math.random() * 100),
                            totalprocount: Math.ceil(Math.random() * 1000)
                        };
                        break;
                    case 711: // 关键词被删除
                    case 712: // 关键词被暂停
                    case 713: // 关键词搜索无效
                    case 714: // 关键词不宜推广
                    case 715: // 关键词检索量过低
                    case 716: // 关键词检索量下降
                    case 717: // 关键词匹配模式缩小
                    case 718: // 关键词左侧排名下降
                        itemdata.data = {
                            enddate: (new Date()).getTime() + '',
                            totalrecmnum : '50',
                            count: Math.ceil(Math.random() * 1000)
                        };
                        break;
                    case 801 : // 推词
                        itemdata.data = {
                            isnew: 'true',
                            count : 801,
                            totalrecmnum : 20,
                            totalnum : 7
                        };
                        break;
                    case 802 : // 提价，优化
                        itemdata.data = {
                            count : 802,
                            totalrecmnum : 20,
                            rank : 2
                        };
                        break;
                    case 803 : // 搜索词无效
                        itemdata.data = {
                            count : 803,
                            totalnum : 11,
                            rank : 2
                        };
                        break;
                    case 805 : // 搜索词无效
                        itemdata.data = {
                            count : 805,
                            totalnum : 11,
                            rank : 2
                        };
                        break;
                    case 806 : // 搜索词无效
                        itemdata.data = {
                            count : 806,
                            totalnum : 11,
                            rank : 2
                        };
                        break;
                    case 807 : // 搜索词无效
                        itemdata.data = {
                            count : 807,
                            totalnum : 11,
                            rank : 2
                        };
                        break;
                    case 808 : 
                        itemdata.data = {
                            isnew : 'true',
                            count : 808,
                            totalnum : 20,
                            datatime: 123
                        }
                        break;
                    case 809 :
                        itemdata.data = {
                            isnew : 'true',
                            count : 809,
                            totalnum : 20,
                            datatime: 123
                        }
                        break;
                    case 810 :
                        itemdata.data = {
                            isnew : 'true',
                            datatime: 123
                        }
                        break;
                    case 811 :
                    case 812 :
                        itemdata.data = {
                            isnew : 'true',
                            datatime: 123,
                            count : +opttypes[i].opttypeid,
                            totalnum : 12,
                            clkRatio : 12
                        }
                        break;
                    case 813 :
                        itemdata.data = {
                            isnew : 'true',
                            datatime: 123,
                            count : 813,
                            totalnum : 12
                        }
                        break;
                    case 814 : 
                        itemdata.data = {
                            isnew : 'true',
                            count : '2',
                            totalnum : 20,
                            lostclks: 66
                        }
                        itemdata.compData = [{
                            planid : 1,
                            optmd5 : 12,
                            planname : '计划名缩放实得分胜多负少地方似懂非懂胜多负少地方胜多负少地方',
                            cycnum : '8',
                            extraclks : '123'
                        }, {
                            planid : 112,
                            optmd5 : 112,
                            planname : 'sdf计划名缩放实得分胜多负少地方sdfsdf似懂非懂胜多负少地方胜多负少地方',
                            cycnum : '7',
                            extraclks : '123'
                        }]
                        break;
                    case 815 : // 电话推广强样式展现量
                        itemdata.data = {
                            count : 815,  // xx个关键词
                            total_missing_pv : 25,  // xx次强样式展现次数
                            isnew : 'true'  // 是否有更新
                        };
                        break;
                    case 816 : // 电话推广强样式展现情况
                        itemdata.data = {
                            count : 816,  // xx个关键词
                            isnew : 'false',
                            totalrecmnum : 30  // 建议词总数
                        };
                        break;
                    case 817 : // 推广电话强样式
                        itemdata.data = {
                            count : 817,  // xx个关键词
                            total_missing_pv : 27,  // xx次强样式展现机会
                            isnew : 'true'
                        };
                        break;
                    case 818 : // APP推广强样式
                        itemdata.data = {
                            count : 818,  // xx个关键词
                            isnew : 'false',
                            totalrecmnum : 30  // 建议词总数
                        };
                        break;
                    //////////////////行业旺季包优化项
                    case 901: // 账户预算
                        itemdata.data = {
                            count: 1
                        };
                        break;
                    case 902: // 计划预算
                        itemdata.data = {
                            count: parseInt(Math.random() * 100)
                        };
                        break;
                    case 903: // 关键词出价
                        itemdata.data = {
                            count: parseInt(Math.random() * 100)
                        };
                        break;
                    case 904: // 提词
                        itemdata.data = {
                            totalrecmnum: 80,
                            count: parseInt(Math.random() * 100)
                        };
                        break;
                    case 906:
                        itemdata.data = {
                            count: parseInt(Math.random() * 100)
                        };
                        break;
                    /**
                     * 转化提升包优化项摘要
                     */
                    /*
                     *  提升计划预算 1001
                     *  添加否定词 1002
                     *  添加优质时段 1003
                     *  提低价核心词-问题词详情 1004
                     *  提升出价 1005
                     *  缩小匹配 1006
                     *  优化网站速度 1007
                     */
                    case 1001:
                    case 1002:
                    case 1003:
                    case 1004:
                    case 1005:
                    case 1006:
                    case 1007:
                        itemdata.data = {
                            count: parseInt(Math.random() * 50),
                            totalrecmnum: 10,
                            profit: '' + parseInt(Math.random() * 150) // 节省成本/增加转化数
                        };
                        break;
                    case 2001:
                    case 2002:
                    case 2003:
                    case 2004:
                    case 2005:
                    case 2006:
                    case 2007:
                    case 2008:
                    case 2009:
                        itemdata.data = {
                            timestamp: new Date().valueOf(),
                            count: parseInt(Math.random() * 50)
                        };
                        break;
                    case 2010:
                    case 2011:
                        itemdata.data = {
                            timestamp: new Date().valueOf(),
                            count: parseInt(Math.random() * 50),
                            marketShare:20,
                            state: 1, // -1 下降 0 无变化 1 上升
                            stateRate: 50
                        };
                        break;
                    case 2012:
                        itemdata.data = {
                            timestamp: new Date().valueOf(),
                            count: parseInt(Math.random() * 50),
                            marketShare:20,
                            state: 1, // -1 下降 0 无变化 1 上升
                            stateRate: 50
                        };
                        break;
                    case 3002 : // 获取账户质量评分中计划预算优化项的列表
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            count : 12,
                            clklost: 238
                        };
                        var num = parseInt(Math.random() * 15) + 1;
                        for (var m = 0; m < num; m++) {
                            itemdata.compData.push({
                                planid : 100 + m,
                                planname : '<button>&lt;这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                                    + m,
                                optmd5 : opttypes[i].opttypeid + '_' + m, // 别忘了这个
                                budget: 100, // 当前预算
                                suggestbudget : 166.88 + m, // 建议预算，元
                                offlinetime: '18:30', // 近期下线时间
                                lostclick: 58 + m //损失点击
                            });
                        }
    
                        //itemdata.compData = [];
                        break;
                    case 3003 : // 获取账户质量评分中推广时段优化项的列表
                        //itemdata.hasproblem = parseInt(Math.random() * 10) % 2;
                        itemdata.data = {
                            count : 5
                        };
                        var num = parseInt(Math.random() * 10) + 1;
                        for (var m = 0; m < num; m++) {
                            itemdata.compData.push({
                                planid : 100 + m,
                                planname : '<button>&lt;这是一个很长的预算计划啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
                                    + m,
                                cycnum : parseInt(Math.random() * 24 * 7),
                                optmd5 : opttypes[i].opttypeid + '_' + m, // 别忘了这个
                                estimateclick: 200 + m // 建议时段预估点击
                            });
                        }
                        break;
                }
                itemdata.data.globalId = new Date().valueOf();
                
                rel.data.absresitems.push(itemdata);
            
        }
        
        
        // if (param.pkgids && param.pkgids[0] == 30) {
        //     for (var i = 0, item; item = rel.data.absresitems[i++];) {
        //         item.status = Math.round(Math.random() * 2);
        //     }
        // }
        rel.timeout = 1500;
        return rel;
    
    };
});