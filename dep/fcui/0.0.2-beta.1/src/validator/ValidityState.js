/**
 * ESUI (Enterprise UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * 为支持异步的check，ValidityState可以有三种state：true、false和Promise。
 * 当state是Promise时，message对应pending时应显示的message。
 * state的Promise resolve时，此ValidityState转为true的state，resolve的结果为
 * message。
 * state的Promise reject时，此ValidityState转为false的state，reject的结果为
 * message。
 *
 * @ignore
 * @file 规则验证状态类
 * @author DBear, otakustay
 * @author Han Bing Feng
 * @param {Function} require require
 * @return {ValidityState} ValidityState
 */
define(
    function () {
        /**
         * 验证状态类
         *
         * 一个`ValidityState`表示一条规则的验证结果，其包含`state`和`message`两个属性
         *
         * @class validator.ValidityState
         * @constructor
         * @param {boolean} state 验证状态
         * @param {string} [message=""] 验证信息
         */
        function ValidityState(state, message) {
            this.state = state;
            this.message = message || '';

            // 支持Promise的state
            var me = this;
            if (typeof state.then === 'function') {
                state.then(function (message) {
                    me.state = true;
                    me.message = message;
                }, function (message) {
                    me.state = false;
                    if (message.message) {
                        // 万一reject的是给了个异常呢
                        me.message = message.message;
                        return;
                    }

                    me.message = message;
                });
            }
        }

        /**
         * 获取验证信息
         *
         * @return {string}
         */
        ValidityState.prototype.getMessage = function () {
            return this.message;
        };


        /**
         * 获取验证状态
         *
         * @return {boolean} `true`为值合法，`false`为值非法
         */
        ValidityState.prototype.getState = function () {
            return this.state;
        };



        /**
         * 设置验证信息
         *
         * @param {string} message 验证信息字符串
         */
        ValidityState.prototype.setMessage = function (message) {
            this.message = message;
        };


        /**
         * 设置验证状态
         *
         * @param {boolean} state `true`为值合法，`false`为值非法
         */
        ValidityState.prototype.setState = function (state) {
            this.state = state;
        };

        return ValidityState;
    }
);
