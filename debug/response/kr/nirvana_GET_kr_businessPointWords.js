
define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
            var rel = tpl.success();
            rel.data = {
                logid : 123,
                attr : []  , //保持一致性,不用处理
                query: '122',  //客户输入的词,帮助FE确认是哪个请求
                group : [
                    {
                        grouprsn : '<span class="business_point"><label>“xxx”</label> 业务点下的其他关键词<span></span></span>',
                        resultitem : [
                           {
                            wordid : '123',              //wordid为关键词id，不用处理
                            word : 'asdada',                  //word为关键词字面;
                            pv : null, //保持一致性,不用处理；       
                            kwc : null,        //保持一致性,不用处理度，
                            pv_trend_month : null,//保持一致性,不用处理
                            index : 0 ,                //顺序位置 
                            attr_index : []      //保持一致性,不用处理    
                           },{
                            wordid : '3434',               //wordid为关键词id，不用处理
                            word : '122sasd',                  //word为关键词字面;
                            pv : null, //保持一致性,不用处理；       
                            kwc : null,        //保持一致性,不用处理度，
                            pv_trend_month : null,//保持一致性,不用处理
                            index : 1 ,                //顺序位置 
                            attr_index : []      //保持一致性,不用处理    
                           },{
                            wordid : '243243',               //wordid为关键词id，不用处理
                            word : 'tyf',                  //word为关键词字面;
                            pv : null, //保持一致性,不用处理；       
                            kwc : null,        //保持一致性,不用处理度，
                            pv_trend_month : null,//保持一致性,不用处理
                            index : 2 ,                //顺序位置 
                            attr_index : []      //保持一致性,不用处理    
                           }, {
                            wordid : '1225465',               //wordid为关键词id，不用处理
                            word : 'dgfd',                  //word为关键词字面;
                            pv : null, //保持一致性,不用处理；          
                            kwc : null,        //保持一致性,不用处理度，
                            pv_trend_month : null,//保持一致性,不用处理
                            index : 3 ,                //顺序位置 
                            attr_index : []      //保持一致性,不用处理    
                           },{
                            wordid : '65654',               //wordid为关键词id，不用处理
                            word : 'fgfgh',                 //word为关键词字面;
                            pv : null, //保持一致性,不用处理；      
                            kwc : null,        //保持一致性,不用处理度，
                            pv_trend_month : null,//保持一致性,不用处理
                            index : 4 ,                //顺序位置 
                            attr_index : []      //保持一致性,不用处理    
                           }
                        ]
                    }
                ],
            actualRecType : null,//保持一致性
            recquerytype : null    //保持一致性
            };
            return rel;
    };
});