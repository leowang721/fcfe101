/**
 * @file mockservice配置文件
 * 为了兼容老代码，减少mock中的异常
 * 暂时加入tangram工具库, 但是限制继续使用
 * - baidu.object
 * - baidu.string
 * - baidu.array
 *
 * > 全局变量baidu后期将删除
 * - 如果需要使用，应该用如下方式
 *
 * var baidu = require('lib/baidu');
 *
 * @author (liangjinping@baidu.com)
 * @todo(anyone) 简单重构以上三个库的代码
 */
/* eslint-env node */

global.baidu = require('./lib/tangram');

module.exports = {
    // mock接口文件是否缓存
    cache: false,

    // 接口匹配规则
    pathRegs: [/\w+_\w+/, 'scookie', 'zebra'],

    // 定义mock根目录名
    name: 'fcfe101',

    // packages 定义了基于basedir的寻址方式
    packages: {
        'lib': './lib',
        'materialData': './materialData'
    },

    // 如果不写logError，则错误信息不显示输出
    logError: {
        // 如果不指定logFile，则将错误信息输出到控制台
        logFile: 'ms-error.log'
    }
};
