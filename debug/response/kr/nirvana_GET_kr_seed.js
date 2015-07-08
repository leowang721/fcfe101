define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // console.log('GET_kr_seed' + param);
        var rel = tpl.success();
        rel.data = {
            word : {
                logid : 1234,
                values : // []
                ["鲜花方案", "玫瑰", "鲜花方案", "鲜花方", "鲜花方方案案", "鲜花方案", "鲜花方案", "鲜花方案鲜花",
                        "仙人掌", "防辐射", "Declan《Tell Me Why》", "Stupid",
                        "到底是红玫瑰还是白玫瑰", "strange"]
            },
            url : {
                logid : 623217000,
                values : [{
                            value : "www.baidu1.com",
                            desc : ["DF", "dsfsdf", "DF", "dsfsdf", "DF", "dsfsdf"]
                        }, {
                            value : "www.baidu2.com",
                            desc : ["DF", "dsfsdf"]
                        }, {
                            value : "www.baidu3longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong.com",
                            desc : ["DF", "dsfsdf"]
                        }, {
                            value : "www.baidu4.com",
                            desc : ["DF", "dsfsdf"]
                        }, {
                            value : "www.baidu5longlonglonglong.com",
                            desc : ["DF", "dsfsdf"]
                        }, {
                            value : "www.baidu6.com",
                            desc : ["DF", "dsfsdf"]
                        }, {
                            value : "www.baidu7.com",
                            desc : ["DF", "dsfsdf"]
                        }, {
                            value : "www.baidu8longlonglonglong.com",
                            desc : ["DF", "dsfsdf"]
                        }]
            }
        }
        return rel;
    };
});