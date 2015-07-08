/**
 * @file 动态创意 获取推荐关注信息及创意片段
 * jupiter/GET/dynidea/focus
 *
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
define(function (require, exports, module) {
    var random = require('random');
    
    var wordSet = [
        '应用',
        '北京',
        '海淀',
        '情怀',
        '逼格',
        '雅思',
        '托福雅思',
        'GRE雅思考试真题试卷',
        '英语雅卷',
        '数学雅思考试真题试卷',
        '语文'
    ];
    
    var domains = [
        'china356', 'china356', 'china356'
    ];
    
    // 每次生成相同的域
    var domain = random.getFrom(domains);
    
    function getSnippets(num) {
        var snippets = [];
        for (var i = 0; i < num; i++) {
            snippets.push({
                title: random.words(5, 12, wordSet),
                url: 'http://www.' + domain + '.com/' + random.chars(20, 100),
                murl: 'http://www.' + domain + '.com/' + random.chars(20, 180)
            });
        }
        return snippets;
    }
    
    function getTags(num) {
        var tags = [];
        
        for (var i = 0; i < num; i++) {
            tags.push(
                {
                    tagCategory: random.int(0, 4),
                    name: random.words(10, 32),
                    example: random.getFrom(wordSet, 2),
                    snippets: getSnippets(15)
                }
            );
        }
        return tags;
    }
    
    module.exports = function (path, params) {
        var id = params.id;
        
        return {
            status: 200,
            data: getTags(30),
            error: null
        };
    };
})