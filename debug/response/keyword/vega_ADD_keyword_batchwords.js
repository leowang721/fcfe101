define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        /*
         * rel.status = 400; rel.error = [{ message : '1234', code : 636, idx : 0,
         * detail: null }];
         */
        // return {"error":[{"message":"电话客服管理软件", "code":636, "idx":0,
        // "detail":null}], "data":[],"status":400}
        // rel.error = [{code: 633, message: '关键词abc'}];
        // rel.data = [
        //    {index: 0},
        //    {index: 2}
        // ];
        // rel.status = 300;
        // rel.timeout = 1500;
        return rel;
    };
});