/**
 * @file cross-domain component template loader plugin
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define('component', function (require) {
    var registry = require('k-component/registry');
    var plugin = {
        load: function (resourceId, req, load, config) {
            require([resourceId], function (tpl) {
                registry.registerFromHTML(tpl);
                load(tpl);
            });
        }
    };
    return plugin;
});
