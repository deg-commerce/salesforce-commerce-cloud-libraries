'use strict';

var arrayReduce = require('./internal/arrayReduce');
var defaultTo = require('./defaultTo');

/**
 * This method is like `defaultTo` except that it accepts multiple default values and returns the first one that is not
 * `NaN`, `null`, or `undefined`.
 *
 * @static
 * @since 5.0.0
 * @category Util
 * @param {*} value The value to check.
 * @param {...*} defaultValues The default values.
 * @returns {*} Returns the resolved value.
 * @see defaultTo
 * @example
 *
 * defaultToAny(1, 10, 20) => 1
 *
 * defaultToAny(undefined, [10, 20]) => 10
 *
 * defaultToAny(undefined, [null, 20]) => 20
 *
 * defaultToAny(undefined, [null, NaN]) => NaN
 */
function defaultToAny(value, defaultValues) {
    return arrayReduce(defaultValues, defaultTo, value);
}

module.exports = defaultToAny;
