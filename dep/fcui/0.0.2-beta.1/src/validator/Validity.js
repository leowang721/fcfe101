/**
 * ESUI (Enterprise UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * 派生自ESUI 3.1.0-beta.4
 * @ignore
 * @file 验证信息类
 * @author DBear
 * @author Han Bing Feng
 * @param {Function} require require
 * @return {Validity} 验证信息类
 */
define(function (require) {
    var u = require('underscore');
    var Promise = require('fc-core/Promise');

    /**
     * 验证结果类
     *
     * 一个`Validity`是对一个控件的验证结果的表达，
     * 是一系列{@link validator.ValidityState}的组合
     *
     * 当有至少一个{@link validator.ValidityState}处于错误状态时，
     * 该`Validity`对象将处于错误状态
     *
     * 派生自ESUI 3.1.0-beta.4
     * 修改以支持rule的pending状态
     *
     * @class validator.Validity
     * @constructor
     */
    function Validity() {
        this.states = [];
        this.stateIndex = {};
        this.customMessage = '';
        this.customValidState = null;
    }

    /**
     * 添加验证状态
     *
     * @param {string} name 状态名
     * @param {validator.ValidityState} state 规则验证状态对象
     *        这里的状态对象允许是一个Promise
     */
    Validity.prototype.addState = function (name, state) {
        // 如果状态名已存在
        if (this.stateIndex[name]) {
            // 同样的状态对象，不处理
            if (this.stateIndex[name] === state) {
                return;
            }

            // 不一样，删除原list中元素
            for (var i = 0; i < this.states.length; i++) {
                if (this.states[i] === this.stateIndex[name]) {
                    this.states.splice(i, 1);
                    break;
                }
            }
        }

        // 更新数据
        this.states.push(state);
        this.stateIndex[name] = state;
    };

    /**
     * 获取验证状态
     *
     * @param {string} name 状态名
     * @return {validator.ValidityState} 规则验证状态对象
     */
    Validity.prototype.getState = function (name) {
        return this.stateIndex[name] || null;
    };

    /**
     * 获取验证状态集合
     *
     * @return {validator.ValidityState[]}
     */
    Validity.prototype.getStates = function () {
        return this.states.slice();
    };

    /**
     * 获取自定义验证信息
     *
     * @return {string}
     */
    Validity.prototype.getCustomMessage = function () {
        return this.customMessage;
    };


    /**
     * 设置自定义验证信息
     *
     * @param {string} message 自定义验证信息
     */
    Validity.prototype.setCustomMessage = function (message) {
        this.customMessage = message;
    };

    /**
     * 设置自定义验证结果
     *
     * @param {string} validState 验证结果字符串
     */
    Validity.prototype.setCustomValidState = function (validState) {
        this.customValidState = validState;
    };

    /**
     * 获取整体是否验证通过
     * 可能返回boolean或者一个Promise。若为Promise，Promise resolve状态
     * 为验证通过，reject为验证失败
     * 不关心异步验证的组件可以当原来的Validity使用。
     * @return {boolean|Promise}
     */
    Validity.prototype.isValid = function () {
        var result = u.some(
            this.getStates(),
            function (state) {
                // 只有当state是确定的false的时候，才是验证不通过
                // 否则，要么是验证通过，要么是pending
                return state.getState() === false;
            }
        );

        if (result) {
            return false;
        }

        var promises = u.chain(this.getStates()).filter(
            function (state) {
                return typeof state.state === 'object'
                    && state.state.constructor === Promise;
            }
        ).map(
            function (state) {
                return state.state;
            }
        ).value();

        if (promises.length) {
            // 有任何的Promise存在，验证的结果取决于这一组promise的验证结果
            return Promise.all(promises);
        }

        // 最后，只能是验证都通过
        return true;
    };

    /**
     * 获取验证状态的字符串
     *
     * @return {string}
     */
    Validity.prototype.getValidState = function () {
        if (this.customValidState) {
            return this.customValidState;
        }

        var valid = this.isValid();

        if (valid === true) {
            return 'valid';
        }

        if (valid === false) {
            return 'invalid';
        }

        // valid 是个promise
        return 'pending';
    };

    return Validity;
});
