
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        rel.data = {};
    
        rel.data.Idea = {
                title: '{蹊径子链}，让搜索推广与众不同{啊哈}让搜索推广与众不同让搜索推广与众不同让搜索推广与众不同',
                desc1: '蹊径子链让您的{推广}拥有更丰富的表达形式和{内容}，吸引更多关注，帮您获得更好的推广效果',
                desc2: '如果您对蹊径子链的使用存在疑问，可{咨询}您的推广顾问',
                showurl: 'www.baidu.com',
                mishowurl: 'm.baidu.com'
            }
    
        rel.data.keywords = ['关键词1', '关键词2', '关键词3', '关键词4', '关键词5']
    
        return rel;
    
    };
});