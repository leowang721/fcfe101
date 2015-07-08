define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        // var rel = tpl.success();
        var rel = {
            status : 200,
            data : {},
            error : {}
        };
        var relList = [];
        for (var i = 0; i < 0; i++) {
            relList.push({
                        createtime : "2010-10-10 10:10",
                        content : i + "\"658\"账户 到达预算下线账户 到达预算下线账户 到达预算下线"
                    });
        }
        rel.data.listData = relList;
        return rel;
    };
});