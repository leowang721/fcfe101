define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
    /*    return this.GET_material(params.level,{
            fields    : ['offlinereason']
        });*/
        var rel = tpl.success();
    
        if(param.level=='creativeinfo'){
             rel.data = [
                
                [7,6],
                [17],
                [23],
                [26],
                [27],
                [24],
                [4,1],
                [3,
                    [
                        ["wordblack原因213","{关键词}{通配符}发&lt;达发大水"],
                        ["wordblack原因2","关键词2"],
                        ["wordblack原因2","关键词2"],
                        ["wordblack原因2","关键词2"],
                        [ "123","1hfgg23<br/><br/>324jfdlja<br/>53"]
                    ]
                ],
                [15,
                    [
                        ["wordblack原因213","{关键词}{通配符}发&lt;达发大水"],
                        ["wordblack原因2","关键词2"],
                        ["wordblack原因2","关键词2"],
                        ["wordblack原因2","关键词2"],
                        [ "123","1hfgg23<br/><br/>324jfdlja53"]
                    ]
                ]
            ];
         } else {
             rel.data = [
                [5],
                [5, 1],
                 [2,'28,29'],
                 [6, 10],
                 [21, 5],
                [16,1],
                [13],
                [15],
                [19],
                [11],
                [7,3],
                [4,1],
                [3,
                    [  
                        [10,"喵喵"],
                        [1024,"法拉利"],
                        [1024,"保时捷"],
                        [2048,"悍马"],
                        ['不宜推广$$$信',""],
                        ['不宜推广信息巴拉拉巴拉拉',"闫玲玲"],
                        [5120,"悍马5122"],
                        [9216, 'sth']
                    ]
                ],
                [20,
                  [  [10,"喵喵"],
                     [1024,"法拉利"],
                     [1024,"保时捷"],
                     ['不宜推广信息巴拉拉巴拉拉',"闫玲玲"],
                     ['不宜推广信息巴拉拉巴拉拉',"闫玲玲"],
                     [5120,"悍马5122"]
                     ]
                  ],  
                [12,
                    [
                        [213,"wordblack原因213","{关键词}{通配符}发&lt;达<br/>发大水"],
                        [309,"wordblack原因2","关键词2"],
                        [5120,"wordblack原因2","关键词2"],
                        [16384,"wordblack原因2","关键词2"],
                        [8192, "123","1hfgg23<br/><br/>324jfdlja<br/>53"]
                    ]
                ]
            ];
         }
        
        // 模拟数据请求延迟
        rel.timeout = 1000;
        return rel;
    };
});