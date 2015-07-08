/**
 * @file 加载component注册HTML的amd模块
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(
    function (require, exports, module) {
        var fc = require('fc-core');
        var registry = require('./registry');

        return {
            load: function (resourceId, req, load) {
                var xhr = window.XMLHttpRequest
                    ? new XMLHttpRequest()
                    : new ActiveXObject('Microsoft.XMLHTTP');

                xhr.open(
                    'GET',
                    req.toUrl(resourceId + '.component.html'),
                    true
                );

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            var source = xhr.responseText;
                            registry.registerFromHtml(source);
                            // 先进行模板解析
                            fc.tpl.compile(source);
                            load(source);
                        }

                        /* jshint -W054 */
                        xhr.onreadystatechange = new Function();
                        /* jshint +W054 */
                        xhr = null;
                    }
                };

                xhr.send(null);
            }
        };
    }
);
