/**
 * 字段
 */
define(function (require, exports, module) {
    module.exports = {
        3 : {//计划
            colstype : 1, // 0：默认，1：全部，2：自定义
            customcols : ["planname", "clks", "paysum", "shows", "trans",
                "avgprice", 'showq']
        },
        5 : {//单元
            colstype : 0, // 0：默认，1：全部，2：自定义
            customcols : ["unitname", "planname", "unitbid", "clks", "paysum",
                "shows", "trans", "avgprice"]
        },
        11 : {//关键词
            colstype :1, // 0：默认，1：全部，2：自定义
            customcols : ["showword", "unitname", "planname", "bid", "wmatch",
                "showq", "clks", "paysum", "shows", "trans", "avgprice"]
            // customcols: ["showword","bid", "wmatch", "wurl"]
        },
        7 : {//创意
            colstype : 0, // 0：默认，1：全部，2：自定义
            customcols : ["ideaid", "unitname", "planname", "clks", "paysum",
                "shows", "trans", "avgprice"]
        },
        15 : {
            colstype : 0, // 0：默认，1：全部，2：自定义
            customcols : ["showword", "unitname", "planname", "bid", "wmatch",
                "showq", "clks", "paysum", "shows", "trans", "avgprice"]
            // customcols: ["showword","bid", "wmatch", "wurl"]
        },
        19 : {// KR
            colstype : 0, // 0：默认，1：全部，2：自定义
            customcols : ["showword", "pv_prospect", "pv", "kwc"]
        },
        21 : {
            colstype : 0, // 0：默认，1：全部，2：自定义
            customcols : ["showword", "unitname", "planname", "bid", "wmatch",
                "showq", "clks", "paysum", "shows", "trans", "avgprice"]
            // customcols: ["showword","bid", "wmatch", "wurl"]
        },
        8: {//蹊径
            colstype: 0,        //0：默认，1：全部，2：自定义
            customcols: ["content","creativetype","unitname", "planname", "stat", "clks"]
        },
        10: {//蹊径
            colstype: 0,        //0：默认，1：全部，2：自定义
            customcols: ["content","creativetype","unitname", "planname", "stat", "clks"]
        },
        13: {//蹊径
            colstype: 0,        //0：默认，1：全部，2：自定义
            customcols: ["content","creativetype","unitname", "planname", "stat", "clks"]
        },
        9:{ //app
            colstype: 0,
            customcols:['appname','appdevicetype','version','apimodtime',"unitname","planname","stat","clks","paysum","shows","avgprice"]
        }
    };
});