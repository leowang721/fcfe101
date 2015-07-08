define(function (require, exports, module) {
    
var random = require('random');

var ERROR = { 
    30001:'字面为空', 
    30002:'字面长度超限', 
    30003:'字面已存在', 
    30004:'字面含特殊字符', 
    30005:'字面触犯黑名单', 
    30006:'字面触犯注册商标', 
    30007:'字面侵犯他人合法权益', 
    30101:'默认URL为空', 
    30102:'默认URL长度超限', 
    30103:'默认URL含特殊字符', 
    30104:'默认URL含非法前缀', 
    30105:'默认URL含非法后缀', 
    30106:'默认URL与主域不一致', 
    30201:'移动URL长度超限', 
    30202:'移动URL含特殊字符', 
    30203:'移动URL含非法前缀', 
    30204:'移动URL含非法后缀', 
    30205:'移动URL与主域不一致', 
    30301:'计划不存在', 
    30302:'单元不存在', 
    30303:'动态片段个数超限' 
};

var validators = exports.validators = {
    30001: function (item) {
        return !(item.title === '');
    },
    30002: function (item) {
        return !(item.title.length > 16);
    },
    30003: function (item) {
        return !(item.title.indexOf('重复字符') > -1);
    },
    30004: function (item) {
        return !(item.title.indexOf('特殊') > -1);
    },
    30005: function (item) {
        return !(item.title.indexOf('黑') > -1);
    },
    30006: function (item) {
        return !(item.title.indexOf('百度') > -1);
    },
    30006: function (item) {
        return !(item.url.length == 0);
    },
    30101: function (item) {
        return !(item.url.length > 1017);
    },
    30102: function (item) {
        return !(item.url.indexOf('特殊') > -1);
    },
    30103: function (item) {
        return !(item.url.indexOf('360') > -1);
    },
    30104: function (item) {
        return !(item.url.indexOf('qihu') > -1);
    },
    30105: function (item) {
        return !(item.url.indexOf('jd') > -1);
    },
    30106: function (item) {
        return !(item.url.indexOf('qiqi') > -1);
    },
    30201: function (item) {
        return !(item.url.length > 1017);
    },
    30202: function (item) {
        return !(item.url.indexOf('特殊') > -1);
    },
    30203: function (item) {
        return !(item.murl.indexOf('360') > -1);
    },
    30204: function (item) {
        return !(item.murl.indexOf('qihu') > -1);
    },
    30205: function (item) {
        return !(item.murl.indexOf('361') > -1);
    },
    30206: function (item) {
        return !(item.murl.indexOf('zhi') > -1);
    },
    30301: function (item) {
        return random.int(1, 100) > 3;
    },
    30302: function (item) {
        return random.int(1, 100) > 7;
    },
    30303: function (item) {
        return random.int(1, 100) > 3;
    }
};

exports.validate = function (item) {
    var error = {};
    for (var v in validators) {
        if (validators.hasOwnProperty(v) && !validators[v](item)) {
            error.idx = item.idx;
            error.code = v;
            error.message = ERROR[v];
            break; // 每项只提示一类错误
        }
    }
    return error;
};
    
});