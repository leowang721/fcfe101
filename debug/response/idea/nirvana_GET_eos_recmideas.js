
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        
        var random = Math.random();
        rel.data = {
            hasmore: 1,
            targetword: '' + random
        }
    
        if (random > 0.2) {
            rel.data.recmideas = [
                { 
                    title: '标题' + random,
                    desc1: '描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                    desc2: '描述丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫'
                },
                { 
                    title: '标题' + random,
                    desc1: '描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                    desc2: '描述丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫'
                },
                { 
                    title: '标题' + random,
                    desc1: '描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                    desc2: '描述丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫丫'
                }
            ];
        }
    
        return rel;
    };
});