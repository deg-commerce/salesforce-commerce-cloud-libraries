'use strict';

/**
 * Creates an array of values by running each property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments: (value, key, object).
 *
 * @static
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map({ 'a': 4, 'b': 8 }, function square(n) {
 *   return n * n
 * }) => [16, 64] (iteration order is not guaranteed)
 */
function mapObject(object, iteratee) {
    const props = Object.keys(object);
    const result = new Array(props.length);

    props.forEach(function (key, index) {
        result[index] = iteratee(object[key], key, object);
    });
    return result;
}

module.exports = mapObject;
