
// 移动包 图表数据
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        return {"status":200,"data":{"aostatus":0,"totalPaysum":335.6,"totalShows":400,"totalClks":33,"listData":[{"paysum":"319.7","clks":"32","reporttime":"2014-07-31","shows":"366"},{"paysum":"15.9","clks":"1","reporttime":"2014-08-01","shows":"34"},{"paysum":"0","clks":"0","reporttime":"2014-08-02","shows":"0"},{"paysum":"0","clks":"0","reporttime":"2014-08-03","shows":"0"},{"paysum":"0","clks":"0","reporttime":"2014-08-04","shows":"0"},{"paysum":"0","clks":"0","reporttime":"2014-08-05","shows":"0"},{"paysum":"0","clks":"0","reporttime":"2014-08-06","shows":"0"}]},"errorCode":null}

        var rel = tpl.success();
        rel.data = {
            totalPaysum:  '0',
            totalShows: '0',
            totalClks: '0',
            listData:[
                {
                    reporttime: '2013-11-23', //日期
                    paysum: '111', //消费
                    shows: '222',  //展现
                    clks: '896'   //点击
                },
                {
                    reporttime: '2013-11-24', //日期
                    paysum: '567583', //消费
                    shows: '92123',  //展现
                    clks: '9908'   //点击
                },
                {
                    reporttime: '2013-11-25', //日期
                    paysum: '896', //消费
                    shows: '1254',  //展现
                    clks: '23555'   //点击
                },
                {
                    reporttime: '2013-11-26', //日期
                    paysum: '6789', //消费
                    shows: '378',  //展现
                    clks: '98'   //点击
                },
                {
                    reporttime: '2013-11-27', //日期
                    paysum: '1648', //消费
                    shows: '45678',  //展现
                    clks: '12'   //点击
                },
                {
                    reporttime: '2013-11-28', //日期
                    paysum: '567567', //消费
                    shows: '44',  //展现
                    clks: '99789'   //点击
                },
                {
                    reporttime: '2013-11-29', //日期
                    paysum: '1234', //消费
                    shows: '980',  //展现
                    clks: '5732'   //点击
                }
            ]
        };
        return rel;
    };
});