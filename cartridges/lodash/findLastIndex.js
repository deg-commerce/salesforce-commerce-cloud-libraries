'use strict';

var baseFindIndex = require('./internal/baseFindIndex');
var baseIteratee = require('./internal/baseIteratee');
var toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * This method is like `findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @static
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * findLastIndex(users, function(o) { return o.user == 'pebbles'; }); => 2
 *
 * * The `_.matches` iteratee shorthand. *
 * findLastIndex(users, { 'user': 'barney', 'active': true }); => 0
 *
 * * The `_.matchesProperty` iteratee shorthand. *
 * findLastIndex(users, ['active', false]); => 2
 *
 * * The `_.property` iteratee shorthand. *
 * findLastIndex(users, 'active'); => 0
 */
function findLastIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = length - 1;
    if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
            ? nativeMax(length + index, 0)
            : nativeMin(index, length - 1);
    }
    return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
}

module.exports = findLastIndex;
