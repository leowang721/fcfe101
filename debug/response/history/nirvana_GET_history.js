define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        /*
        contentId = [
                        1,//每日预算
                        2,//推广地域
                        3,//IP排除
                        5,//是否参加网盟推广
                        6,//时段暂停推广
                        8,//否定关键词
                        10,//暂停/启用推广
                        12,//出价
                        13,//添加关键词
                        16,//展现方式
                        17,//激活关键词
                        18,//删除关键词
                        19,//删除推广单元
                        20,//删除推广计划
                        21,//推广单元名称
                        22,//新建计划
                        23,//新建单元
                        24,//新建创意
                        25,//关键词URL
                        26,//编辑创意
                        27,//关键词匹配方式
                        28,//激活时长设置
                        29,//删除创意
                        30,//网盟推广出价
                        32,//关键词转移
                        34,//精确否定关键词
                        41,//每日预算
                        120,//修改关键词出价
                        121,//修改推广单元出价
                        170,//激活创意
                    ],
        opttypeid = [
                        1,//设置
                        2,//增加
                        3,//删除
                        4,//修改
                        5,//暂停
                        6,//启用
                        7,//重命名
                        8,//激活
                        10,//系统激活
                        11,//转移
                    ],
        optlevel = [
            3,//useracct
            2,//planinfo
            1,//unitinfo
            4,//wordinfo
            5,//ideainfo
        ]
        */
        var data = [];
        var hc = {
            '3': {
                value: 3,
                text: "账户",
                levelClass: 'acct',
                children: {
                    '1,41,42,43,44': {
                        value : "1,41,42,43,44",
                        text : "预算"
                    }, // 账户有周、日预算
                    '2': {
                        value: "2",
                        text: "推广地域"
                    },
                    '28': {
                        value: "28",
                        text: "激活时长设置"
                    },
                    '3': {
                        value: "3",
                        text: "IP排除"
                    },
                    '45': {
                        value: '45',
                        text: '搜索意图定位'
                    },
                    '82': {
                        value: "82",
                        text: "动态创意"
                    }
                },
                key: 'useracct',
                level: 'account'
            },
            '2': {
                value: 2,
                text: "推广计划",
                levelClass: 'plan',
                children: {
                    '22': {
                        value: "22",
                        text: "新建计划"
                    },
                    '20': {
                        value: "20",
                        text: "删除推广计划"
                    },
                    '10': {
                        value: "10",
                        text: "暂停/启用推广"
                    },
                    '6': {
                        value: "6",
                        text: "推广时段管理"
                    },
                    '1': {
                        value: "1",
                        text: "每日预算"
                    }, // 计划只有日预算
                    '2': {
                        value: "2",
                        text: "推广地域"
                    },
                    '3': {
                        value: "3",
                        text: "IP排除"
                    },
                    '16': {
                        value: "16",
                        text: "展现方式"
                    },
                    '8': {
                        value: "8",
                        text: "否定关键词"
                    },
                    '34': {
                        value: "34",
                        text: "精确否定关键词"
                    },
                    '5': {
                        value: "5",
                        text: "参加网盟推广"
                    },
                    '30': {
                        value: "30",
                        text: "网盟推广出价"
                    },
                    '48': {
                        value: '48',
                        text: '勾选投放设备'
                    },
                    '46': {
                        value: '46',
                        text: '切换投放设备'
                    },
                    '47': {
                        value: '47',
                        text: '推广电话'
                    },
                    '49': {
                        value: '49',
                        text: '商桥移动咨询'
                    },
                    '50': {
                        value: '50',
                        text: '修改移动出价'
                    },
                    '45': {
                        value: '45',
                        text: '搜索意图定位'
                    },
                    '82': {
                        value: "82",
                        text: "动态创意"
                    }
                },
                key: 'planinfo',
                level: 'plan'
            },
            '1': {
                value: 1,
                text: "推广单元",
                levelClass: 'unit',
                children: {
                    '90': { // 流量探测
                        value: '90',
                        text: '流量探测'
                    },
                    '91': {
                        value: '91',
                        text: '分匹配模式出价'
                    },
                    '92': {
                        value: '92',
                        text: '修改分匹配模式出价'
                    }
                },
                key: 'unitinfo',
                level: 'unit'
            },
            '5': {
                value: 5,
                text: "关键词",
                levelClass: 'keyword',
                children: {
                    '93': {
                        value: '93',
                        text: '接受/不接受分匹配模式出价'
                    }
                },
                key: 'wordinfo',
                level: 'keyword'
            }
        };
        var index = 0;

        for (var i in hc) {
            for (var j in hc[i].children) {
                if (j == 93) { // @author kuanghongrui 接受/不接受分匹配模式出价
                    data[index] = {
                        opttime : "2014-03-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : 6,
                        optlevel : i,
                        newvalue : index + 1 + ' fortest ',
                        oldvalue : '',
                        levelkey : 'test acception ',
                        optname : "Cory",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2014-03-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : 5,
                        optlevel : i,
                        newvalue : index + 1 + ' fortest ',
                        oldvalue : '',
                        levelkey : 'test rejection ',
                        optname : "Cory",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                } else if (j == 92) { // @author kuanghongrui 修改分匹配模式出价
                    data[index] = {
                        opttime : "2014-03-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : 6,
                        optlevel : i,
                        newvalue : '1.00:0.80:0.60',
                        oldvalue : '1.00:0.80:0.00',
                        levelkey : 'match price factor modification',
                        optname : "Cory",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                } else if (j == 91) { // @author kuanghongrui 分匹配模式出价
                    data[index] = {
                        opttime : "2014-03-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : 6,
                        optlevel : i,
                        newvalue : index + 1 + ' fortest ',
                        oldvalue : '',
                        levelkey : 'test enable ',
                        optname : "Cory",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2014-03-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : 5,
                        optlevel : i,
                        newvalue : index + 1 + ' fortest ',
                        oldvalue : '',
                        levelkey : 'test disable ',
                        optname : "Cory",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                } else if (j == 90) { // @author kuanghongrui 流量探测
                    data[index] = {
                            opttime : "2014-03-" + index + " 00:00:00",
                            optname : "user" + index,
                            optcontentid : j,
                            opttypeid : 6,
                            optlevel : i,
                            newvalue : index + 1 + ' fortest ',
                            oldvalue : '',
                            levelkey : 'test enable ',
                            optname : "Cory",
                            planname : "某个计划",
                            unitname : "某个单元"
                        };
                        index++;
                        data[index] = {
                            opttime : "2014-03-" + index + " 00:00:00",
                            optname : "user" + index,
                            optcontentid : j,
                            opttypeid : 5,
                            optlevel : i,
                            newvalue : index + 1 + ' fortest ',
                            oldvalue : '',
                            levelkey : 'test disable ',
                            optname : "Cory",
                            planname : "某个计划",
                            unitname : "某个单元"
                        };
                        index++;
                } else if (j == 82) { // @author dengyijun 动态创意 
                    data[index] = {
                        opttime : "2014-03-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : 6,
                        optlevel : i,
                        newvalue : index + 1 + ' fortest ',
                        oldvalue : '',
                        levelkey : 'test open ',
                        optname : "Jefferson",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2014-03-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : 5,
                        optlevel : i,
                        newvalue : index + 1 + ' fortest ',
                        oldvalue : '',
                        levelkey : 'test close ',
                        optname : "Jefferson",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                } else if (j != '1,41,42,43,44') {
                    data[index] = {
                        opttime : "2011-01-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : j,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index + 1 + '乐萨德飞',
                        oldvalue : '',
                        levelkey : '"不知"阿是是否<a href="#">啊不</a>斯&lt;知&gt;，快'
                            + '<button>圣诞</button>节<a>发撒</a>旦法，阿萨德飞了卡斯蒂'
                            + '芬，阿萨德飞拉撒旦法撒的发道"' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                } else {
                    // 周预算
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 41,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : '',
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 41,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : '',
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 41,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 42,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : '',
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 42,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : '',
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 42,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 43,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : '',
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 43,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : '',
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 43,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 44,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : '',
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 44,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : '',
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                    data[index] = {
                        opttime : "2011-02-" + index + " 00:00:00",
                        optname : "user" + index,
                        optcontentid : 44,
                        opttypeid : index % 6,
                        optlevel : i,
                        newvalue : index,
                        oldvalue : index,
                        levelkey : 'sdf' + index % 5,
                        optname : "kener",
                        planname : "某个计划",
                        unitname : "某个单元"
                    };
                    index++;
                }
            }
        }
        rel.data.listData = data;
        return rel;
    };
});