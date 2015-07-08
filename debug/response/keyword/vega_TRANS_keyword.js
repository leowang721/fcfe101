
/**
 * 转移关键词
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel = {
            "data" : {
                'total' : 100,
                'failcount' : 0,
                unitid : 10101
            },
    
            "status" : 200,
    
            "errorCode" : {
                "message" : " ",
                "code" : 607,
                "detail" : {
                    'wordfail' : baidu.json.stringify([{
                                'winfoid' : '101',
                                'showword' : '失败关键词'
                            }, {
                                'winfoid' : '102',
                                'showword' : '失败关键词'
                            }, {
                                'winfoid' : '103',
                                'showword' : '失败关(*&^%键词'
                            }, {
                                'winfoid' : '104',
                                'showword' : '失败关<script>键词'
                            }]),
                        /*    */
                    'devicefail': baidu.json.stringify([{
                                'winfoid' : '101',
                                'showword' : '转移失败关键词'
                            }, {
                                'winfoid' : '102',
                                'showword' : '转移失败关键词'
                            }, {
                                'winfoid' : '103',
                                'showword' : '转移失败关(*&^%键词'
                            }, {
                                'winfoid' : '104',
                                'showword' : '转移失败关<script>键词'
                            }]),
                            
                    'wordrepeat' : baidu.json.stringify([{
                                'winfoid' : '101',
                                'showword' : '失败关键词'
                            }, {
                                'winfoid' : '102',
                                'showword' : '失败关键词'
                            }, {
                                'winfoid' : '103',
                                'showword' : '失败关(*&^%键词'
                            }, {
                                'winfoid' : '104',
                                'showword' : '失败关<script>键词'
                            }])
                },
                "idx" : 0
            }
        }
    
        return rel;
    };
});