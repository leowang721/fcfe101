define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = tpl.success();
    //    console.log('send param........');
    //    console.log(param);
        rel.data.listData = [];
        var maxNum = 150; //prompt('number', 0)
        param.fields.push('showqscore');
        for (var j = 0; j < maxNum; j++){
             rel.data.listData[j] = {};
             for (var i = 0, len = param.fields.length; i < len; i++) {
                 rel.data.listData[j][param.fields[i]] = Requester.debug.data['wordinfo'][param.fields[i]](j)+'';
             }
        }
        rel.data.tableData = {
            "clkShow":{"aWcnt":"2","aXAvg":"20","aYAvg":"1.23",
                 "bWcnt":"20","bXAvg":"21","bYAvg":"1.24",
                 "cWcnt":"30","cXAvg":"22","cYAvg":"1.25",
                 "dWcnt":"20","dXAvg":"23","dYAvg":"1.26"
             },
             "payClk":{"aWcnt":"3","aXAvg":"20","aYAvg":"2.23",
                 "bWcnt":"21","bXAvg":"21","bYAvg":"2.24",
                 "cWcnt":"31","cXAvg":"22","cYAvg":"2.25",
                 "dWcnt":"22","dXAvg":"23","dYAvg":"2.26"
             },
             "payShow":{"aWcnt":"4","aXAvg":"20","aYAvg":"3.23",
                 "bWcnt":"24","bXAvg":"25","bYAvg":"3.23",
                 "cWcnt":"33","cXAvg":"28","cYAvg":"3.25",
                 "dWcnt":"24","dXAvg":"29","dYAvg":"3.27"
             },
             "transClk":{"aWcnt":"2","aXAvg":"20","aYAvg":"4.23",
                 "bWcnt":"26","bXAvg":"41","bYAvg":"4.24",
                 "cWcnt":"36","cXAvg":"22","cYAvg":"4.25",
                 "dWcnt":"22","dXAvg":"43","dYAvg":"4.26"
             },
             "payTrans":{"aWcnt":"2","aXAvg":"50","aYAvg":"5.23",
                 "bWcnt":"29","bXAvg":"51","bYAvg":"5.24",
                 "cWcnt":"33","cXAvg":"52","cYAvg":"5.25",
                 "dWcnt":"24","dXAvg":"53","dYAvg":"5.26"
             }
         };
         rel.data.extraData = {"showSum":"333","clkSum":"233","visitSum":"344","transSum":"233",
              "acpAvg":"28","clkrAvg":"11","clkAvg":"174.5","showAvg":"274.53","payAvg":"26.5","transAvg":"124.19",
              "clkMax":"249","showMax":"349","payMax":"150","transMax":"190"
         };
         rel.data.hastrans = true;
         
         return rel;
        
    };
});