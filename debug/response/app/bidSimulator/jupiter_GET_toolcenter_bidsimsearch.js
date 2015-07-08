/**
 * @file 出价模拟器-搜索关键词
 * @author Guangyao Tang(tangguangyao@baidu.com)
 */

define(function (require, exports, module) {
    var tpl = require('lib/tpl');

    /**
     * 列表数据
     * @type {BizList}
     */
    var infoBizList = require('./list');
    module.exports = function (path, params) {
        var ret = tpl.success();

        infoBizList.setPageSize(params.pageSize);
        var info = infoBizList.getPage(params.pageNo);
        // 返回接口需要的数据
        ret.data = {
            pageNo: info.pageNo,
            pageSize: info.pageSize,
            totalCount: info.totalCount,
            listData: info.listData
        };
        return ret;
    };
});