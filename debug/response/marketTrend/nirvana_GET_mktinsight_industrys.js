
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var now = new Date();
        rel.data = [
            {
                id: 25,
                name: '教育与培训>教育>教学设备',
                percent: 0.0911,
                isDefault: false,
                show: 121210,
                showRate: -4.2221,
                click: 10240,
                clickRate: -0.2222,
                //hotBegin: now.getTime() - 51*24*3600*1000,
                //hotEnd: now.getTime() - 35*24*3600*1000,
                hotIncrease: 0.0121//旺季检索量提升百分比
            },
            {
                id: 23,
                name: '旅游及票务>旅游>云南西双版纳旅游',
                percent: 0.1700,//占比
                show: 3343340,
                showRate: 0.0121,//百分比的整数部分
                click: 33440,
                clickRate: -1.2,//百分比的整数部分，负数表示下降
                hotBegin: now.getTime() + 5*24*3600*1000,
                hotEnd: now.getTime() + 11*24*3600*1000,
                hotIncrease: 0.0121//旺季检索量提升百分比
            },
            {
                id: 21,
                name: '旅游及票务>旅游>自由行',
                percent: 0.2601,
                show: 210,
                showRate: 0.02001,
                click: 4090000000,
                //clickRate: -0.2000,
                hotBegin: now.getTime() + 8*24*3600*1000,
                hotEnd: now.getTime() + 19*24*3600*1000,
                hotIncrease: 0.0121//旺季检索量提升百分比
            },
            {
                id: 20,
                name: '互联网与软件>互联网>域名空间',
                percent: 0.3100,
                isDefault: false,
                show: 0,
                showRate: null,
                //click: 11240,
                clickRate: -0.2322,
                hotBegin: now.getTime() + 22*24*3600*1000,
                hotEnd: now.getTime() + 34*24*3600*1000,
                hotIncrease: 0.0121//旺季检索量提升百分比
            },
            {
                id: 29,
                name: '服务>办公服务>办证刻章',
                percent: 0.0511,
                isDefault: false,
                show: 227210,
                showRate: 0.0000,
                click: 7240,
                clickRate: 0.0000,
                hotBegin: now.getTime() - 2*24*3600*1000,
                hotEnd: now.getTime() + 71*24*3600*1000,
                hotIncrease: 0.0121//旺季检索量提升百分比
            }
        ];
        
        return rel;
    };
});