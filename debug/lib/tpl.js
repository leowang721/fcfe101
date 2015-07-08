/**
 * mock中可以用到的公用模板级函数在这里实现
 * 比如获得随机物料信息(计划、单元、关键词...);
 */
define(function(require, exports) {

    // 返回成功时的模板
    exports.success = function() {
        return {
            status: 200,
            data: {},
            errorCode: null
        };
    };

    // 返回失败时的模板
    exports.fail = function(status) {
        return {
            status: status || 400,
            data: {},
            errorCode: {}
        };
    };

    /**
     * getMaterial 获得物料信息
     * @param  {Object} param 请求参数
     * @return {Array}       物料列表
     * 
     * @todo 根据业务需求增强 @liandong
     *
     * 建议引入mockjson节省大量重复mock工作
     */
    exports.getMaterial = function(param, num) {
        var fields = param.fields || FIELD_SET;
        var result = [];
        num || (num = 1);
        for (var i = 0; i < num; i++) {
            result.push({
                wordid: 11,
                planid: 11,
                planname: 'planname'
            })
        }
        return result;
    };
});