
/**
 * 获取发起查询网站列表（下拉框）请求
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success(),
            listData = [];
        
        listData.push({
            site_url : 'dreams-travel.com',
            site_id : 1
        });
        listData.push({
            site_url : 'dreams\-travel.com/123',
            site_id : -2
        });
        listData.push({
            site_url : 'dreams&#8211;travel.com',
            site_id : 1
        });
        listData.push({
            site_url : 'dreams&#8211;travel.com/123',
            site_id : 3
        });
        listData.push({
            site_url : 'dreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreams-travel.com',
            site_id : 4
        });
        listData.push({
            site_url : 'dreams-travel.com/123',
            site_id : 3
        });
        listData.push({
            site_url : 'dreams<a>&</a>-travel.com',
            site_id : 4
        });
        listData.push({
            site_url : 'dreams-travel.com/123',
            site_id : 6
        });
        listData.push({
            site_url : 'dreams-travel.com/123',
            site_id : 3
        });
        listData.push({
            site_url : 'dreams<a>&</a>-travel.com',
            site_id : 11
        });
        listData.push({
            site_url : 'dreams-travel.com/123',
            site_id : 12
        });
        listData.push({
            site_url : 'dreams-travel.com/123',
            site_id : 13
        });
        listData.push({
            site_url : 'dreams<a>&</a>-travel.com',
            site_id : 14
        });
        listData.push({
            site_url : 'dreams-travel.com/123',
            site_id : 16
        });
        
        rel.data = listData;
        
        return rel;
    };
});