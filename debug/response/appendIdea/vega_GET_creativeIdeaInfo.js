define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var storage = require('../../lib/storage');
    var kslfData = storage.get('kslfData');
    if (kslfData === undefined) {
        kslfData = 0;
        storage.set('kslfData', 0);
    }

    var creativeIdeaData = require('../../materialData/creative').data;

    module.exports = function (path, param) {
        var rel = tpl.success();
    
        var maxNum = (kslfData == 4 ? 0 : 90);
        //prompt('number', 0)
        var pid = 0;
        if (param.condition && param.condition.planid) {
            pid = param.condition.planid * 1000;
        }
        rel.data.listData=[];maxNum=2;
        // rel.errorCode = {};
        //rel.errorCode.code = 1565;
        for (var j = 0; j < maxNum; j++) {
            rel.data.listData[j] = {};
            for (var i = 0, len = param.fields.length; i < len; i++) {
                if(param.fields[i] == 'content'){
                    var type = param.creativetype;
                     rel.data.listData[j][param.fields[i]] = creativeIdeaData[param.fields[i]][type](j + 1 + pid);
                }
                else{
                     rel.data.listData[j][param.fields[i]] = creativeIdeaData[param.fields[i]](j + 1 + pid);
                }
               
            }
        }
       return rel;
    };
});