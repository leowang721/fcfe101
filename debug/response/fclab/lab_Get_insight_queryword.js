
/**
 * 竞价洞察，获取模糊查询的关键词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    
        var rel = {
            'status': '200',
            'data': [{
                'planid': '1',
                'unitid': '11',
                'winfoid': '1123',
                'planname': '鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花计划1',
                'unitname': '鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花单元1',
                'showword': '鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花'
            },
                {
                    'planid': '1',
                    'unitid': '11',
                    'winfoid': '1123',
                    'planname': '计划1',
                    'unitname': '单元1',
                    'showword': '鲜花'
                },
                {
                    'planid': '2',
                    'unitid': '21',
                    'winfoid': '212312',
                    'planname': '计划1',
                    'unitname': '单元1',
                    'showword': '鲜花速递'
                }
            ],
            'errorCode': null
        };
        return rel;
    };
});