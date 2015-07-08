/**
 * @class meta.EventTarget
 * 此类直接使用的mini-event.EventTarget
 */

function EventTarget() {

    /**
     * @method on
     *
     * 注册一个事件处理函数
     *
     * @param {string} type 事件的类型
     * @param {Function | boolean} fn 事件的处理函数，
     * 特殊地，如果此参数为`false`，将被视为特殊的事件处理函数，
     * 其效果等于`preventDefault()`及`stopPropagation()`
     * @param {Mixed} [thisObject] 事件执行时`this`对象
     * @param {Object} [options] 事件相关配置项
     * @param {boolean} [options.once=false] 控制事件仅执行一次
     */
    this.on;

    /**
     * @method once
     *
     * 注册一个仅执行一次的处理函数
     *
     * @param {string} type 事件的类型
     * @param {Function} fn 事件的处理函数
     * @param {Mixed} [thisObject] 事件执行时`this`对象
     * @param {Object} [options] 事件相关配置项
     */
    this.once;

    /**
     * @method un
     *
     * 注销一个事件处理函数
     *
     * @param {string} type 事件的类型，
     * 如果值为`*`仅会注销通过`*`为类型注册的事件，并不会将所有事件注销
     * @param {Function} [handler] 事件的处理函数，
     * 无此参数则注销`type`指定类型的所有事件处理函数
     * @param {Mixed} [thisObject] 处理函数对应的`this`对象，
     * 无此参数则注销`type`与`handler`符合要求，且未挂载`this`对象的处理函数
     */
    this.un;

    /**
     * @method fire
     *
     * 触发指定类型的事件
     *
     * 3个重载：
     *
     * - `.fire(type)`
     * - `.fire(args)`
     * - `.fire(type, args)`
     *
     * @param {string | Mixed} type 事件类型
     * @param {Mixed} [args] 事件对象
     * @return {Event} 事件传递过程中的`Event`对象
     */
    this.fire;

    /**
     * @method destroyEvents
     *
     * 销毁所有事件
     */
    this.destroyEvents;
}
