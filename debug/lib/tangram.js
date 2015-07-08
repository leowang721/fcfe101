/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/isGecko.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/2
 */

/**
 * 声明baidu包
 */
var baidu = baidu || {version: "1-3-1"};

/**
 * 将baidu作为模块暴露对象
 * 
 * @type {Object}
 */
module.exports = baidu;


/**
 * 声明baidu.number包
 */
baidu.number = baidu.number || {};

/**
 * 对目标数字进行0补齐处理
 * 
 * @param {number} source 目标数字
 * @param {number} length 需要输出的长度
 * @return {string} 对目标数字处理后的结果
 */
baidu.number.pad = function (source, length) {
    var pre = "",
        negative = (source < 0),
        string = String(Math.abs(source));

    if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
    }

    return (negative ?  "-" : "") + pre + string;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/number/comma.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 为目标数字添加逗号分隔
 * 
 * @param {number} source          目标数字
 * @param {number} length optional 两次逗号之间的数字位数
 * @return {string} 对目标数字处理后的结果
 */
baidu.number.comma = function (source, length) {
    var pair = String(source).split('.'), 
        integer = pair[0].split('').reverse().join(''),
        reg;
    
    if (!length || length < 1) {
        length = 3;
    }

    reg = new RegExp('\\d{' + length + '}', 'g');
    integer = integer.replace(reg, 
        function (s) {
            return s + ",";
        }).split('').reverse().join('');
        
    if (integer.charAt(0) == ',') {
        integer = integer.slice(1);
    }
    
    pair[0] = integer;
    return pair.join('.');
};

 /**
 * 输出小数点后为两位的格式化数字
 * @param {Number} d
 * @return {Number}
 * @author zuming@baidu.com
 */
baidu.number.fixed = function(d) {
    d = +d;
    return(d.toFixed(2));   
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/escapeSymbol.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 声明baidu.url包
 */
baidu.url = baidu.url || {};

/**
 * 对字符串进行%&+/#=和空格七个字符转义
 * 
 * 用于get请求转义。
 * 在服务器只接受gbk，并且页面是gbk编码时，可以经过本转义后直接发get请求
 * 
 * @param {string} source 需要转义的字符串
 * @return {string} 转义后的字符串
 */
baidu.url.escapeSymbol = function (source) {
    return String(source).replace(/\%/g, "%25")
                        .replace(/&/g, "%26")
                        .replace(/\+/g, "%2B")
                        .replace(/\ /g, "%20")
                        .replace(/\//g, "%2F")
                        .replace(/\#/g, "%23")
                        .replace(/\=/g, "%3D");
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/getQueryValue.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/escapeReg.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 声明baidu.string包
 */
baidu.string = baidu.string || {};

/**
 * 将目标字符串中可能会影响正则表达式构造的字符串进行转义
 * 主要转义如下的字符： .*+?^=!:${}()|[\]/\
 * 
 * @param {string} source 目标字符串
 * @return {string} 转义后的字符串
 */
baidu.string.escapeReg = function (source) {
    return String(source)
            .replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
};

/**
 * 根据参数名从目标URL中获取参数值
 * 
 * @param {string} url 目标URL
 * @param {string} key 要获取的参数名
 * @return {string|null} 获取的参数值，参数不存在时返回null
 */
baidu.url.getQueryValue = function (url, key) {
    var reg = new RegExp(
                        "(^|&|\\?|#)" 
                        + baidu.string.escapeReg(key) 
                        + "=([^&]*)(&|\x24)", 
                    "");
    var match = url.match(reg);
    if (match) {
        return match[2];
    }
    
    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/jsonToQuery.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 将json对象解析成query字符串
 * 使用者应保证提供json对象中key的合法性，该方法对key不进行任何处理
 * 
 * @param {JSON}     json               需要解析的json对象
 * @param {Function} replacer optional  对值进行特殊处理的函数
 * @return {string} 解析结果字符串
 */
baidu.url.jsonToQuery = function (json, replacer) {
    var result = [], 
        len = 0, 
        key, item, itemLen;
    
    replacer = replacer || function (value) {
        return baidu.url.escapeSymbol(value);
    };
        
    for (key in json) {
        if (json.hasOwnProperty(key)) {
            item = json[key];
            // 这里只考虑item为数组、字符串、数字类型，不考虑嵌套的object
            if (Object.prototype.toString.call(item) == '[object Array]') {
                itemLen = item.length;
                while (itemLen--) {
                    result[len++] = key + '=' + replacer(item[itemLen], key);
                }
            } else {
                result[len++] = key + '=' + replacer(item, key);
            }
        }
    }
    return result.join('&');
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/queryToJson.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 解析目标URL中的参数成json对象
 * 
 * @param {string} url 目标URL
 * @return {JSON} 解析结果对象
 */
baidu.url.queryToJson = function (url) {
    var query   = url.substr(url.indexOf('?') + 1),
        params  = query.split('&'),
        len     = params.length,
        result  = {},
        key, value, item, param;
    
    for (var i = 0; i < len; i++) {
        param   = params[i].split('=');
        key     = param[0];
        value   = param[1];
        
        item = result[key];
        if ('undefined' == typeof item) {
            result[key] = value;
        } else if (Object.prototype.toString.call(item) == '[object Array]') {
            item.push(value);
        } else { // 这里只可能是string了
            result[key] = [item, value];
        }
    }
    
    return result;
};


/**
 * 声明baidu.json包
 */
baidu.json = baidu.json || {};

/**
 * 将字符串解析成json对象
 * 
 * @param {string} data 需要解析的字符串
 * @return {Object} 解析结果json对象
 */
baidu.json.parse = function (data) {
    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if (!/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {
        return null;
    }
    //优先使用原生的parse
    return window.JSON && window.JSON.parse ?
        window.JSON.parse( data ) :
        (new Function("return " + data))();
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/stringify.js
 * author: erik
 * version: 1.1.0
 * date: 2010/01/11
 */



/**
 * 将json对象序列化
 * 
 * @param {Object} value 需要序列化的json对象
 * @return {string} 序列化后的字符串
 */
baidu.json.stringify = (function () {
    /**
     * 字符串处理时需要转义的字符表
     * @private
     */
    var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };
    
    /**
     * 字符串序列化
     * @private
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g, 
                function (match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return "\\u00" 
                            + Math.floor(c / 16).toString(16) 
                            + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }
    
    /**
     * 数组序列化
     * @private
     */
    function encodeArray(source) {
        var result = ["["], 
            l = source.length,
            preComma, i, item;
            
        for (i = 0; i < l; i++) {
            item = source[i];
            
            switch (typeof item) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if(preComma) {
                    result.push(',');
                }
                result.push(baidu.json.stringify(item));
                preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
    }
    
    /**
     * 处理日期序列化时的补零
     * @private
     */
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }
    
    /**
     * 日期序列化
     * @private
     */
    function encodeDate(source){
        return '"' + source.getFullYear() + "-" 
                + pad(source.getMonth() + 1) + "-" 
                + pad(source.getDate()) + "T" 
                + pad(source.getHours()) + ":" 
                + pad(source.getMinutes()) + ":" 
                + pad(source.getSeconds()) + '"';
    }
    
    return function (value) {
        switch (typeof value) {
        case 'undefined':
            return 'undefined';
            
        case 'number':
            return isFinite(value) ? String(value) : "null";
            
        case 'string':
            return encodeString(value);
            
        case 'boolean':
            return String(value);
            
        default:
            if (value === null) {
                return 'null';
            } else if (value instanceof Array) {
                return encodeArray(value);
            } else if (value instanceof Date) {
                return encodeDate(value);
            } else {
                var result = ['{'],
                    encode = baidu.json.stringify,
                    preComma,
                    item;
                    
                for (key in value) {
                    if (value.hasOwnProperty(key)) {
                        item = value[key];
                        switch (typeof item) {
                        case 'undefined':
                        case 'unknown':
                        case 'function':
                            break;
                        default:
                            if (preComma) {
                                result.push(',');
                            }
                            preComma = 1;
                            result.push(encode(key) + ':' + encode(item));
                        }
                    }
                }
                result.push('}');
                return result.join('');
            }
        }
    };
})();

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/encode.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/24
 */



/**
 * 将json对象序列化
 * 
 * @param {Object} value 需要序列化的json对象
 * @return {string} 序列化后的字符串
 */
baidu.json.encode = function (value) {
    return baidu.json.stringify(value);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/decode.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 将字符串解析成json对象
 * 
 * @param {string} source 需要解析的字符串
 * @return {Object} 解析结果json对象
 */
baidu.json.decode = function (source) {
    return baidu.json.parse(source);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date/format.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */



/**
 * 声明baidu.date包
 */
baidu.date = baidu.date || {};


/**
 * 对目标日期对象进行格式化
 * 
 * @param {string}  source  目标日期对象
 * @param {string}  pattern 日期格式化规则
 * @return {string} 格式化后的字符串
 */
baidu.date.format = function (source, pattern) {
    if ('string' != typeof pattern) {
        return source.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }
    
    var pad     = baidu.number.pad,
        year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(year.toString().slice(2), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date/parse.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */



/**
 * 将目标字符串转换成日期对象
 * 
 * @param {string} source 目标字符串
 * @return {Date} 转换后的日期对象
 */
baidu.date.parse = function (source) {
    var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ('string' == typeof source) {
        if (reg.test(source) || isNaN(Date.parse(source))) {
            var d = source.split(/ |T/),
                d1 = d.length > 1 
                        ? d[1].split(/[^\d]/) 
                        : [0, 0, 0],
                d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0, 
                            d0[1] - 1, 
                            d0[2] - 0, 
                            d1[0] - 0, 
                            d1[1] - 0, 
                            d1[2] - 0);
        } else {
            return new Date(source);
        }
    }
    
    return new Date();
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilter/color.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilters.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */





/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/trim.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/15
 */



(function () {
    var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    
    /**
     * 删除目标字符串两端的空白字符
     * 
     * @param {string} source 目标字符串
     * @return {string} 删除两端空白字符后的字符串
     */
    baidu.string.trim = function (source) {
        return String(source)
                .replace(trimer, "");
    };
})();

// 声明快捷方法
baidu.trim = baidu.string.trim;

/**
 * 将目标字符串进行驼峰化处理
 * todo:考虑以后去掉下划线支持？
 * 
 * @param {string} source 目标字符串
 * @return {string} 驼峰化处理后的字符串
 */
baidu.string.toCamelCase = function (source) {
    //提前判断，提高getStyle等的效率 thanks xianwei
    if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
        return source;
    }
    return source.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
};


/**
 * 声明baidu.lang包
 */
baidu.lang = baidu.lang || {};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isNumber.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否number类型或Number对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isNumber = function (source) {
    return '[object Number]' == Object.prototype.toString.call(source);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/inherits.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/24
 */

/**
 * 为类型构造器建立继承关系
 * 
 * @param {Function} subClass            子类构造器
 * @param {Function} superClass          父类构造器
 * @param {string}   className optional  类名标识
 */
baidu.lang.inherits = function (subClass, superClass, className) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();
    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    if ("string" == typeof className) {
        proto._className = className;
    }
};

// 声明快捷方法
baidu.inherits = baidu.lang.inherits;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isElement.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否Element对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isElement = function (source) {
    return !!(source && source.nodeName && source.nodeType == 1);
};

baidu.lang.hasValue = function (source) {
        return !(source === null || typeof source == 'undefined');
};

/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/decontrol.js
 * author: meizz
 * version: 1.1.0
 * $date$
 */

/**
 * 判断目标参数是否Array对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};

/**
 * 判断目标参数是否Object对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isObject = function (source) {
    return 'function' == typeof source || !!(source && 'object' == typeof source);
};

// 声明快捷方法
baidu.isObject = baidu.lang.isObject;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isString.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否string类型或String对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isString = function (source) {
    return '[object String]' == Object.prototype.toString.call(source);
};

// 声明快捷方法
baidu.isString = baidu.lang.isString;

/**
 * 声明baidu.object包
 */
baidu.object = baidu.object || {};

/**
 * 将源对象的所有属性拷贝到目标对象中
 * 
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 目标对象
 */
baidu.object.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    
    return target;
};

// 声明快捷方法
baidu.extend = baidu.object.extend;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/each.js
 * author: berg
 * version: 1.1.1
 * date: 2010-04-19
 */



/**
 * 循环遍历object中的每一个元素
 * 
 * @param {Array}    source   需要遍历的数组
 * @param {Function} iterator 对每个数组元素进行调用的函数
 * @return {Array} 遍历的数组
 */
baidu.object.each = function (source, iterator) {
    var returnValue, key, item; 
    if ('function' == typeof iterator) {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                item = source[key];
                returnValue = iterator.call(source, item, key);
        
                if (returnValue === false) {
                    break;
                }
            }
        }
    }
    return source;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/keys.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取目标对象的键名列表
 * 
 * @param {Object} source 目标对象
 * @return {Array} 键名列表
 */
baidu.object.keys = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = k;
        }
    }
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/values.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取目标对象的值列表
 * 
 * @param {Object} source 目标对象
 * @return {Array} 值列表
 */
baidu.object.values = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = source[k];
        }
    }
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/extend.js
 * author: erik, berg
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 对一个object进行深度拷贝
 * 
 * @param {Any} source 需要进行拷贝的对象
 * @return {Any} 拷贝后的新对象
 */

baidu.object.clone  = (function(buildInObject){
    return function (source) {
        var result = source, i, len;
        if (!source
            || source instanceof Number
            || source instanceof String
            || source instanceof Boolean) {
            return result;
        } else if (source instanceof Array) {
            result = [];
            var resultLen = 0;
            for (i = 0, len = source.length; i < len; i++) {
                result[resultLen++] = baidu.object.clone(source[i]);
            }
        } else if ('object' == typeof source) {
            if(buildInObject[Object.prototype.toString.call(source)]){
                return result;
            }
            result = {};
            for (i in source) {
                if (source.hasOwnProperty(i)) {
                    result[i] = baidu.object.clone(source[i]);
                }
            }
        }
        return result;
    };
})({
    // buildInObject, 用于处理无法遍历Date等对象的问题
    '[object Function]': 1,
    '[object RegExp]'  : 1,
    '[object Date]'    : 1,
    '[object Error]'   : 1 
});
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/getByteLength.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取目标字符串在gbk编码下的字节长度
 * 假设：非x00-xff的都是双字节
 * 
 * @param {string} source 目标字符串
 * @return {number} 字节长度
 */
baidu.string.getByteLength = function (source) {
    return String(source).replace(/[^\x00-\xff]/g, "ci").length;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/decodeHTML.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 对目标字符串进行html解码
 * 
 * @param {string} source 目标字符串
 * @return {string} html解码后的字符串
 */
baidu.string.decodeHTML = function (source) {
    var str = String(source)
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&");
    //处理转义的中文和实体字符
    return str.replace(/&#([\d]+);/g, function(_0, _1){
        return String.fromCharCode(parseInt(_1, 10));
    });
};

baidu.decodeHTML = baidu.string.decodeHTML;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/format.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 对目标字符串进行格式化
 * 
 * @param {string}          source  目标字符串
 * @param {Object|string*}  opts    提供相应数据的对象
 * @return {string} 格式化后的字符串
 */
baidu.string.format = function (source, opts) {
    source = String(source);
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
        data = data.length == 1 ? 
            /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
            (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
            : data;
        return source.replace(/#\{(.+?)\}/g, function (match, key){
            var replacer = data[key];
            // chrome 下 typeof /a/ == 'function'
            if('[object Function]' == toString.call(replacer)){
                replacer = replacer(key);
            }
            return ('undefined' == typeof replacer ? '' : replacer);
        });
    }
    return source;
};

// 声明快捷方法
baidu.format = baidu.string.format;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/wbr.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 为目标字符串添加<wbr>软换行
 * 
 * @param {string} source 目标字符串
 * @return {string} 添加软换行后的字符串
 */
baidu.string.wbr = function (source) {
    return String(source)
        .replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, '$&<wbr>')
        .replace(/><wbr>/g, '>');
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/subByte.js
 * author: dron, erik, berg
 * version: 1.2
 * date: 2010-06-30
 */



/**
 * 对目标字符串按gbk编码截取字节长度
 * 
 * @param {string} source 目标字符串
 * @param {number} length 需要截取的字节长度
 * @return {string} 字符串截取结果
 */
baidu.string.subByte = function (source, length) {
    source = String(source);
    if (length < 0 || baidu.string.getByteLength(source) <= length) {
        return source;
    }
    
    //thanks 加宽提供优化方法
    source = source.substr(0,length).replace(/([^\x00-\xff])/g,"\x241 ")//双字节字符替换成两个
        .substr(0,length)//截取长度
        .replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
        .replace(/([^\x00-\xff]) /g,"\x241");//还原
    return source;

};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/toHalfWidth.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 将目标字符串中常见全角字符转换成半角字符
 * 
 * @param {string} source 目标字符串
 * @return {string} 转换后的字符串
 */
baidu.string.toHalfWidth = function (source) {
    return String(source).replace(/[\uFF01-\uFF5E]/g, 
        function(c){
            return String.fromCharCode(c.charCodeAt(0) - 65248);
        }).replace(/\u3000/g," ");
};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/encodeHTML.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 对目标字符串进行html编码
 * 
 * @param {string} source 目标字符串
 * @return {string} html编码后的字符串
 */
baidu.string.encodeHTML = function (source) {
    return String(source)
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;");
};

baidu.encodeHTML = baidu.string.encodeHTML;/*
 
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/filter.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.array包
 */
baidu.array = baidu.array || {};

/**
 * 从数组中筛选符合条件的元素
 * 
 * @param {Array}    source   需要筛选的数组
 * @param {Function} iterator 对每个数组元素进行筛选的函数
 * @return {Array} 符合条件的数组项集合
 */
baidu.array.filter = function (source, iterator) {
    var result = [],
        resultIndex = 0,
        len = source.length,
        item,
        i;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            if (true === iterator.call(source, item, i)) {
                // resultIndex用于优化对result.length的多次读取
                result[resultIndex++] = item;
            }
        }
    }
    
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/unique.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 过滤数组中的相同项
 * 
 * @param {Array}    source             需要过滤相同项的数组
 * @param {Function} compareFn optional 比较2个数组项是否相同的函数
 * @return {Array} 过滤后的新数组
 */
baidu.array.unique = function (source, compareFn) {
    var len = source.length,
        result = source.slice(0),
        i, datum;
        
    if ('function' != typeof compareFn) {
        compareFn = function (item1, item2) {
            return item1 === item2;
        };
    }
    
    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (compareFn(datum, result[i])) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/indexOf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 查询数组中指定元素的索引位置
 * 
 * @param {Array}        source             需要查询的数组
 * @param {Any|Function} condition          查询项或查询函数
 * @param {number}       position optional  查询的起始位索引位置
 * @return {number} 指定元素的索引位置
 */
baidu.array.indexOf = function (source, condition, position) {
    var len = source.length,
        iterator = condition;
        
    // 参考ecma262的String.prototype.indexOf实现
    // 为undefined时归0，否则进行ToInteger(参见ecma262 3rd 9.4)
    position = Number(position) || 0;
    position = position < 0 ? Math.ceil(position) : Math.floor(position); 
    position = Math.min(Math.max(position, 0), len);
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    for ( ; position < len; position++) {
        if (true === iterator.call(source, source[position], position)) {
            return position;
        }
    }
    
    return -1;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/remove.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 移除数组中的项
 * 
 * @param {Array}        source    需要移除项的数组
 * @param {Any|Function} condition 要移除的项或移除匹配函数
 */
baidu.array.remove = function (source, condition) {
    var len = source.length,
        iterator = condition;
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    while (len--) {
        if (true === iterator.call(source, source[len], len)) {
            source.splice(len, 1);
        }
    }
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/each.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 遍历数组中所有元素
 * 
 * @param {Array}    source   需要遍历的数组
 * @param {Function} iterator 对每个数组元素进行调用的函数
 * @return {Array} 遍历的数组
 */
baidu.array.each = function (source, iterator) {
    var returnValue, item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            returnValue = iterator.call(source, item, i);
    
            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};

// 声明快捷方法
baidu.each = baidu.array.each;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/find.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 从数组中寻找符合条件的第一个数组元素
 * 
 * @param {Array}    source   需要查找的数组
 * @param {Function} iterator 对每个数组元素进行查找的函数
 * @return {Any|null} 符合条件的第一个数组元素，找不到时返回null
 */
baidu.array.find = function (source, iterator) {
    var item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            if (true === iterator.call(source, item, i)) {
                return item;
            }
        }
    }
    
    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/lastIndexOf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/14
 */



/**
 * 从后往前，查询数组中指定元素的索引位置
 * 
 * @param {Array}        source    需要查询的数组
 * @param {Any|Function} condition 查询项或查询函数
 * @return {number} 指定元素的索引位置
 */
baidu.array.lastIndexOf = function (source, condition) {
    var len = source.length,
        iterator = condition;
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    while (len--) {
        if (true === iterator.call(source, source[len], len)) {
            return len;
        }
    }
    
    return -1;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/removeAt.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 移除数组中的项
 * 
 * @param {Array}  source 需要移除项的数组
 * @param {number} index  要移除项的索引位置
 * @return {Any} 被移除的数组项
 */
baidu.array.removeAt = function (source, index) {
    return source.splice(index, 1)[0];
};


















/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.lang.createClass
 * @version: 2010-05-13
 */




/**
 * 创建一个类，包括创造类的构造器、继承基类Class
 * 创建新类时都采用这个方法：var newClass = baidu.lang.createClass(fn, className);
 *
 * @param   {function}  constructor 类的构造器函数
 * @param   {JSON}      options   (可选){className, superClass}
 * @return  {Class} 一个类对象
 */

baidu.lang.createClass = function(constructor, options) {
    options = options || {};
    var superClass = options.superClass || baidu.lang.Class;

    // 创建新类的真构造器函数
    var fn = function(){
        // 继承父类的构造器
        superClass.call(this);
        constructor.apply(this, arguments);
        for (var i=0, n=fn["\x06r"].length; i<n; i++) {
            fn["\x06r"][i](this);
        }
    };

    fn.options = options.options || {};

    // 为以后的模块拆分而做
    fn["\x06r"] = [];
    fn.regist = function(f){if (typeof f == "function") fn["\x06r"].push(f);};

    var C = function(){},
        cp = constructor.prototype;
    C.prototype = superClass.prototype;

    // 继承父类的原型（prototype)链
    var fp = fn.prototype = new C();

    // 继承传参进来的构造器的 prototype 不会丢
    for (var i in cp) fp[i] = cp[i];

    typeof options.className == "string" && (fp._className = options.className);

    // 修正这种继承方式带来的 constructor 混乱的问题
    fp.constructor = cp.constructor;

    // 给类扩展出一个静态方法，以代替 baidu.object.extend()
    fn.extend = function(json){
        for (var i in json) {
            fn.prototype[i] = json[i];
        }
        return fn;  // 这个静态方法也返回类对象本身
    };

    return fn;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/createSingle.js
 * author: meizz, berg
 * version: 1.1.2
 * date: 2010-05-13
 */




/** 
 * 单例模式：创建一个Class的实例
 * @param {Object} json 直接灌注到这个单例里的预定属性/方法
 */
baidu.lang.createSingle = function (json) {
    var c = new baidu.lang.Class();

    for (var key in json) {
        c[key] = json[key];
    }
    return c;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/10
 */


/**
 * 对目标字符串进行格式化, 含有"|"会执行紧跟的过滤函数
 * 
 * @param {string}          source  目标字符串
 * @param {Object|string*}  opts    提供相应数据的对象
 * @return {string} 格式化后的字符串
 */
baidu.string.filterFormat = function (source, opts) {
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
        data = data.length == 1 ? 
            /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
            (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
            : data;
        return source.replace(/#\{(.+?)\}/g, function (match, key){
            var filters, replacer, i, len, func;
            if(!data) return '';
            filters = key.split("|");
            replacer = data[filters[0]];
            // chrome 下 typeof /a/ == 'function'
            if('[object Function]' == toString.call(replacer)){
                replacer = replacer(filters[0]/*key*/);
            }
            for(i=1,len = filters.length; i< len; ++i){
                func = baidu.string.filterFormat[filters[i]];
                if('[object Function]' == toString.call(func)){
                    replacer = func(replacer);
                }
            }
            return ( ('undefined' == typeof replacer || replacer === null)? '' : replacer);
        });
    }
    return source;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat/escapeJs.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 */


baidu.string.filterFormat.escapeJs = function(str){
    if(!str || 'string' != typeof str) return str;
    var i,len,charCode,ret = [];
    for(i=0, len=str.length; i < len; ++i){
        charCode = str.charCodeAt(i);
        if(charCode > 255){
            ret.push(str.charAt(i));
        } else{
            ret.push('\\x' + charCode.toString(16));
        }
    }
    return ret.join('');
};
baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat/escapeString.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 */


baidu.string.filterFormat.escapeString = function(str){
    if(!str || 'string' != typeof str) return str;
    return str.replace(/"/g,'&#34;')
        .replace(/'/g,"&#39;")
        .replace(/</g,'&#60;')
        .replace(/>/g,'&#62;')
        .replace(/\\/g,'&#92;')
        .replace(/\//g,'&#47;')
};

baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat/toInt.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 */


baidu.string.filterFormat.toInt = function(str){
    return parseInt(str, 10) || 0;
};
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;/*
 
/**
 * 判断目标参数是否为function或Function对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isFunction = function (source) {
    // chrome下,'function' == typeof /a/ 为true.
    return '[object Function]' == Object.prototype.toString.call(source);
};

/**
 * 将一个变量转换成array
 * 
 * @param {mix}          source  需要转换成array的变量
 * @return {array}  转换后的array
 */
baidu.lang.toArray = function (source) {
    if (source === null || source === undefined)
        return [];
    if (baidu.lang.isArray(source))
        return source;

    // The strings and functions also have 'length'
    if (typeof source.length !== 'number' || typeof source === 'string' || baidu.lang.isFunction(source)) {
        return [source];
    }

    //nodeList, IE 下调用 [].slice.call(nodeList) 会报错
    if (source.item) {
        var l = source.length, array = new Array(l);
        while (l--)
            array[l] = source[l];
        return array;
    }

    return [].slice.call(source);
};