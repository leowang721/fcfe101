
/**
 * 获取代码（转化跟踪工具-->网站列表-->获取代码）
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
        rel.data = '<script type=\"text/javascript\">\nvar _bdhmProtocol = ((\"https:\" == document.location.protocol) ? \" https://\" : \" http://\");\ndocument.write(unescape(\"%3Cscript src=\'\" + _bdhmProtocol + \"hm.baidu.com/h.js%3F66d8521f54216b3903b0aef65806c363\' type=\'text/javascript\'%3E%3C/script%3E\"));\n</script>\n';
        return rel;
    };
});