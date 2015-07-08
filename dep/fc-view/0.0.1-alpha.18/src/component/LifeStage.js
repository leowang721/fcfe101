/**
 * @file 生命周期Helper组件
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var fc = require('fc-core');

    /**
     * 生命周期状态定义
     * 为何是指数？这样你可以直接用 NEW | INITED表示两个状态了
     * @type {Object.<string, number>}
     */
    var LIFE_STAGE = {
        NEW: 1,
        INITED: 2,
        RENDERED: 4,
        REPAINTED: 8,
        DISPOSED: 16
    };

    /**
     * 生命周期状态反向，值 -> key
     * @type {Object.<number, string>}
     */
    var LIFE_STAGE_KEY = {};
    (function () {
        for (var k in LIFE_STAGE) {
            if (LIFE_STAGE.hasOwnProperty(k)) {
                LIFE_STAGE_KEY[LIFE_STAGE[k]] = k;
            }
        }
    })();

    /**
     * ECMA5 Script下标注为不可修改
     */
    if ('function' === typeof Object.freeze) {
        Object.freeze(LIFE_STAGE);
    }

    /**
     * 生命周期控制类
     * @param {Object} control 任何支持定义事件的类的实例
     */
    function LifeStage(control) {

        fc.assert(control && typeof control.fire === 'function',
            '错误的LifeStage参数，必须传入`control`，'
            + '且`control.fire`必须是函数。');

        // 默认当前生命周期状态
        this.stage = LIFE_STAGE.NEW;
        // 生命周期状态对应的环境实例
        this.control = control;
    }

    /**
     * 更改状态，不支持自定义状态
     * @param {number} stageKey
     *     参数必须为指定常量值，即使用必须为LifeStage.INITED这种
     */
    LifeStage.prototype.changeTo = function (stageKey) {
        if (!(stageKey in LIFE_STAGE_KEY)) {
            throw new Error('不存在的life stage值: ' + stageKey);
        }
        var stageName = LIFE_STAGE_KEY[stageKey];

        this.stage = stageKey;
        this.control.fire(stageName.toLowerCase());
    };

    /**
     * 状态重置
     */
    LifeStage.prototype.reset = function () {
        this.stage = LIFE_STAGE.NEW;
    };

    /**
     * 检查是否是指定状态
     * @param {string} stageKey LifeStage.LIFE_STAGE.key
     *     参数必须为指定常量值，即使用必须为LifeStage.INITED这种
     * @return {boolean} 判断结果
     */
    LifeStage.prototype.is = function (stageKey) {
        return !!(stageKey & this.stage);
    };

    /**
     * 对外暴露生命周期常量，因为是常量，因此在此直接一次处理完
     */
    (function () {
        for (var k in LIFE_STAGE) {
            if (LIFE_STAGE.hasOwnProperty(k)) {
                LifeStage[k] = LIFE_STAGE[k];
            }
        }
    })();

    return LifeStage;
});
