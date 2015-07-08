/**
 * 新增实验
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    //    var rel = tpl.success()
        var rel = {
            "data": null, //（返回值看前端需要什么data?)
            "status": 400, //200 ok  ,400 fail
            "errorCode": {
                "code": 180029
            },//,//存放跟实验有关参数错误
            "wordErrorDetail": //存放给加入实验词有关错误，前面是winfoid,新建实验时不用读取该值
            {
                12345: {
                    "code": 180013,
                    "message": null,
                    "detail": null,
                    "idx": 0
                },
                16345: {
                    "code": 180011,
                    "message": null,
                    "detail": null,
                    "idx": 0
                }
    
            }
        }
        return rel;
    };
});