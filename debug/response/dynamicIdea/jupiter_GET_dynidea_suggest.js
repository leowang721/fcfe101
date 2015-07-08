/**
 * @file 获取动态创意优化建议
 * @author Feixiang Yuan(yuanfeixiang@baidu.com)
 * @date 2014-10-09
 */
define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');

    var suggestData = [
        {
            optType: 1, 
            optValue: 1, 
            itemList: null
        }, 
        {
            optType: 2, 
            optValue: 1,
            itemList: null
        }, 
        {
            optType: 2, 
            optValue: 2,
            itemList: null
        }, 
        {
            optType: 2, 
            optValue: 3,
            itemList: null
        }, 
        {
            optType: 3, 
            optValue: 1,
            itemList: [
                {
                    tagCategory: null, 
                    name: '我是测试关注点', 
                    example: null
                }, 
                {
                    tagCategory: null, 
                    name: '我是测试关注点', 
                    example: null
                }, 
                {
                    tagCategory: null, 
                    name: '我是测试关注点我是测试关注点我是测试关注点', 
                    example: null
                }
            ]
        }
    ];

    module.exports = function (path, params) {
        var rel = tpl.success();
        var data = [].concat(suggestData);
        if (random.int(0, 1) === 0) {
            data.splice(random.int(1, 3), 1);
        }
        rel.data = data;
        return rel;
    };
});