'use strict';

var baseIteratee = require('./internal/baseIteratee');
var baseMean = require('./internal/baseMean');

/**
 * This method is like `mean` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be averaged.
 * The iteratee is invoked with one argument: (value).
 *
 * @static
 * @since 4.7.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=identity] The iteratee invoked per element.
 * @returns {number} Returns the mean.
 * @example
 *
 * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 *
 * meanBy(objects, function(o) { return o.n; }); => 5
 *
 * * The `&property` iteratee shorthand. *
 * meanBy(objects, 'n'); => 5
 */
function meanBy(array, iteratee) {
    return baseMean(array, baseIteratee(iteratee, 2));
}

module.exports = meanBy;
