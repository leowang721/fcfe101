/**
 * 匹配分析
 */
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            status : 200,
            errorCode : null,
            data : {
                sum : null,
                listData : [{
                            activestat : 0,
                            clkrate : "0",
                            clks : "0",
                            desc1 : "sadadsdasdasads",
                            desc2 : "dsadsadsadsa",
                            ideaid : 1,
                            ideastat : 2,
                            pausestat : 0,
                            paysum : "0",
                            planid : 4525623,
                            shows : "0",
                            showurl : "www.sdsdf.com",
                            title : "assddsadas",
                            trans : "0",
                            unitid : 55624561,
                            url : "http://www.sdsdf.com",
                            shadow_ideaid : 1221,
                            shadow_title : 'shadow棰樼洰' + 2,
                            shadow_desc1 : 'shadow鎻忚堪(1)',
                            shadow_desc2 : 'shadow鎻忚堪(2)' + 1,
                            shadow_url : 'http://www.baidu.com/' + 11,
                            shadow_showurl : 'http://www.baidu.com/' + 2,
                            shadow_ideastat : 1
                        }, {
                            activestat : 0,
                            clkrate : "0",
                            clks : "0",
                            desc1 : "sadadsdasdasads2",
                            desc2 : "dsadsadsadsa",
                            ideaid : 2,
                            ideastat : 2,
                            pausestat : 0,
                            paysum : "0",
                            planid : 4525623,
                            shows : "0",
                            showurl : "www.sdsdf.com",
                            title : "assddsadas",
                            trans : "0",
                            unitid : 55624561,
                            url : "http://www.sdsdf.com",
                            shadow_ideaid : 1123,
                            shadow_title : 'shadow棰樼洰' + 2,
                            shadow_desc1 : 'shadow鎻忚堪(1)',
                            shadow_desc2 : 'shadow鎻忚堪(2)',
                            shadow_url : 'http://www.baidu.com/',
                            shadow_showurl : 'http://www.baidu.com/',
                            shadow_ideastat : 1
                        }, {
                            activestat : 0,
                            clkrate : "0",
                            clks : "0",
                            desc1 : "sadadsdasdasads3",
                            desc2 : "dsadsadsadsa",
                            ideaid : 3,
                            ideastat : 2,
                            pausestat : 0,
                            paysum : "0",
                            planid : 4525623,
                            shows : "0",
                            showurl : "www.sdsdf.com",
                            title : "assddsadas",
                            trans : "0",
                            unitid : 55624561,
                            url : "http://www.sdsdf.com"
                        }, {
                            activestat : 0,
                            clkrate : "0",
                            clks : "0",
                            desc1 : "sadadsdasdasads",
                            desc2 : "dsadsadsadsa",
                            ideaid : 4,
                            ideastat : 2,
                            pausestat : 0,
                            paysum : "0",
                            planid : 4525623,
                            shows : "0",
                            showurl : "www.sdsdf.com",
                            title : "assddsadas4",
                            trans : "0",
                            unitid : 55624561,
                            url : "http://www.sdsdf.com"
                        }, {
                            activestat : 0,
                            clkrate : "0",
                            clks : "0",
                            desc1 : "sadadsdasdasads",
                            desc2 : "dsadsadsadsa",
                            ideaid : 5,
                            ideastat : 2,
                            pausestat : 0,
                            paysum : "0",
                            planid : 4525623,
                            shows : "0",
                            showurl : "www.sdsdf.com",
                            title : "assddsadas4",
                            trans : "0",
                            unitid : 55624561,
                            url : "http://www.sdsdf.com"
    
                        }/*
                             * ,{ activestat : 0, clkrate : "0", clks : "0", desc1 :
                             * "sadadsdasdasads", desc2 : "dsadsadsadsa", ideaid :
                             * 6, ideastat : 2, pausestat : 0, paysum : "0", planid :
                             * 4525623, shows : "0", showurl : "www.sdsdf.com",
                             * title : "assddsadas5", trans : "0", unitid :
                             * 55624561, url : "http://www.sdsdf.com",
                             * shadow_ideaid: 122, shadow_title: 'shadow棰樼洰' + 2,
                             * shadow_desc1: 'shadow鎻忚堪(1)' + 111, shadow_desc2:
                             * 'shadow鎻忚堪(2)' + 111, shadow_url:
                             * 'http://www.baidu.com/' + 11, shadow_showurl:
                             * 'http://www.baidu.com/' + 2, shadow_ideastat: 1 },{
                             * activestat : 0, clkrate : "0", clks : "0", desc1 :
                             * "sadadsdasdasads", desc2 : "dsadsadsadsa", ideaid :
                             * 7, ideastat : 2, pausestat : 0, paysum : "0", planid :
                             * 4525623, shows : "0", showurl : "www.sdsdf.com",
                             * title : "assddsadas6", trans : "0", unitid :
                             * 55624561, url : "http://www.sdsdf.com",
                             * shadow_ideaid: 111, shadow_title: 'shadow棰樼洰' + 2,
                             * shadow_desc1: 'shadow鎻忚堪(1)' + 111, shadow_desc2:
                             * 'shadow鎻忚堪(2)' + 111, shadow_url:
                             * 'http://www.baidu.com/' + 11, shadow_showurl:
                             * 'http://www.baidu.com/' + 2, shadow_ideastat: 1 },{
                             * activestat : 0, clkrate : "0", clks : "0", desc1 :
                             * "sadadsdasdasads", desc2 : "dsadsadsadsa", ideaid :
                             * 8, ideastat : 2, pausestat : 0, paysum : "0", planid :
                             * 4525623, shows : "0", showurl : "www.sdsdf.com",
                             * title : "assddsadas7", trans : "0", unitid :
                             * 55624561, url : "http://www.sdsdf.com",
                             * shadow_ideaid: 10, shadow_title: 'shadow棰樼洰' + 2,
                             * shadow_desc1: 'shadow鎻忚堪(1)' + 111, shadow_desc2:
                             * 'shadow鎻忚堪(2)' + 111, shadow_url:
                             * 'http://www.baidu.com/' + 11, shadow_showurl:
                             * 'http://www.baidu.com/' + 2, shadow_ideastat: 1 },{
                             * activestat : 0, clkrate : "0", clks : "0", desc1 :
                             * "sadadsdasdasads", desc2 : "dsadsadsadsa", ideaid :
                             * 9, ideastat : 2, pausestat : 0, paysum : "0", planid :
                             * 4525623, shows : "0", showurl : "www.sdsdf.com",
                             * title : "assddsadas8", trans : "0", unitid :
                             * 55624561, url : "http://www.sdsdf.com",
                             * shadow_ideaid: 11, shadow_title: 'shadow棰樼洰' + 2,
                             * shadow_desc1: 'shadow鎻忚堪(1)' + 111, shadow_desc2:
                             * 'shadow鎻忚堪(2)' + 111, shadow_url:
                             * 'http://www.baidu.com/' + 11, shadow_showurl:
                             * 'http://www.baidu.com/' + 2, shadow_ideastat: 1 },{
                             * activestat : 0, clkrate : "0", clks : "0", desc1 :
                             * "sadadsdasdasads", desc2 : "dsadsadsadsa", ideaid :
                             * 10, ideastat : 2, pausestat : 0, paysum : "0", planid :
                             * 4525623, shows : "0", showurl : "www.sdsdf.com",
                             * title : "assddsadas9", trans : "0", unitid :
                             * 55624561, url : "http://www.sdsdf.com",
                             * shadow_ideaid: 12, shadow_title: 'shadow棰樼洰' + 2,
                             * shadow_desc1: 'shadow鎻忚堪(1)' + 111, shadow_desc2:
                             * 'shadow鎻忚堪(2)' + 111, shadow_url:
                             * 'http://www.baidu.com/' + 11, shadow_showurl:
                             * 'http://www.baidu.com/' + 2, shadow_ideastat: 1 }
                             */
                ]
            }
        }
        // console.log(rel);
        return rel;
    };
});