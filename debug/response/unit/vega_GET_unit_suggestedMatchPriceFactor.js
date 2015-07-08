define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return {"status": 200, data: {
            suggestedMatchPriceFactor: {widespread: null, phrase: null, accurate: null}
        }, "errorCode": {code:12,message:'eee'}};
    };
});