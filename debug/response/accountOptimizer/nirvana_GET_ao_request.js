
/**
 * 获取全部优化建议的摘要
 * 
 * @param {Object}
 *            level
 * @param {Object}
 *            param
 */
define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var rand = include('random');

    module.exports = function(path, param) {
        var rel = tpl.success();
        var data = {
            signature : 'IU！%RUHA', // 签名，用于记录一组condition状态
            aostatus : 0
            // 请求状态，0-处理正常，1-请求格式错误，2-系统内部错误，3-任务队列已满，请重试，4-需要更详细的请求数据，不只是签名
        };

        var aoabsdata = [];
        var opttype = param.opttype; // param.opttype

        var status = (param.command == 'start') ? 0 : 2;
        // 标示任务状态，可能取0、1、2、3、4，0表示启动任务成功，1表示计算中，2表示计算完成，3表示计算超时，4表示内部错误
        // 
        var hasproblem = 0;//标示任务是否有问题，可能取0、1，分别表示无问题和有问题

        var priority = 0; // 子项的显示优先级，显示大项的叹号，0、1、2分别表示低、中、高，目前涅槃里暂时无此逻辑

        // Added by Wu Huiyao
        var absorder = [];// 新增参数，用于返回排序相关数据
    
        for (var i in opttype) {
            var tmpItem = {
                //status: status,
                status: 2,
                opttype: opttype[i],
                hasproblem: 1,
                timestamp: (+new Date()),
                priority: rand.number(0, 2),
                score: rand.number(1, 5),
                record: rand.number(1, 10),
                rank: rand.number(0, 3)
            };
            absorder.push(tmpItem);
        }
    
        absorder.sort(function(o1, o2) {
            if (o1.record > o2.record) {
                return -1;
            } else if (o1.record < o2.record) {
                return 1;
            } else {
                return 0;
            }
        });
    
        for (var i in opttype) {
            var tmp = absorder[i];
            tmp.result = [];

            switch (opttype[i]) {

                // 账户预算不足
                case 1 :
                    tmp.result.push({
                        bgtstatus : 3, // 提示类型，0:不提示 1：预算合理 2：预算风险
                        // 3：需提供预算建议 4: 需提供周预算建议
                        suggest : 0,
                        lostclick : 109,
                        retripercent: 30, // 可挽回点击数,为0时候不展现额外的话术,升级预算话术新增 2013.3.20 by Huiyao
                        maxbgt : 1000.00,
                        show_encourage : 1, // 是否提示同行激励
                        model_num : 100, // 同行标杆数
                        value : [11, 11]
                    });
                    break;
                // 计划预算不足
                case 2 :
                    tmp.result.push({
                                planid : 243,
                                planname : '<button>a<button>',
                                bgtstatus : 3,
                                suggest : 0,
                                lostclick : 109,
                                retripercent: 23, // 可挽回点击数,为0时候不展现额外的话术,升级预算话术新增 2013.3.20 by Huiyao
                                maxbgt : 1000.00,
                                show_encourage : 1,
                                model_num : 99
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
                                value : [11, 11]
                            });
                    tmp.result.push({
                                planid : 245,
                                planname : '这是个很长很长很长很长很长很长很长很长很长很长的计划名称',
                                bgtstatus : 5,
                                suggest : 0,
                                lostclick : 109,
                                maxbgt : 1000.00,
                                value : [13, 12]
                            });
                    tmp.result.push({
                                planid : 245,
                                planname : '这是个很长很长很长很长很长很长很长很长很长很长的计划名称',
                                bgtstatus : 5,
                                suggest : 300,
                                lostclick : 109,
                                maxbgt : 1000.00,
                                value : [14, 14]
                            });
                    break;
                // 质量度过低
                case 3 :
                    tmp.result.push({
                                value : [10, 0, 5]
                            });
                    break;
                // 左侧首屏出价
                case 4 :
                    tmp.result.push({
                                value : [88]
                            });
                    break;
                // 添加更多关键词
                case 5 :
                    tmp.result.push({
                                value : []
                            });
                    break;
    //            // 搁置时段
    //            case 7 :
    //                tmp.result.push({
    //                            planid : 0,
    //                            planname : '计划XXX',
    //                            lostclick : 12
    //                        });
    //                tmp.result.push({
    //                            planid : 1,
    //                            planname : '<button>计划22XXX',
    //                            lostclick : 88
    //                        });
    //                // tmp.hasproblem = +prompt('是否有问题?1是有问题，0是没问题', 1);
    //                break;
                // 升级版搁置时段优化项，由于替换掉上面7
                case 52 :
                    var num = Math.ceil(Math.random() * 5);
                    for (var i = num; i --;) {
                        tmp.result.push({
                            planid : 3443 + i,
                            planname : i + '新的时段升级计划时段23sdfsf',
                            sgtcyccnt : Math.ceil(Math.random() * 50), // 建议增加的时段数
                            potentialclk: Math.ceil(Math.random() * 100) // 潜在客户数
                        });
                    }
                    break;
                // 关键词待激活
                case 8 :
                    tmp.result.push({
                                value : [11]
                            });
                    break;
                // 关键词搜索无效
                case 9 :
                    tmp.result.push({
                                value : [12, 8]
                            });
                    break;
                // 关键词检索量过低
                case 10 :
                    tmp.result.push({
                                value : [14, 18]
                            });
                    break;
                // 关键词不宜推广
                case 11 :
                    tmp.result.push({
                                value : [16, 10]
                            });
                    break;
                // 关键词暂停推广
                case 12 :
                    tmp.result.push({
                                value : [19, 2]
                            });
                    break;
                // 单元暂停推广
                case 13 :
                    tmp.result.push({
                                value : [100, 20]
                            });
                    break;
                // 计划暂停推广
                case 14 :
                    tmp.result.push({
                                value : [170, 30]
                            });
                    break;
                // 创意待激活
                case 15 :
                    tmp.result.push({
                                value : [105]
                            });
                    break;
                // 创意不宜推广
                case 16 :
                    tmp.result.push({
                                value : [125]
                            });
                    break;
                // 创意暂停推广
                case 17 :
                    tmp.result.push({
                                value : [3]
                            });
                    break;
                // 左侧首屏展现概率
                case 18 :
                    tmp.result.push({
                                value : [18]
                            });
                    break;
                // 左侧首位展现概率
                case 19 :
                    tmp.result.push({
                                value : [19]
                            });
                    break;
                // 不连通比例过高
                case 20 :
                    tmp.result.push({
                                value : [20202020]
                            });
                    break;
                // 连通速度较慢
                case 21 :
                    tmp.result.push({
                                value : [21212121]
                            });
                    break;
                // 跳出率较高
                case 22 :
                    tmp.result.push({
                                value : [1230, 230]
                            });
                    break;
                // 转化率
                case 24 :
                    tmp.result.push({
                                value : [242424]
                            });
                    break;
                // Holmes状态
                case 25 :
                    tmp.result.push({
                                value : []
                            });
                    break;
    
                // 效果突降新增建议
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
                        suggest : 14,
                        lostclick : 109,
                        maxbgt : 1000.00,
                        show_encourage : 1, // 是否提示同行激励
                        model_num : 100, // 同行标杆数
                        value : [23, 33]
                            // 预算不足建议时，有两个值，分别是时和分，时取值0-23，分取值0-59
                        });
                    break;
                // 计划预算不足
                case 32 :
                    tmp.result.push({
                                planid : 243,
                                planname : '<button>a<button>',
                                bgtstatus : 5,
                                suggest : 300,
                                lostclick : 109,
                                maxbgt : 1000.00,
                                show_encourage : 1,
                                model_num : 99,
                                value : [23, 33]
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
                                value : [23, 33]
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
    
        // 动态优先级三期：新增一个返回参数，Added by Wu Huiyao
        data.absorder = absorder;
    
        data.aoabsdata = aoabsdata;
        rel.data = data;
        return rel;
    };
});