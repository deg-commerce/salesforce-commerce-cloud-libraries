'use strict';

var arrayFilter = require('./internal/arrayFilter');
var baseIteratee = require('./internal/baseIteratee');
var baseRest = require('./internal/baseRest');
var baseXor = require('./internal/baseXor');
var isArrayLikeObject = require('./isArrayLikeObject');
var last = require('./last');

/**
 * This method is like `xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which by which they're compared. The order of result values is determined
 * by the order they occur in the arrays. The iteratee is invoked with one
 * argument: (value).
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee=identity] The iteratee invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * xorBy([2.1, 1.2], [2.3, 3.4], Math.floor); => [1.2, 3.4]
 *
 * * The `property` iteratee shorthand. *
 * xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x'); => [{ 'x': 2 }]
 */
var xorBy = baseRest(function (arrays) {
    var iteratee = last(arrays);
    if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
    }
    return baseXor(arrayFilter(arrays, isArrayLikeObject), baseIteratee(iteratee, 2));
});

module.exports = xorBy;
