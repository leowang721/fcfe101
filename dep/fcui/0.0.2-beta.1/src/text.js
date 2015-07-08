/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file 加载文本的amd插件
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} 加载文本的amd插件
 */
define(function (require) {
        return {
            load: function (resourceId, req, load) {
                var xhr = window.XMLHttpRequest
                    ? new XMLHttpRequest()
                    : new ActiveXObject('Microsoft.XMLHTTP');

                xhr.open('GET', req.toUrl(resourceId), true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            var source = xhr.responseText;
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
