/**
 * @class meta.Promise
 */

function Promise() {

    /**
     * 当 promise 以肯定结束时会调用 onFulfilled。 当 promise 以否定结束时会调用 onRejected。
     *
     * - 这两个参数都是可选的，当任意一个未定义时，对它的调用会跳转到 then 链的下一个 onFulfilled/onRejected 上。
     * - 这两个回调函数均只接受一个参数，肯定结果或者否定原因。
     * - 当 Promise 肯定结束之后，then 会返回一个新的 Promise，
     * - 这个 Promise 相当于你从 onFulfilled/onRejected 中返回的值。
     * - 如果回调中抛出任何错误，返回的 Promise 也会以此错误作为否定结果结束。
     *
     * @method then
     * @param {Function | null | undefined} onFulfilled
     * @param {Function | null | undefined} onReject
     * @return {meta.Promise}
     */
    this.then;

    /**
     * promise.then(undefined, onRejected) 的语法糖。
     *
     * @method catch
     * @param {Function} onRejected
     * @return {meta.Promise}
     */
    this.catch;

    /**
     * promise.then(onAnyWay, onAnyWay) 的语法糖。
     *
     * @method ensure
     * @param {Function} onAnyWay
     * @return {meta.Promise}
     */
    this.ensure;
}

/**
 * 返回一个`resolved`状态的Promise对象
 *
 * @static
 * @inheritable
 * @method resolve
 * @param {*} value
 * @return {meta.Promise}
 */
Promise.resolve;

/**
 * 返回一个`rejected`状态的Promise对象
 *
 * @static
 * @inheritable
 * @method reject
 * @param {*} value
 * @return {meta.Promise}
 */
Promise.reject;

/**
 * 创建一个 Promise，当且仅当传入数组中的所有 Promise 都肯定之后才肯定，
 * 如果遇到数组中的任何一个 Promise 以否定结束，则抛出否定结果。
 * 每个数组元素都会首先经过 Promise.cast，所以数组可以包含类 Promise 对象或者其他对象。
 * 肯定结果是一个数组，包含传入数组中每个 Promise 的肯定结果（且保持顺序）；
 * 否定结果是传入数组中第一个遇到的否定结果。
 *
 * @static
 * @inheritable
 * @method all
 * @param {Array.<meta.Promise>} promises
 * @return {meta.Promise}
 */
Promise.all;

/**
 * 创建一个 Promise，当数组中的任意对象肯定时将其结果作为肯定结束，或者当数组中任意对象否定时将其结果作为否定结束。
 *
 * @static
 * @inheritable
 * @method race
 * @param {Array} promises
 * @return {meta.Promise}
 */
Promise.race;

/**
 * 将 value 转化为 标准的 Promise 对象， 当 value 已经为 标准Promise 对象时，直接返回 value，
 * 其他情况等价于 Promise.resolve(object)
 *
 * @static
 * @inheritable
 * @method cast
 * @param {*} value
 * @return {meta.Promise}
 */
Promise.cast;

/**
 * 判断一个对象是否是一个Promise对象
 *
 * 对于 primitive 值，返回 false；
 * 若 obj.then 为函数，返回 true，否则返回 false
 *
 * @param {*} obj 需要判断的对象
 * @return {boolean} 如果`obj`是Promise对象，则返回`true`
 * @method isPromise
 * @static
 * @inheritable
 */
Promise.isPromise;

/**
 * 返回一个{@link meta.Promise}对象，
 * 当指定的模块被AMD加载器加载后，进入`resolved`状态
 *
 * @param {string[]} modules 需要加载的模块列表
 * @return {meta.Promise}
 * @method require
 * @static
 * @inheritable
 */
Promise.require;
