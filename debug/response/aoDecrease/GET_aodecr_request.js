
/**
 * 获取效果突降建议的摘要
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            signature : 'IU！%RUHA', // 签名，用于记录一组condition状态
            aostatus : 0
            // 请求状态，0-处理正常，1-请求格式错误，2-系统内部错误，3-任务队列已满，请重试，4-需要更详细的请求数据，不只是签名，100-无可分析的物料
        }, aoabsdata = [], opttype = param.opttype, // param.opttype
        status = 3, // (command == 'start') ? 0 : 2
                    // 标示任务状态，可能取0、1、2、3、4，0表示启动任务成功，1表示计算中，2表示计算完成，3表示计算超时，4表示内部错误
        // hasproblem = +prompt('是否有问题?1是有问题，0是没问题', 1), // +prompt('是否有问题?', 1);
        // //标示任务是否有问题，可能取0、1，分别表示无问题和有问题
        hasproblem = 1, getRandomScore = function() { // 动态优先级用的随机数
            return Math.random() * 10;
        }, getRandomRank = function() {
            return [1, 2, 3][Math.round(Math.random() * 100) % 3];
        }, priority = 0, // 子项的显示优先级，显示大项的叹号，0、1、2分别表示低、中、高，目前涅槃里暂时无此逻辑
        tmpItem = {
            status : status,
            hasproblem : hasproblem,
            timestamp : 1312862498, // 时间戳，只有当任务完成且有问题(status=2 and
                                    // hasproblem=1)，任务超时且有问题(status=3 and
                                    // hasproblem=1)时才有值
            priority : priority
        };
    
        // opttype = [30, 48, 39, 41, 38, 43, 42, 35, 36, 40, 37, 44, 33, 34, 45,
        // 46, 47];
        // opttype = [42,46];
        for (var i in opttype) {
            var tmp = baidu.object.clone(tmpItem);
    
            tmp.opttype = opttype[i]; // 标识子项id，与请求中的opttype不一样，仅取一个值
            tmp.rank = getRandomRank(); // 动态优先级等级
            tmp.score = getRandomScore(); // 动态优先级分数
            tmp.result = [];
    
            switch (opttype[i]) {
                // 余额不足
                case 30 :
                    tmp.result.push({
                                value : []
                            });
                    break;
                // 账户预算不足
                case 31 :
                    tmp.result.push({
                        bgtstatus : 5, // 提示类型，0:不提示 1：预算合理 2：预算风险 3：需提供预算建议 4:
                                        // 需提供周预算建议 5:突降建议
                        suggest : 0,
                        lostclick : 109,
                        maxbgt : 1000.00,
                        show_encourage : 1, // 是否提示同行激励
                        model_num : 100, // 同行标杆数
                        value : [23, 0]
                            // 预算不足建议时，有两个值，分别是时和分，时取值0-23，分取值0-59
                        });
                    break;
                // 计划预算不足
                case 32 :
                    tmp.result.push({
                                planid : 243,
                                planname : '<button>a<button>',
                                bgtstatus : 5,
                                suggest : 0,
                                lostclick : 109,
                                maxbgt : 1000.00,
                                show_encourage : 1,
                                model_num : 99,
                                value : [23, 9]
                            });
                    tmp.result.push({
                                planid : 244,
                                planname : '这是个很长很长很长很长很长很长很长很长很长很长的计划名称',
                                bgtstatus : 5,
                                suggest : 300,
                                lostclick : 109,
                                maxbgt : 1000.00,
                                show_encourage : 1,
                                model_num : 99,
                                value : [23, 0]
                            });
                    tmp.result.push({
                                planid : 245,
                                planname : '这是个很长很长很长很长很长很长很长很长很长很长的计划名称',
                                bgtstatus : 3,
                                suggest : 300,
                                lostclick : 109,
                                maxbgt : 1000.00,
                                value : [23, 33]
                            });
                    tmp.result.push({
                                planid : 245,
                                planname : '这是个很长很长很长很长很长很长很长很长很长很长的计划名称',
                                bgtstatus : 2,
                                suggest : 300,
                                lostclick : 109,
                                maxbgt : 1000.00,
                                value : [23, 33]
                            });
                    break;
                // 匹配模式减小
                case 33 :
                    tmp.result.push({
                                value : [10]
                            });
                    // tmp.hasproblem = 0;
                    break;
                // 自然检索量降低
                case 34 :
                    tmp.result.push({
                                value : [88]
                            });
                    break;
                // 关键词搜索无效
                case 35 :
                    tmp.result.push({
                                value : [23]
                            });
                    break;
                // 关键词不宜推广
                case 36 :
                    tmp.result.push({
                                value : [23]
                            });
                    break;
                // 关键词暂停推广
                case 37 :
                    tmp.result.push({
                                value : [11]
                            });
                    break;
                // 单元暂停推广
                case 38 :
                    tmp.result.push({
                                value : [12]
                            });
                    break;
                // 计划暂停推广
                case 39 :
                    tmp.result.push({
                                value : [14]
                            });
                    break;
                // 关键词检索量过低
                case 40 :
                    tmp.result.push({
                                value : [16]
                            });
                    break;
                // 计划被删除
                case 41 :
                    tmp.result.push({
                                value : [19]
                            });
                    break;
                // 单元无生效创意
                case 42 :
                    tmp.result.push({
                                value : [100]
                            });
                    break;
                // 单元被删除
                case 43 :
                    tmp.result.push({
                                value : [170]
                            });
                    break;
                // 关键词被删除
                case 44 :
                    tmp.result.push({
                                value : [105]
                            });
                    break;
                // 排名下降
                case 45 :
                    tmp.result.push({
                                value : [125]
                            });
                    break;
                // 质量度过低
                case 46 :
                    tmp.result.push({
                                value : [33]
                            });
                    // tmp.hasproblem = +prompt('是否有问题?1是有问题，0是没问题', 1)
                    break;
                // 质量度下降
                case 47 :
                    tmp.result.push({
                                value : [18]
                            });
                    break;
                // 推广时段
                case 48 :
                    tmp.result.push({
                                planid : 321,
                                planname : '计划XXX',
                                lostclick : 12,
                                value : [18]
                            });
                    tmp.result.push({
                                planid : 1,
                                planname : '<button>计划22XXX',
                                lostclick : 88,
                                value : [18]
                            });
                    break;
                // 页面不连通
                case 49 :
                    tmp.result.push({
                                value : [20202020]
                            });
                    break;
                // 连通速度较慢
                case 50 :
                    tmp.result.push({
                                value : [21212121]
                            });
                    break;
                default :
                    break;
            }
    
            aoabsdata.push(tmp);
        }
    
        data.aoabsdata = aoabsdata;
        rel.data = data;
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});