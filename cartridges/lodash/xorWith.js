'use strict';

var baseXor = require('./internal/baseXor');
var isArrayLikeObject = require('./isArrayLikeObject');
var last = require('./last');

/**
 * This method is like `xor` except that it accepts `comparator` which is
 * invoked to compare elements of `arrays`. The order of result values is
 * determined by the order they occur in the arrays. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, without, xor, xorBy
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * xorWith(objects, others, isEqual) => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
function xorWith() {
    var arrays = Array.prototype.slice.call(arguments);
    let comparator = last(arrays);
    comparator = typeof comparator === 'function' ? comparator : undefined;
    return baseXor(arrays.filter(isArrayLikeObject), undefined, comparator);
}

module.exports = xorWith;
