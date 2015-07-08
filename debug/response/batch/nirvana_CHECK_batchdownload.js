define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var num = Math.floor(Math.random() * 10);
    
        var arr = [
            {
                "data" : {
                    "path" : "ftp://fengchao.baidu.com/batch/xx.csv",
                    "stat" : "SUCCESS",
                    "finish" : '2011-08-01'
                },
                "status" : 200,
                "errorCode" : null
            },
            {
                "data" : {
                    "path" : null,
                    "stat" : "NOT_STARTED",
                    "finish" : null
                },
                "status" : 200,
                "errorCode" : null
            },
            {
                "data" : {
                    "path" : null,
                    "stat" : "PROCESSING",
                    "finish" : null
                },
                "status" : 200,
                "errorCode" : null
            },
            {
                "data" : {
                    "path" : null,
                    "stat" : "PROCESS_FAILED",
                    "finish" : null
                },
                "status" : 400,
                "errorCode" : null
            },
            {
                "data" : {
                    "path" : null,
                    "stat" : "SYSTEM_FAILED",
                    "finish" : null
                },
                "status" : 400,
                "errorCode" : null
            }
        ];
        if (num > 4) {
            num = 2;
        }
        return arr[0];
    };
});