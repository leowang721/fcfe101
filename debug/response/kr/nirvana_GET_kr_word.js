// 按关键词
// test:1,
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // console.log('GET_kr_word' + param);
        // var max = Math.ceil(Requester.debug.test/3)*10;
        // Requester.debug.test++;
    
        var rel = tpl.success();
        // 模拟数据请求延迟
        rel.timeout = 1000;
    
        // 400 //1301\1302\1304\1305\1306\1307
        if (param.query.slice(0, 3) == "400" || param.query.slice(0, 3) == "200"
            || param.query === '鲜花啊鲜花' || param.query === '啊啊啊') {
            rel = {
                "data" : {
                    group : []
                },
                "status" : param.query.slice(0, 3),
                "errorCode" : {
                    "data" : {
                        group : []
                    },
                    "message" : "",
                    "code" : param.query.slice(3, param.query.length),
                    "idx" : 0,
                    "detail" : null
                }
            };
            return rel;
        }
        /*
         * if(param.querytype == 4 ||param.querytype == 3){ rel = { "data":
         * {group:[]}, "status": 200, "errorCode": { "data": {group:[]}, "message":
         * "", "code": param.query.slice(3,param.query.length), "idx": 0, "detail":
         * null } }; return rel; }
         */
        rel.data = {
            logid : 623217000,
    
            // 打折词新增，标识该用户是否是打折词用户
            isDiscountUser: '' + parseInt(Math.random() * 100) % 2,
    
            attr : [
                    {field:'展现理由',text:'高APP下载',desc:'高APP下载11',icon:''},
                    {field:'展现理由',text:'高电话拨打',desc:'高电话拨打11',icon:''},
                    {field:'展现理由',text:'黑马',desc:'二级理由1:最新出现的网民搜索词',icon:'new'},
                    {field:'展现理由',text:'百度相关搜索',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                    {field:'展现理由',text:'潜在客户',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                    {field:'展现理由',text:'同行动态',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                    {field:'展现理由',text:'我的选择',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                    {field:'展现理由',text:'搜索建议词',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                    {field:'展现理由',text:'网页相关词',desc:'二级理由2:助您快人一步，抢占商机',icon:''},
                    {field:'展现理由',text:'最近关注',desc:'二级理由1:最近关注',icon:'new'},
                    {field:'业务点',text:'哇哇哇aa啊啊啊啊啊啊啊',desc:'',icon:'',wordCount: 10, firstWordIndex: 2},
                    {field:'业务点',text:'哈哈哈',desc:'',icon:'',wordCount: 10, firstWordIndex: 1},
                    {field:'业务点',text:'啊啊啊',desc:'',icon:'',wordCount: 2, firstWordIndex: 3},
                    {
                        field : '包含',
                        text : '分组1'
                    }, {
                        field : '包含',
                        text : '分组2'
                    }, {
                        field : '包含',
                        text : '分组3'
                    }, {
                        field : '包含',
                        text : '其他'
                    }, {
                        field : '包含',
                        text : '分组5'
                    }, {
                        field : '包含',
                        text : '分组4'
                    }, {
                        field : '属性',
                        text : '费用词'
                    },// 11
                    {
                        field : '属性',
                        text : '地域词'
                    },// 12
                    {
                        field : '属性',
                        text : '咨询词'
                    },// 13
                    {
                        field : '属性',
                        text : '周边词'
                    },// 14
                    {
                        field : '属性',
                        text : '其他'
                    },// 15
                    {
                        field : '属性',
                        text : '通用词'
                    },// 16
                    {
                        field : '属性',
                        text : '傻瓜词'
                    }// 17
            ],
            // rsn2text : ["二级理由1:最新出现的网民搜索词","二级理由2:助您快人一步，抢占商机"],
            group : [],
            // wtag : ["分组1","分组2","分组3","分组4","其他"],
            actualquerytype : param.querytype == 0 ? 2 : 1,
            recquerytype : param.querytype == 0 ? 1 : 1
        }
        var len1 = 3, // Math.round(Math.random()*100) % 5, //多少分组
        // len2, //每分组多少个
        headTitle = ["黑马(%d)",
                "<span class='help_needed' title='同行关注'>同行关注(%d)</span>",
                "百度相关搜索(%d)", "相关词(%d)", "(%d)"];
        // if(Math.round(Math.random()*2) % 2)
        for (var j = 0; j < len1; j++) {
            var result = []
            for (var i = 0, len2 = Math.round(Math.random() * 100) % 10 + 3; i < len2; i++) {
                result[i] = {
                    "wordid" : '110' + j + '' + i,
                    "word" : param.query + param.querytype + '_' + j + '_' + i,
                    "total_weight": Math.random() * 10,
                    "pv" : 99 * i % 1000, // 精确
                    "kwc" : 40 * i % 100,
                    "pv_trend_month" : i % 14,
                    "index" : j * len2 + i,
                    /*"attr_index":[9,i%9+2,i%7+11],*/
                    "attr_index":[0,1,2,3,4,5,6,7],
    
                    // 打折词新增
                    uuid: '' + parseInt(Math.random() * 100000),
                    wordRatio: '' + Number(Math.random() * 10).toFixed(1), // 打折的折扣
                    discountBeginDate: '2013-08-01',// 打折开始时间
                    discountEndDate: '2013-08-31' //打折结束时间
                }
            }
            rel.data.group[j] = {
                grouprsn : headTitle[j],
                resultitem : result
            };
        }
    
        rel.data.rsRes = ['1','111','下水道','111','下水道','111','下水道','111','下水道','111','下水道'];
        return rel;
    };
});