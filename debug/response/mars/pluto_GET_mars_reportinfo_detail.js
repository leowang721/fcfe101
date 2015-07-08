
/**
 * 获得定制报告参数
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
        var rel = tpl.success();
        rel.data = {};
        rel.data.reportinfo = {
            reportid : 0, // 报告id，在实时报告中都为0
            endtime : '', // 
            starttime : '', // yyyy-MM-dd 当有相对时间时也要填写（用于显示在结果部分的日历中）yyyy-MM-dd 当有相对时间时也要填写（用于显示在结果部分的日历中）
            isrelativetime : 1, // 是否相对时间，默认相对时间(最近七天)
            relativetime : 15, // 默认最近七天
    
            mtldim : 2,
    
            idset : [], // 选定层级对应物料的id集合
    
            mtllevel : 2,
    
            reporttype : 10, // 一般来说根据mtllevel而定，仅在用户勾选“地域指标”时切换为3-分地域报告
    
            platform : 0,
    
            dataitem : 'shows, clks, paysum',
    
            reporttag : 0,
    
            reportcycle : 2,
    
            timedim : 5, // 除非用户在已经生成的报告中切换，否则均默认分日
    
            ismail : 0, // 是否发送邮件
            mailaddr : '', // 邮箱地址
    
            sortlist : 'time', // 初始排序字段
    
            reportname : '后台返回的报告名称', // 报告名称
    
            userid : nirvana.env.USER_ID,
            moduid : nirvana.env.OPT_ID,
    
            /**
             * 报告层级
             * 
             * 用户级别 100 一线客服级别 200 客服管理员级别 300
             */
            reportlevel : 100
        };
    
        rel.data.mtlinfos = [{
                    id : 100,
                    name : '物料'
                }, {
                    id : 100,
                    name : '物料'
                }];
    
        // rel.errorCode = {
        //     code: 1900
        // };
    
        // rel.status = 300;
    
        return rel;
    };
});