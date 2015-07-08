
///**
// * 推广时段详情
// */
//Requester.debug.GET_aodecr_plancycdetail = function() {
//    return {
//        status : 200,
//        data : {
//            signature : 'a',
//            aostatus : 0, // 请求状态，0-处理正常，1-请求格式错误，2-系统内部错误，3-任务队列已满，请重试，4-需要更详细的请求数据，不只是签名，100-无可分析的物料
//            totalnum : 100, // 结果的总条数
//            returnnum : 100, // 本次返回的条数
//            timestamp : 'b', // 任务完成的时间戳
//            listData : [{
//                plancyc : [['101', '124'], ['206', '209'], ['306', '309'],
//                        ['315', '319']],
//                suggestcyc : [['211', '219'], ['510', '520'], ['620', '624']]
//            }]
//        },
//        errorCode : {}
//
//    }
//};
/**
 * 获取top100的关键词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return {
            status : 200,
            data : {
                listData : ['一', '二', 'sdfdsf', '<a>sdfsdfsdf</a>']
            },
            errorCode : {}
    
        }
    };
});