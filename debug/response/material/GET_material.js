    
/**
 * 获取某个层级物料数据
 * @param {Object} level
 * @param {Object} param
 */
define(function (require, exports, module) {
    console.log('fdfdfff');
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    var materialData = {
        useracct: require('../../materialData/account').data,
        planinfo: require('../../materialData/plan').data,
        unitinfo: require('../../materialData/unit').data,
        wordinfo: require('../../materialData/keyword').data,
        ideainfo: require('../../materialData/idea').data,
        creativeIdeaInfo: require('../../materialData/creative').data
    };
    var flags = require('flags');
    var offline = '';
    if (flags.isOn('ENABLE_BUDGET_OFFLINE_INFO')) {
        offline = 'reonlinereason';
    }
    else {
        offline = 'offlinestat';
    }

    module.exports = function (path, param) {
        var rel = tpl.success();
        var maxNum = 90;
        var level = param.level;
        switch (level) {
            case 'useracct':
                rel.data.listData = [{}];
                var nowUserUid = 7;
                for (var i = 0, len = param.fields.length; i < len; i++) {
                    var method = materialData[level][nowUserUid][param.fields[i]];
                    if (param.fields[i] !== offline) {
                        rel.data.listData[0][param.fields[i]] = (
                            typeof method == 'function' ? method() : method
                        );
                    }
                }
                break;
            case "planinfo":
                if (param.condition && param.condition.planid) {
                    var idArr = param.condition.planid;
                }
                //rel.status = 800;
                rel.data.listData = [];
                //console.log(idArr)
                if(!idArr){
                    var pid = 0;
                    if(param.condition&&param.condition.planid){
                        pid = param.condition.planid*1000;
                    }
                    for (var j = 0; j < 5; j++){
                        rel.data.listData[j] = {};
                        for (var i = 0, len = param.fields.length; i < len; i++) {
                            /*if(param.fields[i] == 'appcnt'||
                            param.fields[i] == 'sublinkcnt'||
                            param.fields[i] == 'phonecnt'||
                            param.fields[i] == 'bridgecnt'
                             ){
                                 param.fields[i] = 'unitcnt'
                             }*/
                            rel.data.listData[j][param.fields[i]] = materialData[level][param.fields[i]](j+1+pid);
                        }
                    }
                }else{
                     /*if(param.fields.length == 1){
                        rel.status = 400
                        console.log(1,param)
                    }*/
                    for ( var k = 0 ; k < idArr.length ; k++){
                        rel.data.listData[k] = {};
                        //rel.status = 500;
                        for (var e = 0, len2 = param.fields.length; e < len2; e++) {
                            if(param.fields[e] == 'appcnt'||
                            param.fields[e] == 'sublinkcnt'||
                            param.fields[e] == 'phonecnt'||
                            param.fields[e] == 'bridgecnt'||
                            param.fields[e] == 'ecallcnt'
                             ){
                                 param.fields[e] = 'unitcnt'
                             }
                            rel.data.listData[k][param.fields[e]] = materialData[level][param.fields[e]](idArr[k]);
                        }
                        
                    }
                }
                /**
                 * 
                if(level != 'planinfo'){
                    rel.data = null;
                    rel.status = 800;
                }
                 */
                break;
            case "unitinfo":
                if (param.condition && !idArr) {
                    var idArr = param.condition.unitid
                }
                maxNum = 10;
                //rel.status = 800;
                rel.data.listData = [];
                //console.log(idArr)
                if(!idArr){
                    var pid = 0;
                    if(param.condition&&param.condition.planid){
                        pid = param.condition.planid*1000;
                    }
                    for (var j = 0; j < maxNum; j++){
                        rel.data.listData[j] = {};
                        for (var i = 0, len = param.fields.length; i < len; i++) {
                            rel.data.listData[j][param.fields[i]] = materialData[level][param.fields[i]](j+1+pid);
                        }
                    }
                }else{
                     /*if(param.fields.length == 1){
                        rel.status = 400
                        console.log(1,param)
                    }*/
                    for ( var k = 0 ; k < idArr.length ; k++){
                        rel.data.listData[k] = {};
                        //rel.status = 500;
                        for (var e = 0, len2 = param.fields.length; e < len2; e++) {
                            rel.data.listData[k][param.fields[e]] = materialData[level][param.fields[e]](idArr[k]);
                        }
                        
                    }
                }
    
                // rel.status = 900;
                // rel.error = {
                //     message: '太大了'
                // };
                
                // if(level != 'planinfo'){
                //     rel.data = null;
                //     rel.status = 800;
                // }
                 
                break;
            case "ideainfo":
                //rel.status = 800;
                rel.data.listData = [];
                //console.log(idArr)
                if(!idArr){
                    var pid = 0;
                    if(param.condition&&param.condition.planid){
                        pid = param.condition.planid*1000;
                    }
                    for (var j = 0; j < 5; j++){
                        rel.data.listData[j] = {};
                        for (var i = 0, len = param.fields.length; i < len; i++) {
                            rel.data.listData[j][param.fields[i]] = materialData[level][param.fields[i]](j+1+pid);
                        }
                    }
                }else{
                     /*if(param.fields.length == 1){
                        rel.status = 400
                        console.log(1,param)
                    }*/
                    for ( var k = 0 ; k < 5 ; k++){
                        rel.data.listData[k] = {};
                        //rel.status = 500;
                        for (var e = 0, len2 = param.fields.length; e < len2; e++) {
                            rel.data.listData[k][param.fields[e]] = materialData[level][param.fields[e]](idArr[k]);
                        }
                        
                    }
                }
                /**
                 * 
                if(level != 'planinfo'){
                    rel.data = null;
                    rel.status = 800;
                }
                 */
                break;
            case "wordinfo":
                rel.data.listData = [];
                //param.fields.push('mqscore')
                param.fields.push('mqscore')
                param.fields.push('showqscore')
                
                if (param.condition && param.condition.winfoid) {
                    var idArr = param.condition.winfoid;
                    var maxNum = idArr.length; 
                    for (var j = 0; j < maxNum; j++) {
                        rel.data.listData[j] = {};
                        for (var i = 0, len = param.fields.length; i < len; i++) {
                            rel.data.listData[j][param.fields[i]] = materialData[level][param.fields[i]]((j % 9 + 1) * 1000 + j);
                        }
                        rel.data.listData[j].winfoid = idArr[j];
                    }
                }
                else {
                    var maxNum = 200; //prompt('number', 0)
                    if (param.showword) {
                        maxNum = 120;
                    }
                    for (var j = 0; j < maxNum; j++) {
                        rel.data.listData[j] = {};
                        for (var i = 0, len = param.fields.length; i < len; i++) {
                            rel.data.listData[j][param.fields[i]] = materialData[level][param.fields[i]](j);
                        }
                    }
                }
                // rel.data = null;
                // rel.status = 900;
                // rel.error = {
                //     message: '请求超时。'
                // };
                break;
        };
        return rel;
    };
});