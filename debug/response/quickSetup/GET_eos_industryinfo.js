
/**
 * 第一阶段第一步提交，用以获取用户的业务信息
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(), listData = [];
    
        for (var i = 0; i < 2; i++) {
            listData.push({
                secondtrade : '二级行业' + i,
                firstbiz : [{
                    firstbusiness : "一级业务点" + i + '_0',
                    secbiz : [{
                        secondbusiness : '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长二级业务' + i
                                + '_0',
                        wordproportion : 15,
                        examplewords : '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长一个，二个，三个关键词'
                    }, {
                        secondbusiness : '二级业务' + i + '_1',
                        wordproportion : 15,
                        examplewords : ''
                    }]
                }, {
                    firstbusiness : "一级业务点" + i + '_1',
                    secbiz : [{
                                secondbusiness : '二级业务' + i + '_2',
                                wordproportion : 15,
                                examplewords : '一个，二个，三个关键词'
                            }, {
                                secondbusiness : '二级业务' + i + '_3',
                                wordproportion : 15,
                                examplewords : '一个，二个，三个关键词'
                            }]
                }]
            });
        }
    
        rel.data = {
            listData : listData
        };
    
        /*
         * rel = { "status": 400,
         * 
         * "errorCode": { "message": "你妹啊 你妹！", "code": 6011, "detail": null } };
         */
    
        return rel;
    };
});