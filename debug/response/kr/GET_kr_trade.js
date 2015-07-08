
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // console.log('GET_kr_trade' + param);
        var rel = tpl.success();
        rel.data = {
            logid : 1445237020,
            cate : {
                text : 32412341324,
                child :
                // [{"child":[{"text":"窗帘加盟"}],"text":"家居用品加盟"}]
                [{
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝1',
                                        child : [{
                                                    text : '疯狂的螺丝刀11'
                                                }]
                                    },
                                    // {text:'电话本阿螺丝2',child:[{text:'疯狂的螺丝刀21'}]},
                                    {
                                        text : '电话本阿螺丝3',
                                        child : [{
                                                    text : '疯狂的螺丝刀31',
                                                    child : [{
                                                                text : '疯狂的螺丝刀311'
                                                            }]
                                                }, {
                                                    text : '疯狂的螺丝刀32'
                                                }]
                                    }
                            // {text:'电话本阿螺丝4',child:[{text:'疯狂的螺丝刀41'}]}
                            ]
                        },
    
                        {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : '电话',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }, {
                            text : 'lastlastlast',
                            child : [{
                                        text : '电话本阿螺丝刀房间拉萨的疯狂的了开发将阿里斯蒂芬'
                                    }]
                        }]
            }
        };
        if (prompt("行业树 y on n", 'y') == 'n') {
            rel.data.cate.child = [];
        }
        // 模拟数据请求延迟
        rel.timeout = 1000;
        // console.log(baidu.json.stringify(rel));
        return rel;
    };
});