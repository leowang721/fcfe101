/**
 * @class meta.Promise
 *
 * 此类直接使用的fc.core.Promise
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
