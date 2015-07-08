define(function (require, exports, module) {
    var random = require('random');
    var validator = require('./ideaValidator');

    var STATUS = {
        SUCC: 200,
        PART: 300,
        FAIL: 400,
        SERR: 500,
        CERR: 600
    };

    function validateParams(params) {
        var items = params.items || [];
        var detail = {};
        var count = 0;
        var error = {
            message: '',
            code: null,
            detail: detail
        };
        
        // 如果出现多个错误时, 只提示第一个错误
        items.forEach(function (item) {
            var er = validator.validate(item);
            if (er && er.message) {
                detail[er.idx] = er.code;
                error.message += er.message + ',';
                count++;
            }
        });

        if (count > 0) {
            // 只有300和400时出现详情错误信息？
            if (count < items.length) {
                error._status = 300;
            } else {
                error._status = 400;
            }

            return error;
        } else {
            return null;
        }
    }


    /**
     * 
     * @param  {string} path 请求路径
     * @param  {Object} param 请求参数
     * {
     *     planid: {number},
     *     unitid: {number},
     *     dynamicIdeas: [
     *         {
     *             idx: {number}, // 序列号
     *             title: {string},
     *             url: {string}, 
     *             murl: {string}
     *         
     *         }
     *     ]
     * }
     * @return {Object}
     */
    module.exports = function (path, params) {
        var error = validateParams(params);
        var status = 200;
        
        if (error) {
            status = error._status;
            delete error._status;
        }
        
        // 正常请情况
        return {
            status: status,
            data: {
                summary: {
                    duplicateCount: random.int(1, 5),
                    successCount: random.int(1, 5),
                    failCount: random.int(1, 5)
                }
            },
            error: error
        };
    };
});