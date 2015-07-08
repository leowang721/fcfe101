
/**
 * 获取预算建议详情
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), data = {
            aostatus : 0, // 详情页不用关注，直接根据外层的status判断（200,500,600）
            commData : {
                begindate : (new Date()).getTime() // 期初日期
            },
            listData : []
        }, bgtData, opttypeid = param.opttypeid;
    
        var tip;
        switch (+opttypeid) {
            case 702:
            case 706:
                tip = 5;
                break;
    //        case 901: // 账户预算在没有建议预算值是，不需要显示任何提示信息
    //            tip = 0;
    //            break;
            default:
                tip = 3;
        }
    
        bgtData = {
            bgttype : 1, // 预算类型。0：未设置预算。1：设置日预算。2：设置周预算。
            daybgtdata : { // 存储日预算数据
                daybgtvalue : 200.0,// 当前日预算
                dayanalyze : {
                    tip : tip,
                    suggestbudget : 500.0, // 建议日预算
                    lostclicks : null, // 损失点击数
                    show_encourage : 1, // 是否显示同行激励
                    model_num : 2, // 同行标杆数
                    words : '你好/你坏', // 核心关键词字面串。以“/”作为间隔
                    wordids : '1' // 核心关键词id值
                }
            },
            weekbgtdata : { // 存储周预算基础数据与分析数据,此处结构和原涅槃周预算对应部分一致，未修改
                weekbgtvalue : 2000.0, // 周预算值
                weekanalyze : {
                    tip: tip,
                    suggestbudget : 5000.0,// 建议周预算
                    lostclicks : 20
                    // 损失点击数
                },
                istargetuser : 0
                // 是否为目标用户，0不是目标用户，1是目标用户
            }
        };
    
        if (opttypeid == 1001) {
            baidu.extend(bgtData.daybgtdata.dayanalyze, {
                // 转化提升包新增字段：损失的转化数
                losttrans: parseInt(Math.random() * 100),
                show_encourage: 0
            });
        }
    
        data.listData.push(bgtData);
    
        rel.data = data;
    
        return rel;
    };
});