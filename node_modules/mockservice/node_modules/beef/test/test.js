// 只有在入口文件才采用侵入方式
var require = require('../src/require');

require.config({
    name: 'source',
    baseUrl: './source',
    packages: {
        'admin': '../admin'
    }
});

var mod = require('source/mod');

require(['source/amd'], function(amd) {
    console.log(amd);
});

var text = require('text!source/text.txt');

console.log(text);


pow = require('admin/pow');
console.log(pow);

//var css = require('css!source/style.less');
//console.log(css);