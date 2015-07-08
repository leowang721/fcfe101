
define(function (require, exports, module) {
    var tpl = require('lib/tpl');
    var random = require('random');

    module.exports = function (path, param) {
        var rel = tpl.success();
        var list = [];
    
        for (var i = 0; i < 20; i++) {
            list[i] = (function (i) {
                var str = '\'"!<?([{}])>@#$%&^09876abcdeZYXWVU我是长名字特殊·'
                var mcid = 99 + i;
                var name = random.words(20, 40, str);
                var iconurl = 'src/resource/img/'
                    + random.getFrom(['panda.png', 'banana.png'])[0];
                var detailsurl = 'as.baidu.com/a/item=' + i;
                var version = '1.1.8';
                var platform = 0;
                var summary = '哈哈<br />hello<br />啊哈<br/>a\r\nb\rc\nd<br>e';
                var downurl = 'as.baidu.com/d/item=' + i;
                return {
                    sid: mcid,
                    iconurl: iconurl,
                    detailsurl: detailsurl,
                    version: version,
                    platform: platform,
                    downurl: downurl,
                    summary: summary,
                    name: name
                };
            })(i);
        }
    
        rel.data = {};
        rel.status = 200;
        
        rel.data.listData = list;
    
        //console.log(rel);
    
        return rel;
    };
});
